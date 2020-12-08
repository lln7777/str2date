; (function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('str2date', factory) :
      (global = global || self, (function () {
        var current = global.str2date
        var exports = global.str2date = factory()
        exports.noConflict = function () { global.str2date = current; return exports }
      }()))
}(this, (function () {
  var timesDict = {
    '秒': 1000,
    '分': 1000 * 60,
    '小': 1000 * 60 * 60,
    '天': 1000 * 60 * 60 * 24,
    '星': 1000 * 60 * 60 * 24 * 7,
    '周': 1000 * 60 * 60 * 24 * 7
  }

  function str2date(str) {
    var datetime, timeString
    var now = new Date()
    var yyyy = now.getFullYear()
    var MM = now.getMonth() + 1
    var dd = now.getDate()
    var hh = now.getHours()
    var mm = now.getMinutes()
    var ss = now.getSeconds()


    var beforeReg = /(\d+)\s*[^\s]{0,1}(年|个月|月|周|星期|天|小时|分|分钟|秒|秒钟)前/
    var justNowReg = /刚刚/
    var allNumberReg = /(\d{4})(\d{2})(\d{2})/
    var beforeMatches = str.match(beforeReg)
    if (beforeMatches) {
      var n = beforeMatches[1]
      var unit = beforeMatches[2]
      if (timesDict[unit[0]]) {
        datetime = new Date(Date.now() - n * timesDict[unit[0]])
      } else {
        if (unit == '月' || unit == '个月') {
          var _y = Math.floor(n / 12)
          var _m = n % 12
          yyyy -= _y
          MM -= _m
          if (MM < 1) {
            yyyy -= 1
            MM += 12
          }
        } else if (unit == '年') {
          yyyy -= n
        } else {
          throw new Error('Parse Datetime String Error.')
        }
        timeString = yyyy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
        datetime = new Date(timeString)
      }
    } else if (justNowReg.test(str)) {
      datetime = new Date()
    } else if (allNumberReg.test(str)) {
      datetime = new Date(str.replace(allNumberReg, (_, p1,p2,p3)=>[p1,p2,p3].join('/')))
    } else {
      datetime = new Date(str)
      if (isNaN(datetime)) {
        // 获取具体的日期
        var zhcnDtReg = /(?:(\d{4})\s*年\s*)?(\d+)\s*月\s*(\d+)\s*(?:日|号)/i
        var zhcnDtRegMatch = str.match(zhcnDtReg)

        // 获取具体的时间分
        var timeReg = /(am|pm|早上|下午|凌晨|晚上)?\s*(\d+)(?::|：)(\d+)(?:(?::|：)(\d+))?\s*(am|pm|早上|下午|凌晨|晚上)?/i
        var timeRegMatch = str.match(timeReg)

        if (zhcnDtRegMatch || timeRegMatch) {
          if (zhcnDtRegMatch) {
            if (zhcnDtRegMatch[3] !== undefined) dd = +zhcnDtRegMatch[3]
            if (zhcnDtRegMatch[2] !== undefined) MM = +zhcnDtRegMatch[2]
            if (zhcnDtRegMatch[1] !== undefined) yyyy = +zhcnDtRegMatch[1]
          }
          if (timeRegMatch) {
            hh = +timeRegMatch[2]
            mm = +timeRegMatch[3]
            ss = timeRegMatch[4] ? timeRegMatch[4] : 0
            var pre = timeRegMatch[1] || timeRegMatch[5]
            if (pre && ~['pm', '下午', '晚上'].indexOf(pre.toLowerCase()) && hh < 12) {
              hh += 12
            }
          }
          timeString = yyyy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
          datetime = new Date(timeString)
        }
      }
    }
    return datetime
  }
  str2date.str2date = str2date
  return str2date
})))
