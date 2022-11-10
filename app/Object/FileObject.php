<?php

namespace App\Object;

use App\Contracts\ObjectContract;

class FileObject implements ObjectContract
{
    public $name;
    public $path;
    public $ext;
    public $mime;
    public $size;
    public $disk;

    public function __construct($name, $path, $extension, $mime, $size, $disk)
    {
        $this->name = $name;
        $this->path = $path;
        $this->ext = $extension;
        $this->mime = $mime;
        $this->size = $size;
        $this->disk = $disk;
    }

    public function toArray(): array
    {
        return [
            'name'          => $this->name,
            'path'          => $this->path,
            'extension'     => $this->ext,
            'mime'          => $this->mime,
            'size'          => $this->size,
            'disk'          => $this->disk,
        ];
    }

}
