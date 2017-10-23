/*
 * @Author: kai
 * @Date:   2017-10-23 16:27:31
 * @Last Modified by:   kai
 * @Last Modified time: 2017-10-23 20:49:39
 */
'use strict';

require('./index.scss');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 表单错误提示
var formError = {
  show: function (errMsg) {
    $('.err-item').show().find('.err-msg').text(errMsg);
  },

  hide: function () {
    $('.err-item').hide().find('.err-msg').text('');
  }
}

// 逻辑部分
var page = {
  init: function() {
    this.bindEvent();
  },
  // 登录事件绑定
  bindEvent: function () {
    var _this = this;
    $('.btn-submit').click(function () {
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
      password: $.trim($('#password').val())
    };

    // 获取验证结果
    var validateResult = this.formValidate(formData);

    if (validateResult.status) {
      _user.login(formData, function (res) {
        window.location.href = _mm.getUrlParam('redirect') || './index.html';
      }, function (err) {
        formError.show(err)
      })
    } else {
      formError.show(validateResult.msg);
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

    result.msg = '验证通过';
    result.status = true;

    return result;
  }
}

$(function() {
  page.init();
})
