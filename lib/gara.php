<?php
  $result = array();
  $callback = $_GET['callback'];
  $store = $_GET['value'];
  $product1 = $_GET['value1'];
  $product2 = $_GET['value2'];
  $product3 = $_GET['value3'];
  $select = $_GET['select'];
  $resultData = 'failed';

  $connection = mysqli_connect("localhost", "root", "1234", "rsms");
  mysqli_query($connection, "set names utf8");

  // 매장 검색
  if($select == 1){

    $query = mysqli_query($connection, "SELECT * FROM store WHERE (s_name = '". $store ."')");

    if($query) {

      $resultData = "success";
      $data = array();

      $num = mysqli_num_rows($query);

      for($i = 0; $i < $num; $i++) {

      $row = mysqli_fetch_array($query);

      $sImg = $row['s_img'];

      $data[$i] = array();
      $data[$i]['sImg'] = $sImg;

      }

    }

  }

  $result = array('result' => $resultData, 'data' => $data);

  mysqli_close($connection);

  echo $callback . "(" . json_encode($result) . ")";

?>
