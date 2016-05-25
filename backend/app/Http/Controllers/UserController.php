<?php namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GuzzleHttp;
use App\Models\User;
use \Firebase\JWT\JWT;

class UserController extends Controller {

	protected function createToken($user)
    {
        $payload = [
            'user' => $user,
            'iat' => time(),
            'exp' => time() + (2 * 7 * 24 * 60 * 60)
        ];
        return JWT::encode($payload, getenv('APP_KEY'));
    }

	public function login(Request $request)
	{
		
		$accessToken = $request->get("accessToken");
		$userID = $request->get("userID");

		$profile_data = join(',',array(
            'id',
            'first_name',
            'last_name',
            'name',
            'email'
        ));

        $client = new GuzzleHttp\Client([
                'base_uri' => "https://graph.facebook.com/"
        ]);

        $profile = $client->get(
            '/me?access_token=' . $accessToken . '&fields=' . $profile_data
        );

        $profile = json_decode($profile->getBody(), true);

        if ($profile['id'] != $userID) return response()->json(['msg' => 'Datos incorrectos'], 409);

        $user = User::where(['email' => $profile['email']])->first();

        if ($user) {
        	$user->oauth_token = $accessToken;
        } else {
        	$user = new User();

        	$user->name = $profile['first_name'] . ' ' . $profile['last_name'];
        	$user->email = $profile['email'];
        	$user->fb_id = $profile['id'];
        	$user->oauth_token = $accessToken;
        }

        $user->save();

        return response()->json(['token' => $this->createToken($user["id"])]);
	}

	public function me(Request $request) {
		$data = User::where('id', $request["user"])->first();
        return response()->json($data);
	}
}