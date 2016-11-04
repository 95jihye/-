<?php

  $result = array();
  $callback = $_GET['callback'];
  $storeName = $_GET['value'];
  $resultData = 'failed';

  // 데이터 베이스 연결
  $connection = mysqli_connect("localhost", "root", "1234", "rsms2");
  mysqli_query($connection, "set names utf8");

  // 매장 검색
  $query = mysqli_query($connection, "SELECT * FROM store WHERE (s_name LIKE '%".$storeName."%')");

  if($query){

    $resultData = "success";
    //$data = array();
    $num = mysqli_num_rows($query);

    for($i = 0; $i < $num; $i++) {

    $row = mysqli_fetch_array($query);
    $sNum = $row['s_num'];
    //var_dump($sNum);


    // 해당 매장의 상품 검색
    $query1 = mysqli_query($connection, "SELECT * FROM product WHERE s_num = '$sNum' ");

    if($query1) {

      $num1 = mysqli_num_rows($query1);

      for($j = 0; $j < $num1; $j++){

        $row1 = mysqli_fetch_array($query1);

        $pCode = $row1['p_code'];
        $pName = $row1['p_name'];
        $pSell = $row1['p_sell'];
        $pImg = $row1['p_img'];

        $data[$j] = array();
        $data[$j]['pCode'] = $pCode;
        $data[$j]['pName'] = $pName;
        $data[$j]['pSell'] = $pSell;
        $data[$j]['pImg'] = $pImg;

      }

    }

  } // end of for

  } //end of query if


  $result = array('result' => $resultData, 'data' => $data);

  mysqli_close($connection);

  echo $callback . "(" . json_encode($result) . ")";


?>
