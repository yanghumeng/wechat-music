//格式化时长
var formatTime = function(s) {
  let t = '';
  s = Math.floor(s);
  if (s > -1) {
    let min = Math.floor(s / 1000 / 60) % 60;
    let sec = Math.floor(s / 1000) % 60;
    if (min < 10) {
      t += "0";
    }
    t += min + ":";
    if (sec < 10) {
      t += "0";
    }
    t += sec;
  }
  return t;
}
export default {
  formatTime:formatTime
}