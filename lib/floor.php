<?php

  $result = array();
  $callback = $_GET['callback'];
  $postValue = $_GET['value'];
  $resultData = 'failed';
  $sfloor = ($postValue*14)-13;
  $efloor = ($postValue*14);

  //데이터 베이스 연결
  $connection = mysqli_connect("localhost", "root", "1234", "rsms2");
  mysqli_query($connection, "set names utf8");

  //검색 쿼리
  $query = mysqli_query($connection, "SELECT * FROM store WHERE (s_num >= '".$sfloor."') AND (s_num <= '".$efloor."')");


  //쿼리문 성공시
  if($query){

    $resultData = "success";
    $data = array();

    $num = mysqli_num_rows($query);



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
