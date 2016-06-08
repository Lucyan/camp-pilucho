<?php namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Record;
use App\Models\Winner;

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
        $active = $request->get('active');
        $limit = 10;

        if ($active) {
            $list = Record::select('recordings.id', 'recordings.audio', 'recordings.created_at', 'users.name', 'users.fb_id', 'users.email', 'recordings.active')
                ->where('active', 1)
                ->orderBy('recordings.id', 'desc')
                ->take($limit)
                ->skip($page * $limit)
                ->join('users', 'recordings.user_id', '=', 'users.id')
                ->get();
        } else {
            $list = Record::select('recordings.id', 'recordings.audio', 'recordings.created_at', 'users.name', 'users.fb_id', 'users.email', 'recordings.active')
                ->orderBy('recordings.id', 'desc')
                ->take($limit)
                ->skip($page * $limit)
                ->join('users', 'recordings.user_id', '=', 'users.id')
                ->get();
        }

        return response()->json($list);
    }

    public function toogleActive(Request $request) {
        $id = $request->get('id');

        $record = Record::where('id', $id)->first();
        $record->active = ($record->active) ? false : true;
        $record->save();

        return response()->json(['active' => $record->active]);
    }


    public function getSingle(Request $request) {
        $id = $request->get('id');

        $record = Record::where('id', $id)->where('active', 1)->first();
        $user = null;
        if ($record) {
            $user = User::where('id', $record->user_id)->select('name', 'fb_id')->first();
        }

        return response()->json(['record' => $record, 'user' => $user]);
    }

    public function markWinner(Request $request) {
        $id = $request->get('id');

        $record = Record::find($id);

        if ($record) {
            $user = $record->user()->get()[0];

            $winner = new Winner();

            $winner->user_id = $user->id;
            $winner->type = 'pack';
            $winner->sorteo = date('Y-m-d H:i:s');
            $winner->record_id = $record->id;

            $winner->save();

            return response()->json(['record' => $record, 'user' => $user, 'winner' => $winner]);
        } else {
            return response()->json(['msg' => 'Grabación no encontrada'], 409);
        }
    }

    public function packs(Request $request) {
        $page = $request->get('page');
        $limit = 10;

        $list = Winner::select('winners.id', 'users.fb_id', 'users.name', 'users.name', 'users.email', 'recordings.audio', 'winners.sorteo', 'winners.active')
            ->orderBy('winners.id', 'desc')
            ->take($limit)
            ->skip($page * $limit)
            ->join('users', 'winners.user_id', '=', 'users.id')
            ->join('recordings', 'winners.record_id', '=', 'recordings.id')
            ->get();

        return response()->json($list);
    }

    public function toogleActivePack(Request $request) {
        $id = $request->get('id');

        $winner = Winner::find($id);
        $winner->active = ($winner->active) ? false : true;
        $winner->save();

        return response()->json(['active' => $winner->active]);
    }

    public function getWinners(Request $request) {
        $winners = Winner::all();

        $resp = [];

        foreach ($winners as $key => $winner) {
            $user = $winner->user()->get()[0];
            
            $data = [
                'title' => 'SORTEO: ' . date( 'd-m-Y', strtotime( $winner->sorteo ) ),
                'ganador' => [
                    'avatar' => '//graph.facebook.com/' . $user->fb_id . '/picture?type=square',
                    'name' => $user->name
                ]
            ];

            array_push($resp, $data);
        }
        return response()->json(['winners' => $resp]);
    }
}