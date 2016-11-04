$(document).ready(function(){

  $('#state').click(function(){

    //로그아웃
    if( localStorage['userID'] ) {

      if(window.confirm("로그아웃 하시겠습니까?")) {

        localStorage.clear();

        location.href = './index.html';
      }

    } else {

      location.href = './login.html';

    }

  });

  $('#receipt').click(function(){

    if ( localStorage['userID'] ) {

      location.href = './receipt.html';

    } else {
      window.alert("로그인 후 이용 가능한 서비스입니다.");
      location.href = "./login.html";
    }

  });

  $('#imformation').click(function(){

    if ( localStorage['userID'] ) {

      location.href = './memberInfo.html';

    } else {
      window.alert("로그인 후 이용 가능한 서비스입니다.");
      location.href = "./login.html";
    }


  });

  //회원 ID값
  if( localStorage['userID'] ) {

    var memberInfo = document.getElementById("memberInfo");
    memberInfo.style.visibility = "visible";

    $('#state').text("ログアウト");

    var memberName = localStorage["userName"];

    $('<b></b>').text(memberName + "様").appendTo($('.memberName'));

    // 로그아웃 메뉴로 바뀜

  }

    //coinslider view 조정
   $('.AppMainBody').coinslider({
     sDelay: 20,
     hoverPause: true,
     width: 360,
     height: 390,
     spw: 5,
     sph: 5,
     delay: 3000,
     effect: "straight"
   });


  //카테고리 선택







  /*$('#floor option: selected').click(function(){
    var num = $('#floor option: selected').val();
    document.write(num);

    var value = value;

    $.ajax({
      url: '127.0.0.1/rsms/www/lib/floor.php',
      data: {
        value: value
      },
      dataType: 'jsonp',
      success: function(data){
        if(data.result == "success"){

          var cnt = data.data.length;

          for(var i = 0; i < cnt; i++){
            var sNum = data.data[i].sNum;
            var sName = data.data[i].sName;

            $('<div></div>').addClass('bodyContent').appendTo(sName);
          }

        }
      },
      error: function(){
        window.alert('오류가 발생하였습니다.');
      }
    });

  }); //end of floor
*/

  // $('.AppBody').coinslider({height: 420});


});

// 매장 또는 상품 찾기
  select = 1;

  function store(){
    $('.searchResult').children().remove();
    $('#searchContent').val('');
    document.getElementsByName("searchContent")[0].placeholder="店舗の名前を入力";
    select = 1;
  }

  function product(){
    $('.searchResult').children().remove();
    $('#searchContent').val('');
    document.getElementsByName("searchContent")[0].placeholder="商品の名前を入力";
    select = 2;
  }

  // 서브 메뉴 보이기
  function showSubManu(subManu){
    var sub = document.getElementById("subManu");
    sub.style.visibility = "visible";
  }

  // 서브 메뉴 숨기기
  function hideSubManu(subManu){
    var sub = document.getElementById("subManu");
    sub.style.visibility = "hidden";
  }


//층 선택
function sub()
{
  var x = floor.value;
  console.log(x);

  if(x == 0) {
    $('.store').children().remove();
    $('.store').text('');
  }

  $.ajax({

    url: 'http://107.161.27.109/jihye/floor.php',
    data: {
      value: x
    },
    dataType: 'jsonp',
    success: function(data){
      if(data.result == "success"){
         var cnt = data.data.length;

        for(var i = 0; i < cnt; i++){

          var sNum = data.data[i].sNum;
          var sName = data.data[i].sName;

          $('#'+i).text(data.data[i].sName);
        }

    }
    },
    error: function(){
      window.alert('오류가 발생하였습니다.');
    }
  });
}


