let $bind = {};

function init(request) {
	  Debug.console(request);
	  // ロジックフローに受け渡すパラメータを作成します。
	  var input = {
		  "kbtKykNo" : "SO1000103-00003-001",
		  "kijnYmd" : "20180713",
		  "shinId" : "2007040225",
		  "ksnNo" : 1,
		  "rno" : 1
		  };
	  // ロジックフローを呼び出します。
	  var result = LogicFlowExecutor.execute('demo_init', input);
	  if (result.error) {
	    // 何らかのエラーが発生しました。
	    Debug.console(result);
	  } else {
		if (result.data.records.length) {
			$bind = result.data.records[0];
//			$bind.numberAssignment = 1;
			$bind.residualFrame = 0; //$bind.hkn_nsu_wak - $bind.numberAssignment
			$bind.age = '60'; //遷移パラメータ．年齢判断基準日、変数．配属詳細情報．生年月日　を　java.time.LocalDateクラス　に変換する。																	
			                  //変数．年齢					←		ChronoUnit.YEARS.between（）．getYears()メソッドにより、年齢取得する。		
			$bind.emplStatus = '有期';
			$bind.hakenSakiList = [
		    {
		        label: "ラベル1",
		        value: "value1"
		    },
		    {
		        label: "ラベル2",
		        value: "value2"
		    },
		    {
		        label: "ラベル3",
		        value: "value3"
		    }
		];
			
         $bind.shainList = $bind.hakenSakiList;
			

			Debug.console($bind.residualFrame);
			
		}
	  }

	  Debug.console(result.data);
}

function search(request) {
	 
}