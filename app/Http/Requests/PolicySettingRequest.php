<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PolicySettingRequest extends FormRequest
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
            'title'     => 'required|min:5|max:200',
            'content'   => 'required'
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Vui lòng nhập thông tin tiêu đề',
            'title.min' => 'Tiêu đề qúa ngắn',
            'title.max' => 'Tiêu đề qúa dài',
        ];
    }
}
