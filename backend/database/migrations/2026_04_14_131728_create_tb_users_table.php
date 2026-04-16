<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_users', function (Blueprint $table) {
            $table->id();

            $table->string('st_name');
            $table->string('st_email')->unique()->index();
            $table->string('st_password');

            $table->unsignedBigInteger('id_role')->default(2); // 1: Admin, 2: User

            $table->unsignedBigInteger('id_created_by')->nullable();

            $table->string('st_reset_token')->nullable();
            $table->timestamp('dt_reset_token_expires_at')->nullable();

            $table->boolean('bl_active')->default(true);

            $table->timestamp('dt_created_at')->useCurrent();
            $table->timestamp('dt_updated_at')->useCurrent()->useCurrentOnUpdate();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_users');
    }
};