//검색 쿼리
function searchResult($select){

  $('.searchResult').children().remove(); //새로운 화면
  $('.detailResult').children().remove(); //새로운 화면

  var search = document.getElementsByName("searchContent")[0].value;

    $.ajax({

      url: 'http://107.161.27.109/jihye/search.php',
      data: {
        value1: select,
        value2: search
      },
      dataType: 'jsonp',
      success: function(data){

      if(data.result == "success" && data.data[0] != null && data.select == 1){
        /*
        for(var i = 0; i < data.data.length; i++) {

          $('<img></img>').addClass('resultImg').appendTo($('.searchResult'));
          $('<div></div>').text(data.data[i].sName).addClass('resultName').appendTo($('.searchResult'));
          $('<div></div>').text(data.data[i].sTel).addClass('resultTel').appendTo($('.searchResult'));

          resultName = data.data[i].sName;
          select = data.select;

          $('.resultImg').attr("src", "."+data.data[i].sImg+".jpg");
          $('.resultImg').attr("onclick", "productInfo(resultName,select)");
        }

        } else if (data.result == "success" && data.data[0] != null && data.select == 2) {

            for(var i = 0; i < data.data.length; i++) {

            $('<img></img>').addClass('resultImg').appendTo($('.searchResult'));
            $('<div></div>').text(data.data[i].pName).addClass('resultName').appendTo($('.searchResult'));
            $('<div></div>').text("["+data.data[i].pCategory+"]").addClass('resultCategory').appendTo($('.searchResult'));
            $('<div></div>').text("￦ " + data.data[i].pSell).addClass('resultSell').appendTo($('.searchResult'));

            resultName = data.data[i].pName;
            select = data.select;

            $('.resultImg').attr("src", "."+data.data[i].pImg+".jpg");
            $('.resultImg').attr("onclick", "productInfo(resultName,select)");
          } */

        $('<img></img>').addClass('resultImg').appendTo($('.searchResult'));
        $('<div></div>').text(data.data[0].sName).addClass('resultName').appendTo($('.searchResult'));
        $('<div></div>').text(data.data[0].sTel).addClass('resultTel').appendTo($('.searchResult'));

        resultName = data.data[0].sName;
        select = data.select;

        $('.resultImg').attr("src", "."+data.data[0].sImg+".jpg");
        $('.resultImg').attr("onclick", "productInfo(resultName,select)");

      } else if (data.result == "success" && data.data[0] != null && data.select == 2) {

        $('<img></img>').addClass('resultImg').appendTo($('.searchResult'));
        $('<div></div>').text(data.data[0].pName).addClass('resultName').appendTo($('.searchResult'));
        $('<div></div>').text("["+data.data[0].pCategory+"]").addClass('resultCategory').appendTo($('.searchResult'));
        $('<div></div>').text("￦ " + data.data[0].pSell).addClass('resultSell').appendTo($('.searchResult'));

        resultName = data.data[0].pName;
        select = data.select;

        $('.resultImg').attr("src", "."+data.data[0].pImg+".jpg");
        $('.resultImg').attr("onclick", "productInfo(resultName,select)");

      } else {
        window.alert('해당 데이터가 없습니다.');
      }
      },
      error: function(){
        window.alert('오류가 발생하였습니다.');
      }

    });
  }



  //상세 보기 페이지
  function productInfo($resultName,$select){

    var url = "./productInfo.html?resultName=" + encodeURI(encodeURIComponent($resultName))  + "&select=" + encodeURI(encodeURIComponent($select));
    $(location).attr('href', url);

  }


  //로그인 페이지
  function login() {

    var loginID = document.getElementsByName("loginID")[0].value;
    var loginPW = document.getElementsByName("loginPW")[0].value;

    if(!loginID) {
      window.alert('아이디를 입력해 주세요');
    }

    else if(!loginPW) {
      window.alert('비밀번호를 입력해 주세요');
    }

    else {

      $.ajax({

        url: 'http://107.161.27.109/jihye/login.php',
        data: {
          loginID: loginID,
          loginPW: loginPW
        },
        dataType: 'jsonp',
        success: function(data){

          if(data.result == "success" && data.resultState == 0){

            localStorage['userName'] = data.resultName;
            localStorage['userID'] = loginID;
            localStorage['userNum'] = data.resultNum;

            var url = "./index.html";
            $(location).attr('href', url);

          }else if(data.resultState == 1) {
            window.alert('아이디 오류');
          }else if(data.resultState == 2) {
            window.alert('비밀번호 오류');
          }
        },
        error: function(){
          window.alert('오류가 발생하였습니다.');
        }

      });

    }


    /*
    var allcookies = document.cookie;

     alert("모든쿠키값 : " + allcookies );

     // Get all the cookies pairs in an array
     cookiearray  = allcookies.split(';');

     // Now take key value pair out of this array
     for(var i=0; i<cookiearray.length; i++){
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
        alert("키 : " + name + " , 값 : " + value);
     }
     */


  }
