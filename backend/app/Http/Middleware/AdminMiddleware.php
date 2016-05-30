<?php namespace App\Http\Middleware;

use \Firebase\JWT\JWT;
use Closure;
use Illuminate\Contracts\Auth\Guard;
use App\Models\User;

class AdminMiddleware {

	/**
	* The Guard implementation.
	*
	* @var Guard
	*/
	protected $auth;

	/**
	* Create a new filter instance.
	*
	* @param  Guard  $auth
	* @return void
	*/
	public function __construct(Guard $auth)
	{
		$this->auth = $auth;
	}

	/**
	* Handle an incoming request.
	*
	* @param  \Illuminate\Http\Request  $request
	* @param  \Closure  $next
	* @return mixed
	*/
	public function handle($request, Closure $next)
	{
		if ($request->header('Authorization'))
		{

			$token  = $request->header('Authorization');

			$payload = (array) JWT::decode($token, getenv("APP_KEY"), array('HS256'));

			if ($payload['exp'] < time())
			{
				return response()->json(['message' => 'Token has expired']);
			}

			$user = User::find($payload["user"]);

			if ($user->is_admin)
				$request['user'] = $payload["user"];
			else
				return response()->json(['message' => 'You shall not pass!!!'], 401); 

			return $next($request);
		}
		else
		{
			return response()->json(['message' => 'Please make sure your request has an Authorization header'], 401);
		}
	}

}