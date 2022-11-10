<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'      => 'required',
            'content'      => 'required',
            'vote'      => 'required|numeric|min:1|max:5'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Vui lòng nhập vào họ tên',
            'vote.required' => 'Vui lòng đánh giá sao',
            'vote.numeric'  =>  'Đánh giá không hợp lệ',
            'vote.min'      => 'Sao đánh giá phải từ 1 đến 5',
            'vote.max'      => 'Sao đánh giá phải từ 1 đến 5'
        ];
    }
}
