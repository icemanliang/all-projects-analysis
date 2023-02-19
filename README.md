# all-project-analysis
演示code-analysis-ts代码扫描分析工具用于微前端全应用代码分析Demo,使用github pages来部署报告

全应用代码分析报告地址： https://liangxin199045.github.io/all-projects-analysis/

目录介绍：

analysis.config.js为配置文件
repo.js为全子应用信息配置文件
docs目录下为分析后产生的代码分析报告及数据

分析全应用的基本步骤：
1. 下载全部子应用代码到临时目录
2. 依据临时目录下的代码目录动态生成scanSource扫描源配置信息
3. 执行分析

本地执行:
```javascript
// 安装依赖
$ npm install 
// or 
$ yarn install

// 下载全项目代码仓库，codes目录下为全部子应用项目代码
$ npm run download 
// or 
$ yarn download

// 分析全项目
$ npm run analysis 
// or 
$ yarn analysis
```
全应用项目仓库信息：
repo.js

下载代码脚本:
download.js

CI配置:
gitlab-ci.yml

即时通信消息通知脚本:
notification.sh
