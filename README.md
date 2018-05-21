# CheckInManager

## 开发文档

## 开发一定要遵守readme的规则

+ 开发规则

    + 逻辑功能文档从开始编写到完成，一直有细小改动，前端如有问题或开始写交互的话请艾特下后端

    + 请大佬们把自己写的代码认真测试过后再提交上来

    + 一切开发请在dev分支上进行

    + ~~最好保持node和npm版本是最新的stable版本~~(node保持在8.0.0以上的版本就ok)

    + 保持es6规范，每次提交代码前需检查一下：
        
        > npm run lint

    + 字符串尽量使用单引号或后撇号

    + 具体设置文件在config文件夹下，端口默认为8000

    + 记得把无关文件名添加进.gitignore

    + 提交代码前先拉取最新代码确保不出现冲突

    + 代码提交可能要自己另开一个新分支再pull request到dev分支上

+ 运行方式

    + 确保已经安装mysql和redis服务端，并将config/index.js中数据库的参数改成和本机数据库一致

    + 保证mysql和redis服务端正在运行

    > npm install

    + 跑测试文件（仅测试model层接口）

    > npm run test
    
    + 开发服务端

    > npm run dev

    + 运行服务端

    > npm run start

    + 查看8000端口占用进程

        + linux
        
        > npm run watch-linux

        + mac

        > npm run watch-mac


+ 后端进度

    + 尚未完成：
        
        * 对controller和router层代码的测试（正在测试）

        * 由于尚未定下前端获取签到绑定是mac还是ip，数据库未对此做出唯一性的检验

        * 没有对gps格式进行验证

        * 没有对学生签到的gps是否在老师发起签到的gps附近进行验证

        * router层发送页面部分（**由前端完成**）

