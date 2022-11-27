const { repoInfos, downloadDir } = require('./repo.js');            // Repo信息
const path = require('path');                                       // 路径处理
const fs = require('fs');                                           // 文件处理

let scanSource = [];                                                
// httpRepo处理
function httpRepoDeal (name) {
    let tempIndex = '';
    let httpRepo = '';
    let branch = '';
    repoInfos.forEach((item)=>{
        if(item.name == name){
            tempIndex = item.repo.indexOf('.git');
            httpRepo = item.repo.substring(0, tempIndex);
            branch = item.branch;
        }
    })
    return httpRepo + '/blob/' + branch + '/';
}
// 模块代码存放目录
const codePath = path.join(process.cwd(), downloadDir);
// scanSource动态处理
if(fs.existsSync(codePath)){
    const modules = fs.readdirSync(downloadDir);                             
    if(modules.length>0){
        scanSource = modules.map((item)=>{
            return {
                name: item,
                path: [downloadDir + '/' + item + '/src'],
                packageFile: downloadDir + '/' + item + '/package.json',
                format: (str) => {
                    return str.replace(downloadDir + '/' + item + '/','');
                },
                httpRepo: httpRepoDeal(item)
            }                  
        })
    }
}
// console.log(scanSource);

module.exports ={
    scanSource: scanSource,                                           // 必须，待扫描源码的配置信息                                                                 
    analysisTarget: 'framework',                                      // 必须，要分析的目标依赖名
    analysisPlugins: [],                                              // 可选，自定义分析插件，默认为空数组
    blackList: ['window.FB.login', 'app.localStorage.set'],           // 可选，需要标记的黑名单api，默认为空数组
    browserApis: ['window','document','history','location'],          // 可选，要分析的BrowserApi，默认为空数组
    reportDir: 'docs',                                              // 可选，生成代码分析报告的目录，默认为report
    reportTitle: '全项目依赖(framework)分析报告',                       // 可选，代码分析报告标题，默认为'代码依赖分析报告'
    isScanVue: true,                                                  // 可选，是否要扫描分析vue中的ts代码，默认为false
    scorePlugin: null,                                                // 可选，评分插件: Function|'default'|null, default表示运行默认插件，null表示不评分
    alarmThreshold: null                                              // 可选，开启代码告警及阈值分数(0-100)，默认为null即关闭告警逻辑 (CLI模式生效)
}

