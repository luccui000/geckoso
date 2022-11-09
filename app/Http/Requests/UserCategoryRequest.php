<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserCategoryRequest extends FormRequest
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
        $rules = [ 'name' => 'required' ];

        if(request()->has('parent_id') && request('parent_id') != 0)
            $rules['parent_id'] = 'exists:user_categories,id';

        return $rules;
    }
}
