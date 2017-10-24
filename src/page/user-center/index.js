/*
* @Author: kai
* @Date:   2017-10-24 20:37:08
* @Last Modified by:   kai
* @Last Modified time: 2017-10-24 21:42:23
*/
'use strict';

require('./index.scss');
require('scss/user-center.scss');
require('page/common/crumb/index.js');
require('../common/nav/index.js');
require('../common/header/index.js');

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