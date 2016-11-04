<?php

  $result = array();
  $callback = $_GET['callback'];
  $postResult = $_GET['value1'];
  $postSelect = $_GET['value2'];
  $resultData = 'failed';

  // 데이터 베이스 연결
  $connection = mysqli_connect("localhost", "root", "1234", "rsms2");
  mysqli_query($connection, "set names utf8");

  // 검색 쿼리

  if($postSelect == 1){ // 매장 검색
    $query1 = mysqli_query($connection, "SELECT * FROM store WHERE (s_name = '". $postResult ."')");
  }else { // 상품 검색
    $query2 = mysqli_query($connection, "SELECT * FROM product WHERE (p_name = '".$postResult."')");
  }

  //매장 검색 결과
  if( $query1 && ($postSelect == 1) ) {

    $resultData = "success";
    $data = array();
    $select = 1;

      $num = mysqli_num_rows($query1);

      for($i = 0; $i < $num; $i++) {

      $row = mysqli_fetch_array($query1);

      $sNum = $row['s_num'];
      $sName = $row['s_name'];
      $sTel = $row['s_tel'];
      $sManage = $row['s_manage'];
      $sBnum = $row['s_bnum'];
      $sDate = $row['s_date'];
      $sImg = $row['s_img'];

      // 관리자 이름 찾기
      $query3 = mysqli_query($connection, "SELECT * FROM member WHERE (m_num = '". $sManage ."')");
      $row2 = mysqli_fetch_array($query3);
      $sManage = $row2['m_name'];

      $data[$i] = array();
      $data[$i]['sNum'] = $sNum;
      $data[$i]['sName'] = $sName;
      $data[$i]['sTel'] = $sTel;
      $data[$i]['sManage'] = $sManage;
      $data[$i]['sBnum'] = $sBnum;
      $data[$i]['sDate'] = $sDate;
      $data[$i]['sImg'] = $sImg;
      }

    //상품 검색 결과
  } else {

      $resultData = "success";
      $data = array();
      $data2 = array();
      $select = 2;

        $num = mysqli_num_rows($query2);

        for($i = 0; $i < $num; $i++) {

        $row = mysqli_fetch_array($query2);

        $pCode = $row['p_code'];
        $pModel = $row['p_model'];
        $sNum = $row['s_num'];
        $pName = $row['p_name'];
        $pCategory = $row['p_category'];
        $pSell = $row['p_sell'];
        $pImg = $row['p_img'];

        // 매장 이름 찾기
        $query4 = mysqli_query($connection, "SELECT * FROM store WHERE (s_num = '". $sNum ."')");
        $row2 = mysqli_fetch_array($query4);
        $sName = $row2['s_name'];

        $data[$i] = array();
        $data[$i]['pCode'] = $pCode;
        $data[$i]['pModel'] = $pModel;
        $data[$i]['sName'] = $sName;
        $data[$i]['sNum'] = $sNum;
        $data[$i]['pName'] = $pName;
        $data[$i]['pCategory'] = $pCategory;
        $data[$i]['pSell'] = $pSell;
        $data[$i]['pImg'] = $pImg;

        $query5 = mysqli_query($connection, "SELECT DISTINCT p_color FROM product_type WHERE (p_code = '". $pCode ."')");
        $num2 = mysqli_num_rows($query5);

          for($j = 0; $j < $num2; $j++) {

          $row3 = mysqli_fetch_array($query5);

          $pColor = $row3['p_color'];
          $pSize = $row3['p_size'];
          $pNum = $row3['p_num'];

          $data2[$j] = array();
          $data2[$j]['pColor'] = $pColor;
          }

        }
  }

  $result = array('result' => $resultData, 'data' => $data, 'data2' => $data2, 'select' => $select);

  mysqli_close($connection);

  echo $callback . "(" . json_encode($result) . ")";


?>
