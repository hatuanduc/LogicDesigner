// Copyright (C) 2018 Tutorial LD Co., Ltd.
/**
 * 配属情報詳細画面
 * @author $Author: htduc$
 * @version $Revision: $ $Date: $
 */

/**
 * Validatorの初期設定.
 */
let regist = {
    'snnYmd': {
        caption   : 'sreen.demo.title.009',
        required  : true,
        maxlength : 10,
        regex     : /^\d{4}\/(0?[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
    },
    'shain': {
        caption   : 'sreen.demo.title.010',
        required  : true
    },
    'hakenSaki': {
        caption   : 'sreen.demo.title.016',
        required  : true
    },
    'kinnYmd': {
        caption   : 'sreen.demo.title.018',
        maxlength : 10,
        regex     : /^\d{4}\/(0?[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
    },
    'tkiJko': {
        caption   : 'sreen.demo.title.017',
        maxlength : 100
    }
};