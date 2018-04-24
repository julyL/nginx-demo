## nginx小结

> 在命令行输入如下(window环境为例)
```
start ./nginx  // 启动nginx服务
node index.js  // 启动脚本,脚本会自动监听./nginx/config/nginx.conf变化并执行./nginx -s reload  
node demo/server.js   // 启动服务(用于nginx示例)
// 访问localhost
```

**示例1**
```
# /page?id=xxx => /page/xxx
location ~ ^/page$ {
  if ($query_string  ~ "id=([^&#=]*)" ){   
      set  $id  $1;  
      rewrite  ^/page$  /page/$id? permanent; 
  }   
  rewrite (.*)  /new;    # 不加这行,访问/page将返回404
}   
```
> 以上配置会将 请求的/page?id=xxx 永久重定向到 /page/xxx
1. nginx中的正则匹配时是不算上Query String的, 例如/page?id=xxx实际进行正则匹配的字符串是/page.我可以通过全局变量$query_string(同$args)来获取Query String.
2. if后面必须有空格才生效!!!!!
3. rewrite中最后的?表示丢弃所有Query String, 如果没有?,/page?id=xxx将重定向到 /page/xxx?id=xxx 
4. 如果location规则匹配, 那么必须对路径进行重定向或者重写请求路径等处理,没有处理将返回404. 例如有if判断时,必须同时考虑if条件成立和不成立的情况,否则将返回404。并且处理之后的路径不能和原路径一致,否则将造成死循环(/new改为/page就死循环了)
5. permanent表示永久重定向,不会再去匹配其他规则了


#### rewrite中的flag字段
> 使用redirect和permanent,浏览器地址会显示跳转后的URL地址。last和break则不会
* redirect：302跳转到rewrtie后面的地址。  
* permanent：301永久调整到rewrtie后面的地址，即当前地址已经永久迁移到新地址，一般是为了对搜索引擎友好。
* last：将rewrite后的地址重新在server标签执行。
* break：将rewrite后地址重新在当前的location标签执行。(window下测试加了break会返回404???)


#### 正则匹配的优先级
```
# 如果路径能够匹配的如下中某些规则,那么规则优先级是 level1 > level2 > ...  (前提是能匹配时才比较优先级)

# 只能完全匹配 /p
# location = /p {    
#     rewrite  /   /level/1;
# }

#  完全匹配 /p
# location  /p {
#     rewrite  /   /level/2;
# }

# 只能匹配 /p/开头的路径  eg: /p/abc
# location ^~ /p/ {
#     rewrite  /   /level/3;
# }

# # 区分大小写的正则匹配
# location  ~ ^/p(.*)$ {     
#     rewrite  /   /level/4;
# }

# # 不区分大小写的正则匹配
# location  ~* ^/p(.*)$ {
#     rewrite  /   /level/4;
# }

# 只能匹配 /p/开头的路径 
# location  /p/ {
#     rewrite  /   /level/5;
# }

# location  / {
#     rewrite  /   /level/6;
# }

```

### 学习资料
[https://github.com/jaywcjlove/nginx-tutorial](https://github.com/jaywcjlove/nginx-tutorial)

[https://love2.io/@hfpp2012/doc/nginx-tutorial/README.md](https://love2.io/@hfpp2012/doc/nginx-tutorial/README.md)

[https://lufficc.com/blog/configure-nginx-as-a-web-server](https://lufficc.com/blog/configure-nginx-as-a-web-server)

[https://www.rails365.net/articles/nginx-zhi-ji-ben-jie-shao-he-pei-zhi-wen-jian-yu-fa-yi](https://www.rails365.net/articles/nginx-zhi-ji-ben-jie-shao-he-pei-zhi-wen-jian-yu-fa-yi)