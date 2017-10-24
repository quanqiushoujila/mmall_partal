/*
* @Author: kai
* @Date:   2017-10-24 08:40:42
* @Last Modified by:   kai
* @Last Modified time: 2017-10-24 09:16:34
*/
'use strict';


// 登录注册表单错误提示
var formError = {
  show: function (errMsg) {
    $('.err-item').show().find('.err-msg').text(errMsg);
  },

  hide: function () {
    $('.err-item').hide().find('.err-msg').text('');
  }
}

module.exports.formError = formError;
