// 传进的参数值是否是字符串

// 不为空
export function isUsername(username) {
  return !!username && username != '';
}

export function isStudentName(student_name) {
  return isUsername(student_name);
}

// user_id【8位数字】
export function isUserID(user_id) {
  return !!user_id && /^[\d]{8}$/.test(user_id);
}

// password【6-18位，数字+大小写字母】
export function isPassword(password) {
  return !!password && /^[\w]{6,18}$/.test(password);
}

// course_id 正整数
export function isCourseID(course_id) {
  return !!course_id && /^[1-9]\d*$/.test(course_id);
}

// student_id 【8位数字】
export function isStudentID(student_id) {
  return !!student_id && /^[\d]{8}$/.test(student_id);
}

export function isGps(gps) {
  return !!gps;
}

