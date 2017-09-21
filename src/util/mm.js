/*
* @Author: kai
* @Date:   2017-09-20 10:47:09
* @Last Modified by:   kai
* @Last Modified time: 2017-09-20 11:27:01
*/
'use strict'

var Config = require('./config.js');

var _mm = {
  request: function (param) {
    var _this = this;
    $.ajax({
      url:        param.url       || '',
      dataType:   param.dataType  || 'json',
      data:       param.data      || '',
      type:       param.type      || 'get',
      success:    function (res) {
        if (Config.SUCCESS === res.data) {
          typeof param.success === 'function' && param.success(res.data, res.msg);

        } else if (Config.NEED_LOGIN === res.data){
          _this.doLogin();

        } else if (Config.ERROR === res.data) {
          typeof param.error === 'funciton' && param.error(res.msg);

        }
      },
      error:    function (err) {
        typeof param.error === 'function' && param.error(err.statusText);

      }
      
    })
  },

  successTips: function (msg) {
    alert(msg || '操作成功！');
  },

  errorTip: function (msg) {
    alert(msg || '操作失败')；
  },

  doLogin: function () {
    window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
  }
}