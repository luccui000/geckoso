<?php

namespace App\Services;

use App\Contracts\ObjectContract;
use App\Object\FileObject;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUpload
{
    protected $name;
    protected $path;
    protected $ext;
    protected $mime;
    protected $size;
    protected $disk;

    public function upload(UploadedFile $file, $folder, $filename = null, $disk = 'public'): ObjectContract
    {
        $filename = $filename ?? $this->makeUniqueFileName($file);

        $this->path = Storage::disk($this->disk)->putFileAs($folder, $file, $filename);
        $this->ext  = $file->getClientOriginalExtension();
        $this->mime = $file->getClientMimeType();
        $this->size = $file->getSize();
        $this->name = $filename;
        $this->disk = $disk;

        return $this->getResource();
    }

    public function getResource(): FileObject
    {
        return new FileObject(
            $this->name,
            $this->path,
            $this->ext,
            $this->mime,
            $this->size,
            $this->disk
        );
    }

    private function makeUniqueFileName(UploadedFile $file): string
    {
        return Str::slug($file->getClientOriginalName()) . "-" . Str::random(5) . "." . $file->getClientOriginalExtension();
    }
}
