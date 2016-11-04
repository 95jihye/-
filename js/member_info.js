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


    // 서브 메뉴 클릭시
    $(document).on('click','.pageBtn',function(){
        var pageSelect = $(this).val();
        //console.log(pageSelect);
        pageChange(pageSelect);
    });


  }

  //회원 정보 불러오기
  var userID = localStorage['userID'];


  $.ajax({

    url: 'http://107.161.27.109/jihye/member_info.php',
    data: {
      value : userID
    },
    dataType: 'jsonp',
    success: function(data){

      if(data.result == "success"){

        console.log(data);

        $('<div></div>').text(data.data[0].mId).addClass('memberIdText').appendTo($('.memberInfoContent'));
        $('<div></div>').text(data.data[0].mName).addClass('memberNameText').appendTo($('.memberInfoContent'));
        $('<div></div>').text(data.data[0].mBirth).addClass('memberBirthText').appendTo($('.memberInfoContent'));
        $('<div></div>').text(data.data[0].mTel).addClass('memberTelText').appendTo($('.memberInfoContent'));

        $('<div></div>').text(data.data[0].mSex).addClass('memberSexText').appendTo($('.memberInfoContent'));

        if( data.data[0].mSex == 0) {
          $('.memberSexText').text("♂");
          $('.memberSexText').css("color", "blue");
        }else {
          $('.memberSexText').text("♀");
          $('.memberSexText').css("color", "red");
        }

        if( data.data[0].mImg ) {
          $('<img></img>').addClass('memberImg').addClass('memberImg').appendTo($('.memberImg'));
          $('.memberImg').attr("src", "."+data.data[0].mImg);
        } else {
           $('<div></div>').text("사진 없음").addClass('memberImg').appendTo($('.memberInfoContent'));
        }

        $('<div></div>').text(data.data[0].mClass).addClass('memberClassText').appendTo($('.memberInfoContent'));

        $('<div></div>').text("e－mail").addClass('memberEmailText').appendTo($('.memberInfoContent'));
        $('<div></div>').text(data.data[0].mEmail).addClass('memberEmail').appendTo($('.memberInfoContent'));
        $('<div></div>').text("住所").addClass('memberAddrText').appendTo($('.memberInfoContent'));
        $('<div></div>').text(data.data[0].mAddr).addClass('memberAddr').appendTo($('.memberInfoContent'));

        $('<button></button>').text("会員情報編集").addClass('memberModify').appendTo($('.memberInfoContent'));
      }else {
        console.log("데이터가 없습니다.");
      }
    },
    error: function(){
      window.alert('오류가 발생하였습니다.');
    }

  }); //end of ajax



}); //end of ready

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

// 페이지 이동 (회원 정보, 관심 상품, 맞춤 추천)
function pageChange(pageSelect){
  $('.memberInfoContent').children().remove();

  //회원 정보 페이지
  if(pageSelect == "memberInfoPage") {
    var url = "./memberInfo.html";
    $(location).attr('href', url);

  // 관심 상품 페이지
  }else if(pageSelect == "favoritePage") {
    favoritePage();

  //맞춤 추천 페이지
  }else {
    recommendPage();
  }
}



