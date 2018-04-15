# CheckInManager

## 开发文档

+ 开发规则
    
    + 最好保持node和npm版本是最新的stable版本

    + 保持es6规范，每次提交代码前需检查一下：
        
        > npm run lint

    + 字符串尽量使用单引号或后撇号

    + 具体设置文件在config文件夹下，端口默认为8000

    + 记得把无关文件名添加进.gitignore

    + 提交代码前先拉取最新代码确保不出现冲突

+ 运行方式

    > npm install

    > npm run dev

    
+ 逻辑功能

    + 老师、管理员登录---统一用id和密码登录
        ```
        页面：
        /login
        输入：user_id, password
        api：
        POST /session
        {
            "user_id": "15331117", 
            "password": "15331117"
        }

        ```

        
    + 老师
        - 主页面获取老师所教课程列表 -- teacher_id        ----> course_id, course_name, is_closed
        - 选择某个课程信息      -- teacher_id course_id ----> credit（学分）, semester（学期）, class_time（上课时间）, venue（上课地点）, 学生人数
        - 选择某个课程的学生列表 -- teacher_id course_id ----> 所有学生的student_id, student_name（如果学生数量很多，前端应该分页显示）
        - 选择某个课程的发起签到 -- teacher_id course_id
            + 后台调用api生成一个二维码，返回给前端页面
            + 结束签到时返回签到人数、课程人数[签到列表、未签到列表]

    + 学生
        - 没有登录后的界面
        - 扫码  -- student_id student_name + course_id(包含在url中)
                    -- 课程存在&&学生信息正确&&学生在课程中 ---> 签到成功
                    -- 签到失败