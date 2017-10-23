/*
* @Author: kai
* @Date:   2017-09-21 22:25:01
* @Last Modified by:   kai
* @Last Modified time: 2017-10-13 14:23:20
*/
'use strict'

require('./index.scss');

var header = {
  init: function () {
    this.bindEvent();
  },
  // 搜索事件绑定
  bindEvent: function () {
    var _this = this;
    $('#btn-search').click(function() {
      _this.searchSubmit();
    });

    $('#search-input').keyup(function(e) {
      if (e.keyup === 13) {
        _this.searchSubmit();
      }
    })
  },
  // 搜索功能
  searchSubmit: function () {
    var keyword = $.trim($('#search-input').val());

    if (keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    } else {
      _mm.goHome();
    }
  }
}

header.init();