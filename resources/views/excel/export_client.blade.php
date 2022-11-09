<?php
$apiCore = new \App\Api\Core();
$apiMobile = new \App\Api\Mobile();
$isMobile = $apiMobile->isMobile();

$viewer = $apiCore->getViewer();

?>

<table border="1">
    <tr>
        <th>tên khách hàng</th>
        <th>Điện thoại</th>
        <th>Email</th>
        <th>Đơn hàng đầu tiên</th>
    </tr>
    @if (count($items))
        <?php foreach($items as $client):  ?>
        <tr>
            <td>{{$client->name}}</td>
            <td>{{$client->phone}}</td>
            <td>{{$client->email}}</td>
            <td>{{optional($client->firstOrder)->created_at}}</td>
        </tr>
        <?php endforeach;?>
    @endif
</table>
