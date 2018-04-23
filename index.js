const {
    spawn
} = require("child_process"),
    fs = require("fs"),
    path = require("path");
var bat,
    count = 0;
fs.watchFile("./nginx/conf/nginx.conf", (curr, prev) => {
    if (curr.mtime != prev.mtime) {
        bat = spawn("./nginx.exe", ["-s", "reload"], {
            cwd: path.resolve(__dirname, './nginx')
        });
        bat.stdout.once('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        bat.stderr.once('data', (data) => {
            console.log(`\n配置错误: ${data}`);
        });
        count++;
        console.log('nginx.config修改: ' + count);
    }
})
console.log('正在监听nginx.cong文件变化');