/*
 * @Author: kai
 * @Date:   2017-10-23 11:02:15
 * @Last Modified by:   kai
 * @Last Modified time: 2017-10-23 13:44:29
 */
'use strict';

require('./index.scss');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var navSide = {
  option: {
    name: '',
    navList: [
      { name: 'user-center', desc: '个人中心', href: './user-center.html' },
      { name: 'order-list', desc: '我的订单', href: './order-list.html' },
      { name: 'pass-update', desc: '修改密码', href: './pass-update.html' },
      { name: 'about', desc: '关于MMall', href: './about.html' }
    ]
  },
  init: function(option) {
    $.extend(this.option, option);
    this.renderNav();
  },
  // 渲染侧边导航菜单
  renderNav: function() {
    for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
      if (this.option.navList[i].name === this.option.name) {
        this.option.navList[i].isActive = true;
      }
    };
    var htmlNav = _mm.renderHtml(templateIndex, {navList: this.option.navList});
    $('.nav-side').html(htmlNav);
  }
};

module.exports = navSide;
