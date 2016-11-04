<?php
  $result = array();
  $callback = $_GET['callback'];
  $postCode = $_GET['value1'];
  $postColor = $_GET['value2'];
  $resultData = 'failed';

  $connection = mysqli_connect("localhost", "root", "1234", "rsms2");
  mysqli_query($connection, "set names utf8");

  $query = mysqli_query($connection, "SELECT * FROM product_type WHERE (p_code = '". $postCode ."') AND (p_color = '".$postColor."')");

  if($query) {

    $resultData = "success";
    $data = array();

    $num = mysqli_num_rows($query);

    for($i = 0; $i < $num; $i++) {

    $row = mysqli_fetch_array($query);

    $pSize = $row['p_size'];
    $pNum = $row['p_num'];

    $data[$i] = array();
    $data[$i]['pSize'] = $pSize;
    $data[$i]['pNum'] = $pNum;

    }

  }

  $result = array('result' => $resultData, 'data' => $data);

  mysqli_close($connection);

  echo $callback . "(" . json_encode($result) . ")";

?>
