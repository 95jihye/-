<?php
//해당 회원의 관심 상품 검색

$result = array();
$callback = $_GET['callback'];
$postNUM = $_GET['userNUM'];
$resultData = 'failed';

$connection = mysqli_connect("localhost", "root", "1234", "rsms2");
mysqli_query($connection, "set names utf8");

$query = mysqli_query($connection, "SELECT * FROM product_favorite WHERE (m_num = '".$postNUM."') ");

if($query){

  $resultData = "success";
  $data = array();
  $num = mysqli_num_rows($query);

  for($i = 0; $i < $num; $i++) {

    $row = mysqli_fetch_array($query);

    $pCode = $row['p_code'];
    $pColor = $row['p_color'];
    $pSize = $row['p_size'];
    $pDate = $row['pf_date'];

    $query2 = mysqli_query($connection, "SELECT * FROM product WHERE (p_code = '".$pCode."') ");
    $row2 = mysqli_fetch_array($query2);
    $pName = $row2['p_name'];
    $pImg = $row2['p_img'];

    $query3 = mysqli_query($connection, "SELECT * FROM product_type WHERE (p_code = '".$pCode."') AND (p_color = '".$pColor."') AND (p_size = '".$pSize."') ");
    $row3 = mysqli_fetch_array($query3);
    $pNum = $row3['p_num'];

    $data[$i] = array();
    $data[$i]['pCode'] = $pCode;
    $data[$i]['pColor'] = $pColor;
    $data[$i]['pSize'] = $pSize;
    $data[$i]['pDate'] = $pDate;
    $data[$i]['pName'] = $pName;
    $data[$i]['pImg'] = $pImg;
    $data[$i]['pNum'] = $pNum;

  } //end of for

}

$result = array('result' => $resultData, 'data' => $data);

mysqli_close($connection);

echo $callback . "(" . json_encode($result) . ")";

?>
