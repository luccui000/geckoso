<?php

namespace App\Services;

use App\Contracts\ShippingGateway;
use App\Exceptions\PaymentRequestException;
use App\Exceptions\PaymentServiceException;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class GiaoHangNhanh implements ShippingGateway
{
    const DI_BO             = 'Đi bộ';
    const CHUYEN_PHAT_NHANH = 'Chuyển phát nhanh';
    const TIET_KIEM         =  'Tiết kiệm';

    private $httpClient;
    private $config;
    private $height;
    private $width;
    private $weight;
    private $length;
    private $insuranceValue;
    private $coupon;
    private $serviceType;

    public function __construct(array $config = [])
    {
        $this->config = empty($config) ? config('ghn') : $config;

        $this->httpClient = new Client([
            'base_uri' => $this->config['base_uri'],
            'headers' => [
                'Content-Type' => 'application/json',
                'Token' => $this->config['token'],
                'ShopId' => $this->config['shop_id']
            ]
        ]);

        $this->setDefaultValue();
    }

    private function setDefaultValue()
    {
        $this->height           = 0;
        $this->width            = 0;
        $this->weight           = 5;
        $this->length           = 0;
        $this->insuranceValue   = 0;
        $this->coupon           = "";
        $this->serviceType      = self::TIET_KIEM;
    }

    public function shipping($wardCode, $districtCode, $provinceCode, $serviceType = null)
    {
        try {
            $serviceId = $this->getValidService($districtCode, $serviceType);

            $response = $this->httpClient
                ->request('POST', '/shiip/public-api/v2/shipping-order/fee', [
                    'json' => [
                        'from_district_id'  => +$this->config['district_id'],
                        'service_id'        => $serviceId,
                        'service_type_id'   => 2,
                        'to_ward_code'      => +$wardCode,
                        'to_district_id'    => +$districtCode,
                        'height'            => +$this->height,
                        'length'            => +$this->length,
                        'weight'            => +$this->weight,
                        'width'             => +$this->width,
                        'insurance_value'   => $this->insuranceValue,
                        'coupon'            => $this->coupon
                    ]
                ]);

            $content = $response->getBody()->getContents();
            return optional(json_decode($content))->data;
        } catch (PaymentRequestException | PaymentServiceException | GuzzleException $exception) {
            return 0;
        }
    }

    /**
     * @throws PaymentServiceException
     */
    private function getValidService($districtCode, $serviceType = null)
    {
        $services = $this->getServices($districtCode);

        $serviceType = $serviceType ?? $this->serviceType;

        $foundedService = collect($services)->first(function($service) use ($serviceType) {
            return $service->short_name == $serviceType;
        });

        if(!$foundedService) {
            throw new PaymentServiceException("Không hỗ trợ giao hàng");
        }

        return $foundedService->service_id;
    }

    public function getServices($districtCode)
    {
        try {
            $response = $this->httpClient
                ->request('POST', '/shiip/public-api/v2/shipping-order/available-services', [
                    'json' => [
                        'shop_id'       => +($this->config['shop_id']),
                        'from_district' => +$this->config['district_id'],
                        'to_district'   => +($districtCode)
                    ]
                ]);

            $collectData = $response->getBody()->getContents();

            if($response->getStatusCode() != 200)
                throw new PaymentRequestException('Không thể tìm thấy dịch vụ');

            return optional(json_decode($collectData))->data;
        } catch (GuzzleException | \Exception $e) {
            return [];
        }
    }

    /**
     * @return mixed
     */
    public function getHeight()
    {
        return $this->height;
    }

    /**
     * @param mixed $height
     */
    public function setHeight($height): GiaoHangNhanh
    {
        $this->height = $height;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getWidth()
    {
        return $this->width;
    }

    /**
     * @param mixed $width
     */
    public function setWidth($width): GiaoHangNhanh
    {
        $this->width = $width;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * @param mixed $weight
     */
    public function setWeight($weight): GiaoHangNhanh
    {
        $this->weight = $weight;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getLength()
    {
        return $this->length;
    }

    /**
     * @param mixed $length
     */
    public function setLength($length): GiaoHangNhanh
    {
        $this->length = $length;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getInsuranceValue()
    {
        return $this->insuranceValue;
    }

    /**
     * @param mixed $insuranceValue
     */
    public function setInsuranceValue($insuranceValue): GiaoHangNhanh
    {
        $this->insuranceValue = $insuranceValue;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCoupon()
    {
        return $this->coupon;
    }

    /**
     * @param mixed $coupon
     */
    public function setCoupon($coupon): GiaoHangNhanh
    {
        $this->coupon = $coupon;
        return $this;
    }
}
