# CheckInManager

## 开发文档

+ 开发规则
    
    + ~~最好保持node和npm版本是最新的stable版本~~(node保持在8.0.0以上的版本就ok)

    + 保持es6规范，每次提交代码前需检查一下：
        
        > npm run lint

    + 字符串尽量使用单引号或后撇号

    + 具体设置文件在config文件夹下，端口默认为8000

    + 记得把无关文件名添加进.gitignore

    + 提交代码前先拉取最新代码确保不出现冲突

+ 运行方式

    + 确保已经安装mysql和redis服务端，并将config/index.js中数据库的参数改成和本机数据库一致

    > npm install

    + 跑测试文件（仅测试model层接口）

    > npm run test
    
    + 运行服务端（目前尚不能运行）

    > npm run dev
