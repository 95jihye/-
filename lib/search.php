<?php

  $result = array();
  $callback = $_GET['callback'];
  $postSelect = $_GET['value1'];
  $postSearch = $_GET['value2'];
  $resultData = 'failed';

  // 데이터 베이스 연결
  $connection = mysqli_connect("localhost", "root", "1234", "rsms2");
  mysqli_query($connection, "set names utf8");

  // 검색 쿼리

  if($postSelect == 1){ // 매장 검색
    $query1 = mysqli_query($connection, "SELECT * FROM store WHERE (s_name LIKE '%".$postSearch."%')");
  }else { // 상품 검색
    $query2 = mysqli_query($connection, "SELECT * FROM product WHERE (p_name LIKE '%".$postSearch."%') OR (p_category LIKE '%".$postSearch."%') OR (p_code LIKE '%".$postSearch."%') OR (p_model LIKE '%".$postSearch."%')");
  }


  if( $query1 && ($postSelect == 1) ) {

    $resultData = "success";
    $data = array();
    $select = 1;

    $num = mysqli_num_rows($query1);

    for($i = 0; $i < $num; $i++) {

      $row = mysqli_fetch_array($query1);

      $sName = $row['s_name'];
      $sManage = $row['s_manage'];
      $sImg = $row['s_img'];
      $sTel = $row['s_tel'];

      // 관리자 이름 찾기
      $query3 = mysqli_query($connection, "SELECT * FROM member WHERE (m_num = '".$sManage."')");
      $row2 = mysqli_fetch_array($query3);
      $sManage = $row2['m_name'];

      $data[$i] = array();
      $data[$i]['sName'] = $sName;
      $data[$i]['sManage'] = $sManage;
      $data[$i]['sImg'] = $sImg;
      $data[$i]['sTel'] = $sTel;
    }

  } else {

    $resultData = "success";
    $data = array();
    $select = 2;

    $num = mysqli_num_rows($query2);

    for($i = 0; $i < $num; $i++) {

      $row = mysqli_fetch_array($query2);

      $pName = $row['p_name'];
      $pCategory = $row['p_category'];
      $pSell = $row['p_sell'];
      $pImg = $row['p_img'];

      $data[$i] = array();
      $data[$i]['pName'] = $pName;
      $data[$i]['pCategory'] = $pCategory;
      $data[$i]['pSell'] = $pSell;
      $data[$i]['pImg'] = $pImg;
  }

}

  $result = array('result' => $resultData, 'data' => $data, 'select' => $select);

  mysqli_close($connection);

  echo $callback . "(" . json_encode($result) . ")";


?>
