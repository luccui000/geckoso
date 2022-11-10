<?php

return [
    'rate' => [
        'pagination' => [
            'per_page' => 2
        ]
    ],
    'discount' => [
        'percent' => [
            'min' => 1,
            'max' => 100
        ],
        'amount' => [
            'min' => 1,
            'max' => 1000000,
        ]
    ]
];
