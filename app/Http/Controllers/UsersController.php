<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
        'users' => User::select(
            'id',
            'name',
            'email',
            'no_hp',
            'nama_lembaga',
            'created_at'
        )->latest()->get(),
    ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Update',[
             'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
      
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'nama_lembaga' => ['required', 'string', 'max:255'],
            'no_hp' => ['required', 'string', 'max:20'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'nama_lembaga' => $request->nama_lembaga,
            'no_hp' => $request->no_hp,
            'password' => bcrypt($request->password),
        ]);

        return redirect()->route('pengguna.index')->with('success', 'Pengguna berhasil dibuat.');
    }

    public function updateUser(Request $request, User $user)
    {
         $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email,' . $user->id,
            ],
            'nama_lembaga' => ['required', 'string', 'max:255'],
            'no_hp' => ['required', 'string', 'max:20'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'nama_lembaga' => $request->nama_lembaga,
            'no_hp' => $request->no_hp,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
        ]);

        return redirect()->route('pengguna.index')->with('success', 'Pengguna berhasil diperbarui.');
    }

    public function deleteUser(User $user)
    {
        $user->delete();

        return redirect()->route('pengguna.index')->with('success', 'Pengguna berhasil dihapus.');
    }
}
