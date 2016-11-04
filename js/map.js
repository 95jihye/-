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
    return $.getUrlVars()[name];
  }
});


// 파라미터 값 가져와서 상세보기 뷰 만들기
$(document).ready(function(){

  var all_params = $.getUrlVars();
  $(".bodyContent li:eq(0)").html(all_params.resultName + all_params.select);

  var resultName = $.getUrlVar("resultName");
  var select = $.getUrlVar("select");
  $(".bodyContent li:eq(1)").html("resultName=" + resultName + ", select=" + select);

  if(resultName, select) {

    //console.log(resultName, select);

    var floorNum = parseInt((resultName/15) + 1);
    var storeLocation = parseInt((resultName%14) - 1);

    if(storeLocation == -1) storeLocation = 13;

    storeSearch(floorNum,storeLocation);
  }


});

//층 검색
function storeSearch($floorNum,$storeLocation)
{
  console.log($floorNum,$storeLocation);
  floorNum = $floorNum;
  storeLocation = $storeLocation;

  $("#floor").val($floorNum).prop("selected", true);

  $.ajax({

    url: 'http://107.161.27.109/jihye/floor.php',
    data: {
      value: $floorNum
    },
    dataType: 'jsonp',
    success: function(data){
      if(data.result == "success"){

        var cnt = data.data.length;

        for(var i = 0; i < cnt; i++){

          var sNum = data.data[i].sNum;
          var sName = data.data[i].sName;

          $('#'+i).text(data.data[i].sName);
        } // end of for

        // 해당 매장에 관한 표시

        var storeChange = $('#'+storeLocation).attr("id");
        console.log(storeChange);

        $('#'+storeLocation).css("color", "red");
        $('#'+storeLocation).css("font-weight", "bolder");

      }// end of if
    },
    error: function(){
      window.alert('오류가 발생하였습니다.');
    }
  });
}
