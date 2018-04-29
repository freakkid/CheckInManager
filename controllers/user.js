// 登录
export async function login(ctx, next) {

}

// 登出
export async function logout(ctx, next) {

}

// 老师修改密码
export async function changePassword(ctx, next) {
  const user = ctx.params.user;
  ctx.body = user + 'password';
  ctx.status = 200;
}

export async function getAllCoursesByTeacherID(ctx, next) {

}

// 仅管理员的权限 ----------------------------

// 获取所有老师列表
export async function getAllTeachersList(ctx, next) {

}

// 手动添加一个教师
export async function addTeacher(ctx, next) {

}

// 文件导入多个教师
export async function addTeachersFromFile(ctx, next) {

}

export async function deleteTeacher(ctx, next) {

}

export async function deleteAllTeachers(ctx, next) {

}
