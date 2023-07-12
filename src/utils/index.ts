type Time = Object | string | number

// 
export function parseTime(time: Time, cForm?: string) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cForm || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time as Date; // 添加类型断言，明确告诉 TypeScript 变量的类型为 Date
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time, 10); // 解析为整数类型
      } else {
        time = time.replace(/-/gm, "/"); // 替换字符串中的字符
      }
    } else if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000; // 将数字乘以 1000
    }
  }
  const formatObj: any = {
    y: date?.getFullYear(),
    m: date?.getMonth() != null ? date.getMonth() + 1 : 1,
    d: date?.getDate(),
    h: date?.getHours(),
    i: date?.getMinutes(),
    s: date?.getSeconds(),
    a: date?.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

export function timestampToTime(timestamp: number) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h = date.getHours() + ":";
  var m = date.getMinutes();
  return Y + M + D + h + m;
}