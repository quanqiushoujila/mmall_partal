/*
* @Author: kai
* @Date:   2017-10-24 20:36:53
* @Last Modified by:   kai
* @Last Modified time: 2017-10-24 21:59:45
*/
'use strict';

require('./index.scss');
require('scss/user-center.scss');
require('page/common/crumb/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');


var page = {
  init: function () {
    this.onLoad();
  },

  onLoad: function () {
    _navSide.init({name: 'user-center'});
    this.loadUserInfo();
  },

  bindEvent: function () {

  },

  submit: function () {
    var formData = {
      phone: '',
      email: '',
      question: '',
      answer: ''
    }
  },

  //表单字段验证
  formValidate: function (formData) {
    var result = {
      msg: '',
      status: false
    };

    if (!_mm.validate(formData.phone, 'phone')) {
      result.msg = '手机号不正确'
      return result;
    }
    
    if (!_mm.validate(formData.email, 'email')) {
      result.msg = 'email不正确'
      return result;
    }

    if (!_mm.validate(formData.question, 'require')) {
      result.msg = '问题不能为空';
      return result;
    }

    if (!_mm.validate(formData.answer, 'require')) {
      result.msg = '问题回答不能为空';
      return result;
    }

    result.msg = '验证通过';
    result.status = true;

    return result;
  },

  // 获取用户信息
  loadUserInfo: function () {
    _user.getUserInfo(function (res) {
      var template = _mm.renderHtml(templateIndex, res.data);
      $('.panel-body').html(template);
    }, function (err) {
      _mm.errorTip('获取信息失败');
    });
  }
}

$(function () {
  page.init();
});