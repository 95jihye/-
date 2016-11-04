<?php

  $result = array();
  $callback = $_GET['callback'];
  $resultName = $_GET['value1'];
  $select = $_GET['value2'];
  $resultData = 'failed';


  //데이터 베이스 연결
  $connection = mysqli_connect("localhost", "root", "1234", "rsms2");
  mysqli_query($connection, "set names utf8");

  //검색 쿼리
  $query = mysqli_query($connection, "SELECT s_num FROM store WHERE (s_name = '" . $resultName ."')");

  //해당 층 매장 검색

  $postValue = ($query / 14) + 1;
  $sfloor = ($postValue*14)-13;
  $efloor = ($postValue*14);

  $query2 = mysqli_query($connection, "SELECT * FROM store WHERE (s_num >= '".$sfloor."') AND (s_num <= '".$efloor."')")

  //쿼리문 성공시
  if(($query) && ($query2)) {

    $resultData = "success";
    $data = array();

    $num = mysqli_num_rows($query2);



    for($i = 0; $i < $num; $i++) {

       //mysqli_data_seek($i);

      $row = mysqli_fetch_array($query);

      $sNum = $row['s_num'];
      $sName = $row['s_name'];

      $data[$i] = array();
      $data[$i]['sNum'] = $sNum;
      $data[$i]['sName'] = $sName;

    }

  }

  $result = array('result' => $resultData, 'data' => $data);

  mysqli_close($connection);

  echo $callback . "(" . json_encode($result) . ")";


?>
