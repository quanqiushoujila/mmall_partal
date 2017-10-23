/*
* @Author: kai
* @Date:   2017-09-20 10:47:09
* @Last Modified by:   kai
* @Last Modified time: 2017-10-23 20:49:05
*/
'use strict'

var Config = require('./config.js');
var Hogan = require('hogan');
var conf = {
  serverHost: ''
};

var _mm = {
  // 网络请求
  request: function (param) {
    var _this = this;
    $.ajax({
      url:        param.url       || '',
      dataType:   param.dataType  || 'json',
      data:       param.data      || '',
      type:       param.type      || 'get',
      crossDomain: true,
      success:    function (res) {
        if (Config.status.SUCCESS === res.status) {
          typeof param.success === 'function' && param.success(res.status, res.msg);

        } else if (Config.status.NEED_LOGIN === res.status){
          _this.doLogin();

        } else if (Config.status.ERROR === res.status) {
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      error:    function (err) {
        typeof param.error === 'function' && param.error(err.statusText);

      }
      
    })
  },
  // 成功提示
  successTips: function (msg) {
    alert(msg || '操作成功！');
  },
  // 失败提示
  errorTip: function (msg) {
    alert(msg || '操作失败');
  },
  // 统一登录处理
  doLogin: function () {
    window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  // 获取服务器地址
  getServerUrl: function (path) {
    return conf.serverHost + path;
  },
  // html模板渲染
  renderHtml: function (htmlTemplate, data) {
    var template    = Hogan.compile(htmlTemplate),
        result      = template.render(data);
    return result;
  },
  // 获取url参数
  getUrlParam: function (name) {
    var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result  = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  // 字段的验证，支持非空、手机、邮箱的判断
  validate : function(value, type){
    var value = $.trim(value);
    // 非空验证
    if('require' === type){
        return !!value;
    }
    // 手机号验证
    if('phone' === type){
        return /^1\d{10}$/.test(value);
    }
    // 邮箱格式验证
    if('email' === type){
        return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }
  },
  //返回首页
  goHome : function(){
    window.location.href = './index.html';
  }
}

module.exports = _mm;