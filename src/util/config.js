/*
* @Author: kai
* @Date:   2017-09-20 10:45:52
* @Last Modified by:   kai
* @Last Modified time: 2017-10-23 19:48:10
*/
'use strict'

var config = {
  status: {
    SUCCESS: 0, // ajax成功
    ERROR: 1, // ajax失败
    NEED_LOGIN: 10 // 需要用户登录
  },
  local: 'http://localhost:9090/'

}

module.exports = config;
