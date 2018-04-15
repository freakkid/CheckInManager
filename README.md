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

    + 登录---统一用id和密码登录
    + 老师
        - 主页面获取老师所教课程列表