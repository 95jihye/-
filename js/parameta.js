$.extend ({
  getUrlVars: function(){  // 전체 GET 파라미터를 JSON 형식으로 리턴
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },

  getUrlVar: function(name){  // 파라미터로 전달된 이름의 GET 파라미터 값을 문자열로 리턴
    return decodeURI(decodeURIComponent($.getUrlVars()[name]));
  }
});



  // 파라미터 값 가져와서 상세보기 뷰 만들기
  $(document).ready(function() {

				var all_params = $.getUrlVars();
				$(".detailResult li:eq(0)").html(all_params.resultName + all_params.select);

        var resultName = $.getUrlVar("resultName");
        var select = $.getUrlVar("select");
        $(".detailResult li:eq(1)").html("resultName=" + resultName + ", select=" + select);

        console.log(resultName,select);

        $.ajax({

          url: 'http://107.161.27.109/jihye/detail.php',
          data: {
            value1: resultName,
            value2: select
          },
          dataType: 'jsonp',
          success: function(data){

            console.log(data);

            //매장 뷰
            if(data.result == "success" && data.data[0] != null && data.select == 1){

              data.data[0].sDate = (data.data[0].sDate).substr(0,10);

              console.log(data);

              $('.detailResult').empty();
              $('<img></img>').addClass('detailImg').appendTo($('.detailResult'));
              $('<div></div>').text("店舗").addClass('sName').appendTo($('.detailResult'));
              $('<div></div>').text(data.data[0].sName).addClass('detailName').appendTo($('.detailResult'));
              $('<div></div>').text("電話番号").addClass('sTel').appendTo($('.detailResult'));
              $('<div></div>').text(data.data[0].sTel).addClass('detailTel').appendTo($('.detailResult'));
              $('<div></div>').text("担当者").addClass('sManage').appendTo($('.detailResult'));
              $('<div></div>').text(data.data[0].sManage).addClass('detailManage').appendTo($('.detailResult'));
              $('<div></div>').text("登録日").addClass('sDate').appendTo($('.detailResult'));
              $('<div></div>').text(data.data[0].sDate).addClass('detailDate').appendTo($('.detailResult'));

              mapName = data.data[0].sNum;
              select = data.select;

              $('<button></button>').text("店舗の位置を探す").addClass('sMap').appendTo($('.detailResult'));
              $('.sMap').attr("onclick", "resultInfo(mapName,select)");

              $('.detailImg').attr("src", "."+data.data[0].sImg+".jpg");

              //상품 뷰
            } else if (data.result == "success" && data.data[0] != null && data.select == 2) {

              $('<img></img>').addClass('detailMainImg').appendTo($('.detailResult'));

              for(var i = 1; i < 7; i++) {
                $('<img></img>').addClass('detailSubImg'+i).appendTo($('.detailSubImg'));
              }

              $('.detailMainImg').attr("src", "."+data.data[0].pImg+".jpg");
              $('.detailSubImg1').attr("src", "."+data.data[0].pImg+".jpg");

              for(var i = 1; i < 6; i++) {
                $('.detailSubImg'+(i+1)).attr("src", "."+data.data[0].pImg+"_"+i+".jpg");
              }

              // 작은 이미지 클릭 시 MainView로 보임
              $('.detailSubImg1').click(function(){
                $('.detailMainImg').attr("src", "."+data.data[0].pImg+".jpg");
              });

              $('.detailSubImg2').click(function(){
                $('.detailMainImg').attr("src", "."+data.data[0].pImg+"_"+1+".jpg");
              });

              $('.detailSubImg3').click(function(){
                $('.detailMainImg').attr("src", "."+data.data[0].pImg+"_"+2+".jpg");
              });

              $('.detailSubImg4').click(function(){
                $('.detailMainImg').attr("src", "."+data.data[0].pImg+"_"+3+".jpg");
              });

              $('.detailSubImg5').click(function(){
                $('.detailMainImg').attr("src", "."+data.data[0].pImg+"_"+4+".jpg");
              });

              $('.detailSubImg6').click(function(){
                $('.detailMainImg').attr("src", "."+data.data[0].pImg+"_"+5+".jpg");
              });

              // 상품 상세 설명
              $('<div></div>').text("商品").addClass('productNameText').appendTo($('.detailResult'));
              $('<div></div>').text(data.data[0].pName).addClass('productName').appendTo($('.detailResult'));
              $('<div></div>').text("モデル番号").addClass('productModelText').appendTo($('.detailResult'));
              $('<div></div>').text(data.data[0].pModel).addClass('productModel').appendTo($('.detailResult'));
              $('<div></div>').text("商品コード").addClass('productCodeText').appendTo($('.detailResult'));
              $('<div></div>').text(data.data[0].pCode).addClass('productCode').appendTo($('.detailResult'));
              $('<div></div>').text("値段").addClass('productPriceText').appendTo($('.detailResult'));
              $('<div></div>').text(data.data[0].pSell+"円").addClass('productPrice').appendTo($('.detailResult'));

              $('<div></div>').text("▼ 現在の在庫を確認").addClass('productNumInfoText').appendTo($('.detailResult'));

              $('<div></div>').text("色を選択").addClass('productColorText').appendTo($('.detailResult'));
              $('<div></div>').addClass('productColor').appendTo($('.detailResult'));

              for (var j = 0; j < data.data2.length; j++) {

                  var color = data.data2[j].pColor;
                  var productColor2 = $('<button></button>').text(color).addClass('productColor2');
                  productColor2.attr("id", "productColor"+j);
                  productColor2.appendTo($('.productColor'));
              }

              // 사이즈 선택
              $('<div></div>').text("サイズを選択").addClass('productSizeText').appendTo($('.detailResult'));
              $('<div></div>').addClass('productSize').appendTo($('.detailResult'));

              // 남은 재고
              $('<div></div>').text("現在の在庫").addClass('productNumText').appendTo($('.detailResult'));
              $('<div></div>').addClass('productNum').appendTo($('.detailResult'));

              // 매장 위치 보기
              mapName = data.data[0].sNum;

              $('<button></button>').text("この商品を持っている店舗の位置を探す").addClass('productMap').appendTo($('.detailResult'));
              $('.productMap').attr("onclick", "resultInfo(mapName,select)");

              $('<button></button>').text("♡好き♡").addClass('productLike').appendTo($('.detailResult'));

              // 사이즈 찾기
              $(document).on('click','.productColor2',function(){

                selectColor = $(this).text();
                selectCode = data.data[0].pCode;

                $.ajax({

                  url: 'http://107.161.27.109/jihye/productInfo.php',
                  data: {
                    value1: selectCode,
                    value2: selectColor
                  },
                  dataType: 'jsonp',
                  success: function(data){

                    if(data.result == "success" && data.data[0] != null){
                      $('.productSize').children().remove();

                      for (var j = 0; j < data.data.length; j++) {
                          var size = data.data[j].pSize;
                          var productSize2 = $('<button></button>').text(size).addClass('productSize2');
                          productSize2.attr("id", "productSize"+j);
                          productSize2.appendTo($('.productSize'));
                      }

                      //재고 찾기
                      $(document).on('click','.productSize2',function(){
                        selectSize = $(this).text();
                        //console.log(selectCode,selectColor,selectSize);

                        $('.productNum').children().remove();

                        //찜 버튼 누르면 저장
                        $('.productLike').attr("onclick", "productLikeSelect(selectCode, selectColor, selectSize)");

                        for (var j = 0; j < data.data.length; j++) {
                          if( selectSize == data.data[j].pSize){
                            var num = data.data[j].pNum;
                            var productNum2 = $('<div></div>').text(num+"個").addClass('productNum2');
                            productNum2.attr("id", "productNum"+j);
                            productNum2.appendTo($('.productNum'));
                          }

                        }

                      });

                    } else {
                        window.alert('해당 데이터가 없습니다.');
                      }
                },
                error: function(){
                  window.alert('오류가 발생하였습니다.');
                }
              });
            });

          } else {
              window.alert('해당 데이터가 없습니다.');
            }
          },
          error: function(){
            window.alert('오류가 발생하였습니다.');
          }

        });

		});

    // 위치(지도) 페이지로 이동
    function resultInfo($resultName,$select) {

      console.log($resultName,$select);

      var url = "./map.html?resultName=" + $resultName + "&select=" + $select;
      $(location).attr('href', url);

    }

    //찜하기
    function productLikeSelect(selectCode, selectColor, selectSize) {

      userNUM = localStorage['userNum'];

      console.log(selectCode, selectColor, selectSize, userNUM);

      $.ajax({

        url: 'http://107.161.27.109/jihye/product_like.php',
        data: {
          selectCode: selectCode,
          selectColor: selectColor,
          selectSize: selectSize,
          userNUM: userNUM
        },
        dataType: 'jsonp',
        success: function(data){
          if(data == "success"){
            if(window.confirm("好きな商品で登録されました。確認しますか？")){
              var url = "./memberInfo.html";
              $(location).attr('href', url);
            }else {

            }
        }else {
          if(window.confirm("もう登録された商品です。確認しますか？")){

          }
        }
        },
        error: function(){
          window.alert('오류가 발생하였습니다.');
        }
      });
    }
