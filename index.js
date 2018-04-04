const {
    spawn
} = require("child_process");
const fs = require("fs");
var bat;
fs.watchFile("./nginx/conf/nginx.conf", (curr, prev) => {
    if (curr.mtime != prev.mtime) {
        bat = spawn("./nginx/nginx.exe", ["-s", "reload"]);
        bat.stdout.once('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        bat.stderr.once('data', (data) => {
            console.log(`\n配置错误: ${data}`);
        });
        console.log('nginx.config修改');
    }
})
console.log('正在监听nginx.cong文件变化');