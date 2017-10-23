/*
* @Author: kai
* @Date:   2017-10-23 13:52:18
* @Last Modified by:   kai
* @Last Modified time: 2017-10-23 14:16:19
*/
'use strict';
require('./index.scss');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function() {
  var type = _mm.getUrlParam('type'),
      $element = $('.' + type + '-success');
  $element.show();
});