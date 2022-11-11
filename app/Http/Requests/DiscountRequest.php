<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DiscountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return request()->method() === 'POST' ?
            user_can('discount_add') :
            user_can('discount_edit');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $type = request('type', 'percent');
        $min = config("constants.discount.{$type}.min");
        $max = config("constants.discount.{$type}.max");

        $rules = [
            'type'  => 'bail|required|in:percent,amount',
            'value' => "required|numeric|min:{$min}|max:{$max}"
        ];

        if(request()->method() === 'POST')
            $rules['user_category_id'] = 'required|exists:user_categories,id';

        return $rules;
    }

    public function messages(): array
    {
        return [
            'type.required' => 'Vui lòng chọn hình thức giảm',
            'type.in' => 'Hình thức giảm không hợp lệ',
            'value.required' => 'Vui lòng nhập thông tin giảm',
            'value.numeric' => 'Giá trị không hợp lệ',
            'value.min' => 'Giá trị không hợp lệ',
            'value.max' => 'Giá trị không hợp lệ',
            'user_category_id.required' => 'Vui lòng chọn nhóm khách hàng',
            'user_category_id.exists' => 'Nhóm khách hàng không hợp lệ',
        ];
    }
}
