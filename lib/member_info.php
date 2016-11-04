<?php

$result = array();
$callback = $_GET['callback'];
$postID = $_GET['value'];
$resultData = 'failed';

$connection = mysqli_connect("localhost", "root", "1234", "rsms2");
mysqli_query($connection, "set names utf8");

$query = mysqli_query($connection, "SELECT * FROM member WHERE (m_id = '".$postID."')");


if( $query ) {

  $resultData = "success";
  $data = array();

  $num = mysqli_num_rows($query);

  for($i = 0; $i < $num; $i++) {

    $row = mysqli_fetch_array($query);

    $mId = $row['m_id'];
    $mName = $row['m_name'];
    $mSex = $row['m_sex'];
    $mBirth = $row['m_birth'];
    $mTel = $row['m_tel'];
    $mAddr = $row['m_addr'];
    $mEmail = $row['m_email'];
    $mClass = $row['m_class'];
    $mImg = $row['m_img'];

    $query2 = mysqli_query($connection, "SELECT * FROM class WHERE (c_num = '".$mClass."')");
    $row2 = mysqli_fetch_array($query2);
    $mClass = $row2['c_name'];

    $data[$i] = array();
    $data[$i]['mId'] = $mId;
    $data[$i]['mName'] = $mName;
    $data[$i]['mSex'] = $mSex;
    $data[$i]['mBirth'] = $mBirth;
    $data[$i]['mTel'] = $mTel;
    $data[$i]['mAddr'] = $mAddr;
    $data[$i]['mEmail'] = $mEmail;
    $data[$i]['mClass'] = $mClass;
    $data[$i]['mImg'] = $mImg;

  }

} // end of if

$result = array('result' => $resultData, 'data' => $data);

mysqli_close($connection);

echo $callback . "(" . json_encode($result) . ")";



?>
