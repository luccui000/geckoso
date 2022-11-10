<?php

namespace App\Contracts;

use Illuminate\Http\UploadedFile;

interface FileUploadContract
{
    public function upload(UploadedFile $file, $folder, $filename = null, $disk = 'public'): ObjectContract;
}
