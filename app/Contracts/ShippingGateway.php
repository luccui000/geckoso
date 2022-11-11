<?php

namespace App\Contracts;


use App\Services\GiaoHangNhanh;

interface ShippingGateway
{
    public function shipping($wardCode, $districtCode, $provinceCode, $serviceType = null);
    public function setHeight($height): GiaoHangNhanh;
    public function setWidth($width): GiaoHangNhanh;
    public function setWeight($weight): GiaoHangNhanh;
    public function setLength($length): GiaoHangNhanh;
    public function setInsuranceValue($insuranceValue): GiaoHangNhanh;
    public function setCoupon($coupon): GiaoHangNhanh;
}
