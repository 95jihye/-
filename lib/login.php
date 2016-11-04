<?php

$result = array();
$callback = $_GET['callback'];
$postID = $_GET['loginID'];
$postPW = $_GET['loginPW'];
$resultData = 'failed';
$resultState = 0; //오류를 판별하기 위한 변수
$resultName = null; //회원 이름

$connection = mysqli_connect("localhost", "root", "1234", "rsms2");
mysqli_query($connection, "set names utf8");

$query = mysqli_query($connection, "SELECT * FROM member WHERE (m_id = '".$postID."') AND (m_passwd = '".$postPW."')");

if( mysqli_num_rows($query) == 0 ) {

  $resultData = "success";

  $query2 = mysqli_query($connection, "SELECT * FROM member WHERE (m_id = '".$postID."')");

  if( mysqli_num_rows($query2) == 0 ) {

    $resultState = 1; // 아이디 오류

  }else {

    $resultState = 2; // 비밀번호 오류
  }

} else {

  $resultData = "success";

  $row = mysqli_fetch_array($query);

  $resultNum = $row['m_num'];
  $resultName = $row['m_name'];

}

$result = array('result' => $resultData, 'resultState' => $resultState, 'resultName' => $resultName, 'resultNum'=> $resultNum);

mysqli_close($connection);

echo $callback . "(" . json_encode($result) . ")";


?>
