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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sku')->unique(); // Unique Barcode
            $table->decimal('price', 10, 2); // 10 digits total, 2 decimal places (e.g. 99,999,999.99)
            $table->integer('stock');
            $table->enum('status', ['active', 'draft'])->default('active'); // Fixed choices lang
            $table->string('category');       // Dito papasok yung 'Electronics', etc.
            $table->string('image')->nullable(); // Para sa URL ng picture
            $table->text('description')->nullable(); // Para sa long text
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
