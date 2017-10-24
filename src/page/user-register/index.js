/*
* @Author: kai
* @Date:   2017-10-23 20:57:56
* @Last Modified by:   kai
* @Last Modified time: 2017-10-24 13:15:03
*/
'use strict';

require('./index.scss');
require('page/user-login/index.scss');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _notice = require('js/notice.js');

var page = {
  init: function () {
    this.bindEvent();
  },

  // 登录事件绑定
  bindEvent: function () {
    var _this = this;

    $('#username').blur(function() {
      var username = $.trim($(this).val());

      _user.checkUsername(username, function (res) {
        _notice.formError.hide();
      }, function (err) {
        _notice.formError.show(err);
      });
    });

    $('#submit').click(function () {
      _this.submit();
    });

    $('.user-content').keyup(function (e) {
      if (e.keyCode === 13) {
        _this.submit();
      }
    });
  },
  // 获取用过登录信息并提交
  submit: function () {
    var formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val()),
      passwordConfirm: $.trim($('#password-confirm').val()),
      phone: $.trim($('#phone').val()),
      email: $.trim($('#email').val()),
      question: $.trim($('#question').val()),
      answer: $.trim($('#answer').val())
    };

    // 获取验证结果
    var validateResult = this.formValidate(formData);

    if (validateResult.status) {
      _user.register(formData, function (res) {
        window.location.href = _mm.getUrlParam('redirect') || './index.html';
      }, function (err) {
        _notice.formError.show(err)
      })
    } else {
      _notice.formError.show(validateResult.msg);
    }

  },

  // 表单字段验证
  formValidate: function (formData) {
    var result = {
      msg: '',
      status: false
    };

    if (!_mm.validate(formData.username, 'require')) {
      result.msg = '用户名不能为空';
      return result;
    }

    if (!_mm.validate(formData.password, 'require')) {
      result.msg = '密码不能为空';
      return result;
    }

    if (formData.password !== formData.passwordConfirm) {
      result.msg = '密码不相同';
      return result;
    }

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
  }
}

$(function() {
  page.init();
})
