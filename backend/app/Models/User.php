<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use SoftDeletes;

    protected $table = 'tb_users';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'st_name',
        'st_email',
        'st_password',
        'id_role',
        'id_created_by',
        'st_reset_token',
        'dt_reset_token_expires_at',
        'bl_active',
        'dt_created_at',
        'dt_updated_at',
    ];

    protected $hidden = [
        'st_password',
        'st_reset_token',
    ];

    protected $casts = [
        'bl_active' => 'boolean',
        'dt_created_at' => 'datetime',
        'dt_updated_at' => 'datetime',
        'dt_reset_token_expires_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function setStPasswordAttribute($value)
    {
        $this->attributes['st_password'] = $value;
    }

    public function checkPassword($password)
    {
        return $password === $this->st_password;
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}