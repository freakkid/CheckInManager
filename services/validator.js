// TODO 正则表达式匹配用户id 和密码 返回bool值
// 传进的参数值是否是字符串

// user_id【8位数字】
export function is_userID(user_id) {
  //var reg=/^1[0-9]{8}/;
  return /^[0-9]{8}/.test(user_id.value);
}

// password【6-18位，数字+大小写字母】
export function is_password(password) {
  
  return /^[0-9a-zA-Z]{6,18}/.test(password.value);
}

// course_id 正整数
export function is_courseID(course_id) {
  return /^[1-9]\d*$/.test(course_id.value);
}

// student_id 【8位数字】
export function is_studentID(student_id) {
  return is_userID(student_id);
}
