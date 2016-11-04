<?php

$callback = $_GET['callback'];
$postNUM = $_GET['userNUM'];
$resultData = 'failed';

$connection = mysqli_connect("localhost", "root", "1234", "rsms2");
mysqli_query($connection, "set names utf8");

$query = mysqli_query($connection, "SELECT * FROM deal WHERE m_num = ('".$postNUM."')");

if($query){

  $resultData = "success";
  $data = array();
  $data2 = array();
  $num = mysqli_num_rows($query);

  for($i = 0; $i < $num; $i++) {

    $row = mysqli_fetch_array($query);

    $pCode = $row['p_code'];
    $dDate = $row['d_date'];
    $dNum = $row['d_num'];
    $dType = $row['d_type'];
    $dBuyer = $row['d_buyer'];
    $pColor = $row['p_color'];
    $pSize = $row['p_size'];
    $pGroup = $row['p_group'];

    //해당 상품의 매장 이름 찾기 및 상품 이름
    $query2 = mysqli_query($connection, "SELECT * FROM product WHERE (p_code = '".$pCode."') ");
    $row2 = mysqli_fetch_array($query2);
    $sNum = $row2['s_num'];
    $pName = $row2['p_name'];
    $dMoney = $row2['p_sell'];

    //매장 이름 찾기
    $query3 = mysqli_query($connection, " SELECT * FROM store WHERE (s_num = '".$sNum."') ");
    $row3 = mysqli_fetch_array($query3);
    $sName = $row3['s_name'];

    //판매자 찾기
    $query4 = mysqli_query($connection, " SELECT * FROM member WHERE (m_num = '".$dBuyer."') ");
    $row4 = mysqli_fetch_array($query4);
    $dBuyer = $row4['m_name'];

    $data[$i] = array();
    $data[$i]['sName'] = $sName;
    $data[$i]['pName'] = $pName;
    $data[$i]['pColor'] = $pColor;
    $data[$i]['pSize'] = $pSize;
    $data[$i]['dDate'] = $dDate;
    $data[$i]['dNum'] = $dNum;
    $data[$i]['dType'] = $dType;
    $data[$i]['dBuyer'] = $dBuyer;
    $data[$i]['pGroup'] = $pGroup;
    $data[$i]['dMoney'] = $dMoney;

    }

  } //end of for

  // 모바일 영수증 미리보기 데이터
  // 한 매장에서 같은 시각에 계산된 것들끼리 묶어서 보여줌
  // $query5 = mysqli_query($connection, "SELECT DISTINCT d_date FROM deal WHERE (m_num = '".$postNUM."') AND (d_date = '".$dDate."') ");
  // $num2 = mysqli_num_rows($query5);

  // $data2 = $num2;

$result = array('result' => $resultData, 'data' => $data);

mysqli_close($connection);

echo $callback . "(" . json_encode($result) . ")";



?>
