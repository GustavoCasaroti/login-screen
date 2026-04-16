<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    // Registro de usuário
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'st_name'     => 'required|string|max:255',
            'st_email'    => 'required|email|unique:tb_users,st_email',
            'st_password' => 'required|min:6',
        ], [
            'required' => ':attribute é obrigatório.',
            'email'    => 'Informe um :attribute válido.',
            'unique'   => 'Este :attribute já está em uso.',
            'min'      => ':attribute deve ter no mínimo :min caracteres.',
        ], [
            'st_name' => 'nome',
            'st_email' => 'e-mail',
            'st_password' => 'senha',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'st_name' => $request->st_name,
            'st_email' => $request->st_email,
            'st_password' => $request->st_password,
            'id_role' => 2,
        ]);

        return response()->json([
            'message' => 'Usuário criado com sucesso',
            'user' => [
                'name'  => $user->st_name,
                'email' => $user->st_email,
            ]
        ], 201);
    }

    // Login de usuário
    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required',
        ], [
            'required' => ':attribute é obrigatório.',
            'email'    => 'Informe um :attribute válido.',
        ], [
            'email' => 'e-mail',
            'password' => 'senha',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('st_email', $request->email)->first();

        if (!$user || $request->password !== $user->st_password) {
            return response()->json([
                'error' => 'Credenciais inválidas'
            ], 401);
        }

        $token = JWTAuth::fromUser($user); //talvez depois eu volte salvando as senhas como hash e precise alterar

        return response()->json([
            'token' => $token,
            'user' => [
                'email' => $user->st_email,
                'name' => $user->st_name
            ]
        ]);
    }

    // Esqueci minha senha
    public function forgotPassword(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ], [
            'required' => 'O :attribute é obrigatório.',
            'email'    => 'Informe um :attribute válido.',
        ], [
            'st_email' => 'e-mail',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('st_email', $request->email)->first();

        if ($user) {
            $token = bin2hex(random_bytes(3));

            $user->st_reset_token = $token;
            $user->dt_reset_token_expires_at = now()->addMinutes(30);
            $user->save();
        }

        return response()->json([
            'message' => 'Se o e-mail existir, você receberá instruções.'
        ]);
    }

    // Verificar token de redefinição
    public function verifyResetToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $token = $request->token;

        $user = User::where('st_reset_token', $token)->first();

        if (!$user || $user->dt_reset_token_expires_at->isPast()) {
            return response()->json([
                'error' => 'Código inválido ou expirado'
            ], 400);
        }

        return response()->json([
            'message' => 'Token válido'
        ]);
    }

    // Redefinir senha
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token'    => 'required|string',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $token = $request->token;
        $password = trim($request->password);

        $user = User::where('st_reset_token', $token)->first();

        if (!$user || $user->dt_reset_token_expires_at === null || $user->dt_reset_token_expires_at->isPast()) {
            return response()->json(['error' => 'Token inválido ou expirado'], 400);
        }

        $user->st_password = $password;
        $user->st_reset_token = null;
        $user->dt_reset_token_expires_at = null;
        $user->save();

        return response()->json([
            'message' => 'Senha redefinida com sucesso'
        ]);
    }

    // Perfil do usuário
    public function profile(Request $request)
    {
        //TODO
    }

    // Logout
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json([
            'message' => 'Logout realizado com sucesso'
        ]);
    }
}
