/*
 * @Author: kai
 * @Date:   2017-10-23 18:53:10
 * @Last Modified by:   kai
 * @Last Modified time: 2017-10-24 21:39:28
 */

'use strict';

var _mm = require('util/mm.js');

var _user = {

  // 用户登录
  login: function(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/login.do'),
      data: userInfo,
      type: 'POST',
      success: resolve,
      error: reject
    });
  },

  // 检查用户名
  checkUsername: function(username, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/check_valid.do'),
      data: {
        type: 'username',
        str: username
      },
      type: 'POST',
      success: resolve,
      error: reject
    });
  },

  // 用户注册
  register: function(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/register.do'),
      data: userInfo,
      type: 'POST',
      success: resolve,
      error: reject
    });
  },

  // 检查登录状态
  checkLogin: function(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/get_user_info.do'),
      type: 'POST',
      success: resolve,
      error: reject
    });
  },

  // 获取用户密码提示问题
  getQuestion: function(username, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/forget_get_question.do'),
      data: {
        username: username
      },
      type: 'POST',
      success: resolve,
      error: reject
    });
  },

  // 检查密码提示问题答案
  checkAnswer: function(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/forget_check_answer.do'),
      data: userInfo,
      type: 'POST',
      success: resolve,
      error: reject
    });
  },

  // 重置密码
  resetPassword: function(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/forget_reset_password.do'),
      data: userInfo,
      type: 'POST',
      success: resolve,
      error: reject
    });
  },

  // 获取用户信息
  getUserInfo: function(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/get_user_info.do'),
      type: 'POST',
      success: resolve,
      error: reject
    });
  },

  // 更新个人信息
  updateUserInfo: function(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/update_information.do'),
      data: userInfo,
      type: 'POST',
      success: resolve,
      error: reject
    });
  },

  // 登录状态下更新密码
  updatePassword: function(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/reset_password.do'),
      data: userInfo,
      type: 'POST',
      success: resolve,
      error: reject
    });
  },
  
  // 登出
  logout: function(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/logout.do'),
      type: 'POST',
      success: resolve,
      error: reject
    });
  }
}
module.exports = _user;
