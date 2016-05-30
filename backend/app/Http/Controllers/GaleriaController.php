<?php namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Record;

class GaleriaController extends Controller {

	public function get(Request $request)
    {
        $page = $request->get('page');
        $limit = 8;
        $list = Record::where('active', 1)
            ->select('recordings.id', 'recordings.audio', 'users.name', 'users.fb_id')
            ->orderBy('recordings.id', 'desc')
            ->take($limit)
            ->skip($page * $limit)
            ->join('users', 'recordings.user_id', '=', 'users.id')
            ->get();

        $resp = [];
        $index = 0;
        $contador = 0;

        foreach ($list as $key => $record) {
            $resp[$index][] = $record;
            $contador++;
            if ($contador == 4) {
                $contador = 0;
                $index++;
            }
        }

        return response()->json($resp);
    }

    public function adminGet(Request $request) {
        $page = $request->get('page');
        $limit = 10;
        $list = Record::select('recordings.id', 'recordings.audio', 'recordings.created_at', 'users.name', 'users.fb_id', 'users.email', 'recordings.active')
            ->orderBy('recordings.id', 'desc')
            ->take($limit)
            ->skip($page * $limit)
            ->join('users', 'recordings.user_id', '=', 'users.id')
            ->get();

        return response()->json($list);
    }

    public function toogleActive(Request $request) {
        $id = $request->get('id');

        $record = Record::where('id', $id)->first();
        $record->active = ($record->active) ? false : true;
        $record->save();

        return response()->json(['active' => $record->active]);
    }
}