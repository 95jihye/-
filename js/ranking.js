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

  }); //end of state


  $('#receipt').click(function(){

    if ( localStorage['userID'] ) {

      location.href = './receipt.html';

    } else {
      window.alert("로그인 후 이용 가능한 서비스입니다.");
      location.href = "./login.html";
    }

  }); //end of receipt


  $('#imformation').click(function(){

    if ( localStorage['userID'] ) {

      location.href = './memberInfo.html';

    } else {
      window.alert("로그인 후 이용 가능한 서비스입니다.");
      location.href = "./login.html";
    }


  }); //end of imformation


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

  //화면 구성
  $('<div></div>').text("★人気商品ベスト10★").addClass('rankingTitle').appendTo($('.RankingBody'));




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


// 매장 검색 결과 view
function search(){

  var storeName = document.getElementById("searchStore").value;
  //console.log(storeName);

  $.ajax({

    url: 'http://107.161.27.109/jihye/ranking.php',
    data: {
      value: storeName
    },
    dataType: 'jsonp',
    success: function(data){

      if(data.result == "success" && data.data[0] != null){

        console.log(data);
        var heightValue = 10;

        // 상품 리스트 View
        for(var i = 0; i < data.data.length; i++) {
         var productRankDiv2 = $('<div></div>').addClass('productRankDiv').appendTo($('.RankingResult'));
         productRankDiv2.attr("id", "productRankDiv"+i);
         productRankDiv2.appendTo($('.RankingResult'));

         $('#productRankDiv'+i).css("top", (heightValue+"px"));
         heightValue = (heightValue + 130);

         // 상품 순위 이미지
         var rankingImg = $('<img></img>').addClass('rankImg').appendTo($('#productRankDiv'+i));
         rankingImg.attr("id", "rankingImg"+i);
         $('#rankingImg'+i).attr("src", "./img/top"+(i+1)+".png");

         //상품 이미지
         var productImg = $('<img></img>').addClass('productImg').appendTo($('#productRankDiv'+i));
         productImg.attr("id", "productImg"+i);
         productImg.attr("value", data.data[i].pName);
         $('#productImg'+i).attr("src", "."+data.data[i].pImg+".jpg");

         $(document).on('click','#productImg'+i,function(){
           productSelect = $(this).attr('value');
           console.log(productSelect);
           productDetail(productSelect,"2");
         });

         //상품 이름
         var productName = $('<div></div>').text(data.data[i].pName).addClass('productName').appendTo($('#productRankDiv'+i));
         productName.attr("id", "productName"+i);

         //상품 가격
         var productSell = $('<div></div>').text(data.data[i].pSell+"円").addClass('productSell').appendTo($('#productRankDiv'+i));
         productSell.attr("id", "productSell"+i);


        }//end of for


      }else {

      }

    },
    error: function(){

    }

  });

} //end of search



//상세 페이지로 이동
function productDetail($productSelect,$select) {
  var url = "./productInfo.html?resultName=" + $productSelect + "&select=" + $select;
  $(location).attr('href', url);
}
