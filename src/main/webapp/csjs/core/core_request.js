/**
 * @author nntrung
 */

$(document).ready(function() {
    if($('#ajax-overlay').length == 0) {
        $('body').append('<div id="ajax-overlay" style="display:none"><div class="img align-C"><img src="img/core/balls.gif" /><br/><span id="textAjax"></span></div></div>');
    }
}); 

(function($) {
   /**
    * 画面遷移.
    * Formを生成し、引数でわたされたパラメーターをhiddenタグとして設定し
    * 指定されたURLへsubmitします。
    * paramsに指定する値は単一階層のJSONオブジェクトとし
    * 要素の数だけ以下のhiddenタグを生成し、submitします。
    * <input type="hidden" name="JSONオブジェクト.キー" value="JSONオブジェクト.値"/>
    * ====================================================================
    * @url 遷移先URL
    * @params リクエストパラメーター
    */
    $.transitionTo = function(url, params) {
        var form = $('<form method="post" />').attr('action', url);
        if(params){
          $.each(params, function(key, value) {
            if (value) {
              $('<input>').attr({
                type: 'hidden',
                name: key,
                value: value
              }).appendTo(form);
            }
          });
        }
        form.appendTo('body').submit();
    };
    
    /**
     * ajax非同期通信処理
     * 利用用途：フォームを利用していない箇所に対して、Ajaxリクエストを送りたい場合に利用します。
     *         この関数はjQuery.ajaxを直接コールしています。
     * ====================================================================
     * @param  {HTMLForm} form            フォーム
     * @param  {Object} sucessCallback    成功時コールバック関数(省略可)
     * @param  {Object} errorCallback     失敗時コールバック関数(省略可)
     * @param  {Object} beforeSend        AJAXによりリクエストが送信される前に呼ばれるAjax Event関数(省略可)
     * @param  {Object} completeCallback  AJAX通信完了時に呼ばれるコールバック関数(省略可)
     */
    $.fn.ajaxSend = function(successCallback, errorCallback, beforeSend, completeCallback) {
        var url =  $(this).attr('action');
        var data = $(this).serializeForm();
        $.ajaxSend(url, data, successCallback, errorCallback, beforeSend, completeCallback);
    }
    
   
    /**
     * ajax非同期通信処理
     * 利用用途：フォームを利用していない箇所に対して、Ajaxリクエストを送りたい場合に利用します。
     *         この関数はjQuery.ajaxを直接コールしています。
     * ====================================================================
     * @param  {String} url               処理URL
     * @param  {Object} data              引数オブジェクト
     * @param  {Object} sucessCallback    成功時コールバック関数(省略可)
     * @param  {Object} errorCallback     失敗時コールバック関数(省略可)
     * @param  {Object} beforeSend        AJAXによりリクエストが送信される前に呼ばれるAjax Event関数(省略可)
     * @param  {Object} completeCallback  AJAX通信完了時に呼ばれるコールバック関数(省略可)
     */
    $.ajaxSend = function(url, data, successCallback, errorCallback, beforeSend, completeCallback) {
        var ajaxOption = {};
        ajaxOption['type'] = 'POST';
        ajaxOption['dataType'] = 'json';
        ajaxOption['cache'] = false;
        ajaxOption['async'] = true;
        ajaxOption['data'] = data;
        ajaxOption['url'] = url;
        ajaxOption['timeout'] = 99999000;
        ajaxOption['beforeSend'] = function(jqXHR, settings){
            $('#ajax-overlay').show();
            if(typeof beforeSend === 'function'){
                beforeSend(jqXHR, this);
            }
        };
        ajaxOption['success'] = function(response, status, jqXHR){
        	$('#ajax-overlay').hide();
            if(typeof successCallback === 'function'){
                successCallback(response, this, status, jqXHR);
            }
            return false;
        };
        ajaxOption['error'] = function(jqXHR, txtStatus, errorThrown){
            $('#ajax-overlay').hide();
            if(typeof errorCallback === 'function'){
                errorCallback(jqXHR, this);
                return false;
            }
            return false;
        };
        ajaxOption['complete'] = function(jqXHR, textStatus){
            if(typeof completeCallback === 'function'){
                completeCallback(jqXHR, this);
                return false;
            }
            return false;
        };
        $.ajax(ajaxOption);
        return true;
    };
    
    
    $.ajaxSendProgess = function(url, data, successCallback, errorCallback, beforeSend, completeCallback) {
        var ajaxOption = {};
        ajaxOption['type'] = 'POST';
        ajaxOption['dataType'] = 'json';
        ajaxOption['cache'] = false;
        ajaxOption['async'] = true;
        ajaxOption['data'] = data;
        ajaxOption['url'] = url;
        ajaxOption['beforeSend'] = function(jqXHR, settings){
            if(typeof beforeSend === 'function'){
                beforeSend(jqXHR, this);
            }
        };
        ajaxOption['success'] = function(response, status, jqXHR){
            if(typeof successCallback === 'function'){
                successCallback(response, this, status, jqXHR);
            }
            return false;
        };
        ajaxOption['error'] = function(jqXHR, txtStatus, errorThrown){
            if(typeof errorCallback === 'function'){
                errorCallback(jqXHR, this);
                return false;
            }
            return false;
        };
        ajaxOption['complete'] = function(jqXHR, textStatus){
            if(typeof completeCallback === 'function'){
                completeCallback(jqXHR, this);
                return false;
            }
            return false;
        };
        $.ajax(ajaxOption);
        return true;
    };
    
    
    $.fn.serializeForm = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name]) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || undefined);
          } else {
              o[this.name] = this.value || undefined;
          }
      });
      return o;
    };
    
    systemDate = function(){
    	var today = new Date();
    	var dd = today.getDate();
    	var mm = today.getMonth()+1; //January is 0!
    	var yyyy = today.getFullYear();

    	if(dd<10) {
    	    dd='0'+dd
    	} 

    	if(mm<10) {
    	    mm='0'+mm
    	} 

    	return today = mm+'/'+dd+'/'+yyyy;
    }
    
    $.fn.getValue = function() {
        if($(this).is(':checked')) {
            return 1;
        }else {
            return 0;
        }
    };
    
    $.fn.int2Boolean = function(check){
       if(check == "1" ){
          return  $(this) = true;
       }else{
          return false;
       }
    };

    checkDate =	function(year, month, day) {
    	var month2 = month - 1;
	    var d = new Date(year, month2, day);
	    if (d.getFullYear() == year && d.getMonth() == month2 && d.getDate() == day) {
	        return true;
	    }
	    return false;
	}
    
	to2Characters = function(hour) {
		var h = hour;
		if(h.length < 2) {h = '0'+h;}
		return h;
	}

    $.checkDateStartBeforeClose = function(startDate, closeDate){
        if(startDate == ""){
            return false;
        }
        if(closeDate == ""){
            return false;
        }
        var str1 = startDate.split('/');
        var startYear = parseInt(str1[0], 10)
        var startMonth = parseInt(str1[1], 10)
        
        var str2 = closeDate.split('/');
        var closeYear = parseInt(str2[0], 10)
        var closeMonth = parseInt(str2[1], 10)
        
        if(startYear < closeYear){
            return false;
        }else if (startYear == closeYear){
            if(startMonth < closeMonth){
                return false;
            }else{
                return true;
            }
        }else{
            return true;
        }
    };
    
}(jQuery));