// 관심 상품 페이지
function favoritePage() {

  $('<div></div>').text("▼お気に入りの商品は1ヶ月間保管されます").addClass('favoriteText').appendTo($('.memberInfoContent'));
  userNUM = localStorage['userNum'];

  $.ajax({

    url: 'http://107.161.27.109/jihye/member_like.php',
    data: {
      userNUM: userNUM
    },
    dataType: 'jsonp',
    success: function(data){
      if(data.result == "success" && data.data[0] != null){

         console.log(data);

         var heightValue = 50;
         var select = 2;

         for(var i = 0; i < data.data.length; i++) {
          var productLikeDiv2 = $('<div></div>').addClass('productLikeDiv').appendTo($('.memberInfoContent'));
          productLikeDiv2.attr("id", "productLikeDiv"+i);
          productLikeDiv2.appendTo($('.memberInfoContent'));

          $('#productLikeDiv'+i).css("top", (heightValue+"px"));
          heightValue = (heightValue + 120);

          //상품 체크 박스
          var productChk = $('<input></input>').addClass('productChk').appendTo($('#productLikeDiv'+i));
          productChk.attr("id", "productChk"+i);
          $('#productChk'+i).attr("type", "checkbox");

          //상품 이미지
          var productImg = $('<img></img>').addClass('productImg').appendTo($('#productLikeDiv'+i));
          productImg.attr("id", "productImg"+i);
          productImg.attr("value", data.data[i].pName);
          $('#productImg'+i).attr("src", "."+data.data[i].pImg+".jpg");

          $(document).on('click','#productImg'+i,function(){
            productSelect = $(this).attr('value');
            console.log(productSelect);
            productDetail(productSelect,select);
          });

          //상품 이름
          var productName = $('<div></div>').text(data.data[i].pName).addClass('productName').appendTo($('#productLikeDiv'+i));
          productName.attr("id", "productName"+i);

          //상품 색상
          var productCS = $('<div></div>').text((data.data[i].pColor)+" , "+(data.data[i].pSize) + " Size").addClass('productCS').appendTo($('#productLikeDiv'+i));
          productCS.attr("id", "productCS"+i);

          //남은 재고
          var productNum = $('<div></div>').text("남은 수량 : " + (data.data[i].pNum)).addClass('productNum').appendTo($('#productLikeDiv'+i));
          productNum.attr("id", "productNum"+i);

          /*
          if( i == (data.data.length)-1 ){
            $('<button></button>').text("삭제").addClass('productDelete').appendTo($('.memberInfoContent'));
          }
          */
         }//end of for

         //$('<button></button>').text("삭제").addClass('productDelete').appendTo($('#productLikeDiv'+i));


      }else {
        window.alert("관심 상품으로 등록된 상품이 없습니다");
      }
    },
    error: function(){
      window.alert('오류가 발생하였습니다.');
    }
  });

}



//맞춤 추천 페이지
function recommendPage() {


  //매장 추천
  $('<div></div>').text("▼ おすすめ店舗").addClass('recommendStore').appendTo($('.memberInfoContent'));

  $.ajax({
    url: 'http://107.161.27.109/jihye/gara.php',
    data: {
      value: "beanpole",
      select: 1
    },
    dataType: 'jsonp',
    success: function(data){

      var rStore = $('<img></img>').addClass('rStore').appendTo($('.memberInfoContent'));
      rStore.attr("id", "rStore");
      rStore.attr("value", "beanpole");
      $('.rStore').attr("src", "./img/logo/beanpole.jpg");

      $(document).on('click','.rStore', function(){
        productSelect = $(this).attr('value');
        console.log(productSelect);
        productDetail(productSelect,"1");
      });

    },
    error: function(){
      window.alert('오류가 발생하였습니다.');
    }
  });


  //상품 추천
  $('<div></div>').text("▼ おすすめ商品").addClass('recommendProduct').appendTo($('.memberInfoContent'));


  $.ajax({
    url: 'http://107.161.27.109/jihye/gara.php',
    data: {
      value1: "ジップアップカディゴン",
      value2: "MA-1のジャンパー",
      value3: "チェックのシャツ"
    },
    dataType: 'jsonp',
    success: function(data){

      var rStore = $('<img></img>').addClass('rProduct').appendTo($('.memberInfoContent'));
      rStore.attr("id", "rProduct1");
      rStore.attr("value", "ジップアップカディゴン");
      $('#rProduct1').attr("src", "./img/product/75/304190886.jpg");

      var rStore = $('<img></img>').addClass('rProduct').appendTo($('.memberInfoContent'));
      rStore.attr("id", "rProduct2");
      rStore.attr("value", "MA-1のジャンパー");
      $('#rProduct2').attr("src", "./img/product/75/298912915.jpg");

      var rStore = $('<img></img>').addClass('rProduct').appendTo($('.memberInfoContent'));
      rStore.attr("id", "rProduct3");
      rStore.attr("value", "チェックのシャツ");
      $('#rProduct3').attr("src", "./img/product/75/279357986.jpg");

      $(document).on('click','.rProduct', function(){
        productSelect = $(this).attr('value');
        console.log(productSelect);
        productDetail(productSelect,"2");
      });

    },
    error: function(){
      window.alert('오류가 발생하였습니다.');
    }
  });

}

//상세 페이지로 이동
function productDetail($productSelect,$select) {
  var url = "./productInfo.html?resultName=" + $productSelect + "&select=" + $select;
  $(location).attr('href', url);
}
