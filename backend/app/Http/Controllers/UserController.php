<?php namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GuzzleHttp;
use App\Models\User;
use App\Models\Record;
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

    public function upload(Request $request) {
        $file = $request->file('audio-blob');
        if ($file) {
             $name = 'user-' . $request['user'] . '-' . $request->get('audio-filename');
            if ($file) {
                $destino = __DIR__ . '/../../../../frontend/uploads';
                try {
                    $file->move($destino, $name);
                    return response()->json(['msg' => 'Guardado OK', 'url' => '/uploads/' . $name]);
                } catch (Exception $e) {
                    return response()->json(['msg' => 'Error al mover', 'catch' => $e->getMessage()], 409);
                }
                

            } else {
                return response()->json(['msg' => 'Datos incorrectos'], 409);
            }
        } else if ($request->file('video_file')) {
            $file = $request->file('video_file');
            $destino = __DIR__ . '/../../../../frontend/uploads/';
            $name = 'user-' . $request['user'] . '-' . $request->get('video-filename');
            $audio_mame = 'user-' . $request['user'] . '-' . $request->get('audio-filename');
            $video_file = $destino . $name;
            $audio_file = $destino . $audio_mame;

            try {
                $file->move($destino, $name);

                $ffmpeg = __DIR__ . "/ffmpeg/ffmpeg";
                $cmd = "$ffmpeg -i $video_file 2>&1 | grep 'Duration' | cut -d ' ' -f 4 | sed s/,//";
                $time =  exec($cmd);
                $duration = explode(":", $time);   
                $duration_in_seconds = $duration[0]*3600 + $duration[1]*60+ round($duration[2]); 

                if ($duration_in_seconds > 15) {
                    unlink($video_file);
                    return response()->json(['msg' => 'Error, la duración no debe superar los 15 segundos'], 409);
                }

                $cmd = "$ffmpeg -y -i $video_file $audio_file";
                exec($cmd);

                unlink($video_file);
                
                return response()->json(['msg' => 'Guardado OK', 'url' => '/uploads/' . $audio_mame]);
            } catch (Exception $e) {
                return response()->json(['msg' => 'Error al procesar archivo', 'catch' => $e->getMessage()], 409);
            }
        } else {
            return response()->json(['msg' => 'Archivo Inválido'], 409);
        }
    }

    public function newRecord(Request $request) {
        $src = $request->get('src');

        $record = new Record();

        $record->user_id = $request['user'];
        $record->audio = $src;
        $record->active = false;

        $record->save();

        return response()->json($record);
    }
}