### 环境安装
npm依赖包安装
```
cd star_api
npm install
```
forever安装
```
npm install forever -g
```

### 运行

##### 环境变量NODE_ENV
环境变量NODE_ENV只能有下面三个取值范围
```
dev         //用于开发
test        //用于测试（目前的开发流程和业务相对简单、人员也不多，不用区分rd和qa，所以暂不需要）
production  //用于线上生产环境
```

##### 启动服务
调试模式（ctl+c就退出了）
```
cd star_api
NODE_ENV=dev DEBUG=star-api:* npm start
```
后台常驻进程模式（node crash之后forever会自动重启）
```
//开发环境
NODE_ENV=dev forever -a -l `pwd`/logs/forever.log -o `pwd`/logs/out.log -e `pwd`/logs/error.log start `pwd`/bin/www

//测试环境
NODE_ENV=test /opt/node-v8.9.3-linux-x86/bin/forever -a -l `pwd`/logs/forever.log -o `pwd`/logs/out.log -e `pwd`/logs/error.log start `pwd`/bin/www

//线上环境
NODE_ENV=production forever -a -l `pwd`/logs/forever.log -o `pwd`/logs/out.log -e `pwd`/logs/error.log start `pwd`/bin/www
```

### 重启服务
```
forever restart `pwd`/bin/www
```

### 停止服务
```
forever stop `pwd`/bin/www
```

### 访问
```
curl 127.0.0.1:3000/xxx
```

### 关于上述NODE_ENV的使用说明
所有需要有环境差异的配置都需要使用NODE_ENV来区分。例如数据库的开发环境、线上环境配置不一致，就需要NODE_ENV：
- 数据库配置文件 conf/db.js（配置信息前期暂时放在配置文件中，以后以后可以统一放到配置管理系统里面去）

```
module.exports = {
    mysql: {
        dev: {
            connectionLimit : 100,
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: '',
            port: 3306
        },
        production: {
            connectionLimit : 100,
            host: '',
            user: '',
            password: '',
            database: '',
            port: 3306
        }
    }
}
```

- 不同环境对数据库配置的使用

```
var dbConf = require('PATH_TO/conf/db.js')
var pool = mysql.createPool(dbConf['mysql'][process.env.NODE_ENV]) //这里用来区分不同环境下的数据库配置
......
```

### TODO

1. 请求参数检查
2. 读取数据部分移到单独的地方
3. 引入缓存
