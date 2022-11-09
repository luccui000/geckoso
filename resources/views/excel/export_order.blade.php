<?php
$apiCore = new \App\Api\Core();
$apiMobile = new \App\Api\Mobile();
$isMobile = $apiMobile->isMobile();

$viewer = $apiCore->getViewer();

?>

<table border="1">
    <tr>
        <th style="width: 5px;"><b>STT</b></th>
        <th style="width: 15px;"><b>THỜI GIAN</b></th>
        <th style="width: 15px;"><b>MÃ<br/>ĐƠN HÀNG</b></th>
        <th style="width: 15px;"><b>MÃ<br/>VẬN ĐƠN</b></th>
        <th style="width: 15px;"><b>MÃ ĐỐI TÁC<br/>KH (nếu có)</b></th>
        <th style="width: 25px;"><b>KHÁCH HÀNG</b></th>
        <th style="width: 15px;"><b>MÃ NGƯỜI<br/>GIỚI THIỆU</b></th>
        <th style="width: 25px;"><b>NGƯỜI<br/>GIỚI THIỆU</b></th>
        <th style="width: 15px;"><b>TỔNG<br/>SỐ LƯỢNG SP</b></th>
        <th style="width: 15px;"><b>TỔNG<br/>TIỀN HÀNG</b></th>
        <th style="width: 15px;"><b>TỔNG<br/>GIẢM GIÁ</b></th>
        <th style="width: 15px;"><b>PHÍ<br/>GIAO HÀNG</b></th>
        <th style="width: 15px;"><b>MIỄN PHÍ<br/>GIAO HÀNG</b></th>
        <th style="width: 15px;"><b>TỔNG<br/>THANH TOÁN</b></th>
        <th style="width: 15px;"><b>DOANH SỐ<br/>NET</b></th>
        <th style="width: 25px;"><b>PHƯƠNG THỨC<br/>THANH TOÁN</b></th>
        <th style="width: 25px;"><b>TRẠNG THÁI<br/>THANH TOÁN</b></th>
        <th style="width: 25px;"><b>TRẠNG THÁI<br/>ĐƠN HÀNG</b></th>
    </tr>
    @if (count($items))
        <?php
        $stt = 0;
        foreach($items as $order):
        $stt++;
        ?>
        <tr>
            <td style="text-align: center;">{{$stt}}</td>
            <td>
                <div>{{date('d-m-Y', strtotime($order->created_at))}}</div>
                <br/>
                <div>{{date('H:i:s', strtotime($order->created_at))}}</div>
            </td>
            <td>{{$order->href}}</td>
            <td>{{$order->ghn_code}}</td>
            <td>
                @if ($order->getOwner() && $order->getOwner()->doiTacHopLe())
                    <div>{{$order->getOwner()->ref_code}}</div>
                @endif
            </td>
            <td>
                @if ($order->getOwner())
                    <div>{{$order->getOwner()->getTitle()}}</div>
                    <br/>
                    <div>{{$order->getOwner()->phone}}</div>
                    <br/>
                    <div>{{$order->getOwner()->email}}</div>
                @else
                    <div>{{$order->name}}</div>
                    <br/>
                    <div>{{$order->phone}}</div>
                    <br/>
                    <div>{{$order->email}}</div>
                @endif
            </td>
            <td>
                @if ($order->getRefer() && $order->getRefer()->doiTacHopLe())
                    <div>{{$order->getRefer()->ref_code}}</div>
                @endif
            </td>
            <td>
                @if ($order->getRefer())
                    <div>{{$order->getRefer()->getTitle()}}</div>
                    <br/>
                    <div>{{$order->getRefer()->phone}}</div>
                    <br/>
                    <div>{{$order->getRefer()->email}}</div>
                @endif
            </td>
            <td style="text-align: center;">{{$apiCore->numberToExcel($order->total_quantity)}}</td>
            <td style="text-align: right;">{{$apiCore->numberToExcel($order->total_cart)}}</td>
            <td style="text-align: right;">{{$apiCore->numberToExcel($order->total_discount)}}</td>
            <td style="text-align: right;">{{$apiCore->numberToExcel($order->total_ship)}}</td>
            <td style="text-align: center;">{{$order->free_ship ? 'Có' : 'Không'}}</td>
            <td style="text-align: right;">{{$apiCore->numberToExcel($order->total_price)}}</td>
            <td style="text-align: right;">{{$apiCore->numberToExcel($order->total_cart - $order->total_discount)}}</td>
            <td>{{$order->getPaymentText()}}</td>
            <td>{{$order->getStatus()}}</td>
            <td>{{$order->getGhnStatus()}}</td>
        </tr>
        <?php endforeach;?>
    @endif
</table>
