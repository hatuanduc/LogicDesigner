let $bind = {};

function init(request) {
	  Debug.console(request);
	  // ロジックフローに受け渡すパラメータを作成します。
	  var input = {};
	  // ロジックフローを呼び出します。
	  var result = LogicFlowExecutor.execute('sample-accounts', input);
	  if (result.error) {
	    // 何らかのエラーが発生しました。
	    Debug.console(result);
	  }
	  var output = result.data;
	  Debug.console(output);
}

function search(request) {
	 
}