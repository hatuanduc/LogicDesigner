//変数demoを設定する
var demo = demo || {}
demo.caption = demo.caption || {};
demo.totalPage = 0;
var isSearchClick= 0;
//初期表示時の設定
$(function(){	
	//絞り込み >>Onclick
	$("#searchBtn").off('click').on('click', function(request){
		isSearchClick= 1;	
		search();	
	});
	
	/** 
	 * 登録: Onclick.
	 */
	$("#registBtn").off('click').on('click', function(request){
		regist();	
	});
});

//処理状況一覧取得する.
function search(request, response) {
	var pagingParam={
         'sortIndex':request.sortIndex,
         'sortOrder':request.sortOrder,
         'page':(request.page > demo.totalPage) ? demo.totalPage : request.page,
         'rowNum': request.rowNum
	};
	if(isSearchClick){
		if(isSearchClick==1){
			pagingParam.page=1;
		}
		
		var data = {
           'userCd': $('#userCd').val()
		};
	
		$.ajaxSend("demo/input/search", data,function(result){
			if(result.error){
                imuiShowErrorMessage(result.errorMessage);
            }else{
            	var countList=objectLength(result.data);
    			if(countList==0){
    				response({
    					"data":[],
    					"page":0,
    					"total":0
    				});
    				demo.totalPage = 0;
    				$("#noResult").show();
    				$('#resultList').css("opacity","0");
    			}else{							
    				response({
    					"data":result.data,
    					"page":result.pagingInfo.currentPage,
    					"total":result.pagingInfo.totalRecord
    				});
    				demo.totalPage = result.pagingInfo.totalPage;
    				$("#noResult").hide();
    				$('#resultList').css("opacity","1");
    			}
            }
					    	
		    },function(){
		    	isSearchClick = 2;
		    });
		isSearchClick = 2;
	}
};

/**
 * 登録
 */
function regist() {
	if (imuiValidate('#demoForm', rules, messages, "", createValidationErrorPlacement)) {
    var param = {
    	'snnYmd': $('#snnYmd').val()
    };
    $.ajaxSend("demo/input/regist", param,function(result){
            if (result.error) {
                imuiShowErrorMessage(result.errorMessage);
                return false;
            } else {
                $.transitionTo("demo/input", param);
                return false;
            }
        }
    );
    }
};

/**
 * Validationエラー時のエラーマークアップハンドラです。<br/>
 */
createValidationErrorPlacement = function(error, element) {
        error.insertAfter(element.next());
};
