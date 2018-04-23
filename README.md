#### nginx demo
> 在命令行输入如下(window环境为例)
```
start ./nginx  // 启动nginx服务
node index.js  // 启动脚本,脚本会自动监听./nginx/config/nginx.conf变化并执行./nginx -s reload  
node demo/server.js   // 启动服务(用于nginx示例)

访问localhost
```

#### 示例

```
重定向

/a  =>  /b ;
rewrite '^/a$'  /b;

/a/c  =>  /b/c 
rewrite  '^/a/(.*)'  /b/$1;

/page?id=1  =>  /page/1


```

#### 匹配的优先级关系
1. location = 
2. 


#### 基础

```
// root: 静态服务器根目录, server_name: 访问域名
// 配置host将google.com映射到172.0.0.1, 配置nginx.conf如下,访问google.com即返回 /demo目录下的index(默认为index.html)
root /demo;
server_name  google.com;
```


#### 注意点

> 当所有server的规则都不匹配时，nginx会采用第一条server配置，所以一般第一条server会使用阻止页面。
```
 server {
   listen 80;
   server_name _;
   return 404;  
 }
```

> nginx中正则匹配时是不包含Query String,需要$query_string($args等价)来获取请求参数



### 学习资料
[https://github.com/jaywcjlove/nginx-tutorial](https://github.com/jaywcjlove/nginx-tutorial)

[https://love2.io/@hfpp2012/doc/nginx-tutorial/README.md](https://love2.io/@hfpp2012/doc/nginx-tutorial/README.md)

[https://lufficc.com/blog/configure-nginx-as-a-web-server](https://lufficc.com/blog/configure-nginx-as-a-web-server)

[https://www.rails365.net/articles/nginx-zhi-ji-ben-jie-shao-he-pei-zhi-wen-jian-yu-fa-yi](https://www.rails365.net/articles/nginx-zhi-ji-ben-jie-shao-he-pei-zhi-wen-jian-yu-fa-yi)