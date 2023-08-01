/**
 * 日期格式转换
 * @param fmt
 * @param timeStamp 
 * @returns
 */
export function formatDate(fmt: string, timeStamp?: number | string): string {
  let ret
  let date
  if (typeof timeStamp === 'string') {
    date = new Date(parseInt(timeStamp))
  } else if (typeof timeStamp === 'number') {
    date = new Date(timeStamp)
  } else {
    date = new Date()
  }
  if (date.getFullYear().toString() == 'NaN')
    return ''
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "M+": (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1).toString()) : (date.getMonth() + 1).toString(), // 月
    "D+": date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString(),      // 日
    "H+": date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString(),      // 时
    "m+": date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString(),  // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    }
  }
  return fmt
}

export function _debounce(fn: (...args) => void, delay = 500, immediate = false) {
  //定义一个定时器
  let timer
  let isInvoke = false

  return function (this: any, ...args) {
    if (timer) clearTimeout(timer)
    //第一次调用立即执行
    if (immediate && !isInvoke) {
      fn.apply(this, args);
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        isInvoke = false
      }, delay)
    }

  }
}
export function _throttle(func: (...args) => void, delay = 500) {
  let old = 0
  return function (this: any, ...args) {
    const now = new Date().getTime()
    if (now - old > delay) {
      func.apply(this, args)
      old = now
    }
  }
}