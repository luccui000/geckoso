<?php

namespace App\Excel;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class ExportClient implements FromView
{
    private $items;

    public function setItems($items)
    {
        $this->items = $items;
    }

    public function view(): View
    {

        return view('excel.export_client', [
            'items' => $this->items,
        ]);
    }
}
