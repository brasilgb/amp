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
        Schema::create('subsidiaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->nullable()->constrained();
            $table->string('subnumber', 50);
            $table->string('subname', 50);
            $table->string('address', 80);
            $table->integer('number');
            $table->string('cep', 20);
            $table->string('county', 50);
            $table->string('state', 20);
            $table->string('neighborhood', 50);
            $table->string('cnpj', 50);
            $table->string('statereg', 50);
            $table->string('telephone', 20);
            $table->string('whatsapp', 20)->nullable();
            $table->text('observation')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subsidiaries');
    }
};
