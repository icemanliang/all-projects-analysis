const { repoInfos, downloadDir } = require('./repo.js');            // Repo信息
const { execSync } = require('child_process');                      // 子进程操作
const fs = require('fs');                                           // 文件处理
const path = require('path');                                       // 路径处理
const chalk = require('chalk');                                     // 美化输出
const ora = require('ora');                                         // 美化命令行
const download = require('download-git-repo');                      // 代码下载器


// 删除指定目录及目录下所有文件
function rmDir(dirPath) {
    try{
        if( fs.existsSync(dirPath) ) {                                      // 判断给定的路径是否存在
            const files = fs.readdirSync(dirPath);                          // 返回文件和子目录的数组
            files.forEach(function(file){
                var curPath = path.join(dirPath, file);
                    
                if(fs.statSync(curPath).isDirectory()) {                    // 如果是文件夹，则继续
                    rmDir(curPath);
                } else {    
                    fs.unlinkSync(curPath);                                 // 如果是文件，则删除
                }
                    
            });
            fs.rmdirSync(dirPath);                                          // 清除文件夹
        }
    }catch(e){
        throw e;
    }
}

function downloadItem(project) {
    return new Promise((resolve, reject) => {
        const spinner = ora(chalk.blue('download start: ' + project.name)).start();
        download(`direct:${project.repo}#${project.branch}`, `${downloadDir}/${project.name}`, {clone: true}, function (err) {
            if(err){
                console.log(err);
                spinner.fail(chalk.red(project.name+' download fail'));
                reject(err);
            }else{
                spinner.succeed(chalk.green(project.name + ' download success'));
                resolve();
            }
        })
    });
}

async function downloadAll(repoInfos){
    if(repoInfos.length >0){
        const codePath =path.join(process.cwd(),downloadDir);
        // 代码下载目录存在则先删除
        rmDir(codePath);
        // 下载所有子应用代码仓库
        await Promise.allSettled(repoInfos.map((item) => {
            return downloadItem(item);
        }));
        // 判定下载情况
        if(fs.existsSync(codePath)){
            let modules = fs.readdirSync(downloadDir);
            // console.log(modules);
            if(modules.length>0){
                console.log(chalk.green('=== download finish ==='));
            }else{
                console.log(chalk.red('error : 待分析代码目录不存在文件'));        // 输出错误信息
                process.exit(1);
            }
        }else{
            console.log(chalk.red('\nerror : 待分析代码目录为空'));        // 输出错误信息
            process.exit(1);
        }
    }else{
        console.log(chalk.red('error : repoInfos为空'));        // 输出错误信息
        process.exit(1);
    }
}

downloadAll(repoInfos);
