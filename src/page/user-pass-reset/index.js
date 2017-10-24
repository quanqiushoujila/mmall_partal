/*
* @Author: kai
* @Date:   2017-10-24 14:17:25
* @Last Modified by:   kai
* @Last Modified time: 2017-10-24 20:02:46
*/
'use strict';

require('./index.scss');
require('page/user-login/index.scss');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _notice = require('js/notice.js');

var page = {
  data: {
    username: '',
    answer: '',
    question: '',
    token: ''
  },

  init: function () {
    this.onLoad();
    this.bindEvent();
  },

  // 事件绑定
  bindEvent: function () {
    var _this = this;

    // 第一步 验证用户名是否存在
    $('#submit-username').click(function () {
      var username = $.trim($('#username').val());

      if (username) {
        _user.getQuestion(username, function (res) {
          _this.data.username = username;
          _this.data.question = res.data;
          $('#question').text(res.data)
          _this.loadStepQuestion();
        }, function (err) {
          _notice.formError.show(err);
        })
      } else {
        _notice.formError.show('用户名不能为空');
      }
    });

    // 第二步 验证问题回答的是否正确
    $('#submit-question').click(function () {
      var answer = $('#answer').val();
      if (answer) {
        _user.checkAnswer({
          answer: answer,
          username: _this.data.username,
          question: _this.data.question
        }, function (res) {
          _this.data.answer = answer;
          _this.data.token = res.data
          _this.loadStepPassword();
        }, function (err) {
          _notice.formError.show(err);
        });
      } else {
        _notice.formError.show('答案不能为空');
      }
    });

    // 第三步 新密码提交
    $('#submit-password').click(function () {
      var passwordNewew = $.trim($("#password").val());

      if (password) {
        _user.resetPassword({
          forgetToken: _this.data.token,
          username: _this.data.username,
          passwordNew: passwordNewew
        }, function (res) {
          window.location.href = './index.html';
        }, function (err) {
          _notice.formError.show(err);
        });
      } else {
        _notice.formError.show('密码不能为空');
      }
    });
  },

  onLoad: function () {
    this.loadStepUsername();
  },

  // 第一步 输入用户名
  loadStepUsername: function () {
    $('.step-username').show();
  },

  // 第二步 输入回答问题
  loadStepQuestion: function () {
    // 清除错误提示
    _notice.formError.hide();

    $('.step-username').hide().
      siblings('.step-question').show().
      find('#question').text(this.data.question);
  },

  // 第三部 输入新密码
  loadStepPassword: function () {
    // 清除错误提示
    _notice.formError.hide();
    $('.step-question').hide().siblings('.step-password').show();
  }
}

$(function () {
  page.init();
});