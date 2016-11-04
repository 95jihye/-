<?php

$callback = $_GET['callback'];
$postCode = $_GET['selectCode'];
$postColor = $_GET['selectColor'];
$postSize = $_GET['selectSize'];
$postNUM = $_GET['userNUM'];
$resultData = 'failed';

$connection = mysqli_connect("localhost", "root", "1234", "rsms2");
mysqli_query($connection, "set names utf8");

$query = mysqli_query($connection, "INSERT INTO product_favorite VALUES ($postNUM, '".$postCode."', '".$postColor."', '".$postSize."', now())");

if($query) {
  $resultData = 'success';
}

mysqli_close($connection);

echo $callback . "(" . json_encode($resultData) . ")";


?>
