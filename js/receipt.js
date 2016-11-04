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
  var userNUM = localStorage['userNum'];


  $.ajax({

    url: 'http://107.161.27.109/jihye/member_deal.php',
    data: {
      userNUM : userNUM
    },
    dataType: 'jsonp',
    success: function(data){
      if( data.result == "success" && data.data[0] != null ) {

        console.log(data);

        var heightValue = 20;
        //같은 시각에 계산한 영수증은 같이 보여줌

        for(var i = 0; i < data.data.length; i++) {

         var myReceiptDiv2 = $('<div></div>').addClass('myReceiptDiv').appendTo($('.receiptContent'));
         myReceiptDiv2.attr("id", "myReceiptDiv"+i);
         myReceiptDiv2.appendTo($('.receiptContent'));

         $('#myReceiptDiv'+i).css("top", (heightValue+"px"));
         heightValue = (heightValue + 120);

         //매장 이름
         var storeName = $('<div></div>').text(data.data[i].sName).addClass('storeName').appendTo($('#myReceiptDiv'+i));
         storeName.attr("id", "storeName"+i);

         //상품 이름
         var productName = $('<div></div>').text(data.data[i].pName).addClass('productName').appendTo($('#myReceiptDiv'+i));
         productName.attr("id", "productName"+i);

         //결제 가격
         var productMoney = $('<div></div>').text((data.data[i].dMoney)+"원").addClass('productMoney').appendTo($('#myReceiptDiv'+i));
         productMoney.attr("id", "productMoney"+i);

         //결제 방법
         var dealType = $('<div></div>').text(data.data[i].dType).addClass('dealType').appendTo($('#myReceiptDiv'+i));
         dealType.attr("id", "dealType"+i);

         //결제 시간
         var dealDate = $('<div></div>').text(data.data[i].dDate).addClass('dealDate').appendTo($('#myReceiptDiv'+i));
         dealDate.attr("id", "dealDate"+i);

        }//end of for

      }else {
        window.alert("영수증이 없습니다");
      }
    },
    error: function(){
      window.alert('오류가 발생하였습니다.');
    }

  });

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
