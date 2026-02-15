<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $query = Activity::with(['causer', 'subject'])->latest();

        // Filter berdasarkan log name (kategori)
        if ($request->filled('log_name') && $request->log_name !== 'all') {
            $query->inLog($request->log_name);
        }

        // Filter berdasarkan user
        if ($request->filled('user_id') && $request->user_id !== 'all') {
            $query->causedBy(\App\Models\User::find($request->user_id));
        }

        // Filter berdasarkan tanggal
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        // Filter berdasarkan search
        if ($request->filled('search')) {
            $query->where('description', 'like', '%' . $request->search . '%');
        }

        $activities = $query->paginate(20)->through(function ($activity) {
            return [
                'id' => $activity->id,
                'log_name' => $activity->log_name,
                'description' => $activity->description,
                'subject_type' => $activity->subject_type ? class_basename($activity->subject_type) : null,
                'subject_id' => $activity->subject_id,
                'causer' => $activity->causer ? [
                    'id' => $activity->causer->id,
                    'name' => $activity->causer->name,
                    'email' => $activity->causer->email,
                ] : null,
                'properties' => $activity->properties,
                'created_at' => $activity->created_at->format('d M Y H:i:s'),
                'created_at_human' => $activity->created_at->diffForHumans(),
            ];
        });

        // Data untuk filter dropdown
        $logNames = Activity::distinct()->pluck('log_name')->toArray();
        $users = \App\Models\User::select('id', 'name')->get()->toArray();

        return Inertia::render('ActivityLog/Index', [
            'activities' => $activities,
            'filters' => [
                'log_name' => $request->log_name,
                'user_id' => $request->user_id,
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
                'search' => $request->search,
            ],
            'logNames' => $logNames,
            'users' => $users,
        ]);
    }

    public function detail($id)
    {
        $activity = Activity::with(['causer', 'subject'])->findOrFail($id);

        return Inertia::render('ActivityLog/Detail', [
            'activity' => [
                'id' => $activity->id,
                'log_name' => $activity->log_name,
                'description' => $activity->description,
                'subject_type' => $activity->subject_type,
                'subject_id' => $activity->subject_id,
                'event' => $activity->event,
                'causer' => $activity->causer ? [
                    'id' => $activity->causer->id,
                    'name' => $activity->causer->name,
                    'email' => $activity->causer->email,
                ] : null,
                'properties' => $activity->properties,
                'created_at' => $activity->created_at->format('d M Y H:i:s'),
            ]
        ]);
    }
}
