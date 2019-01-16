var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var copyWebpackPlugin = require('copy-webpack-plugin');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');
var env = process.env.MY_ENV || process.env.IONIC_ENV;
var IONIC_ENV = process.env.IONIC_ENV;
console.log('env='+env);
console.log('IONIC_ENV='+IONIC_ENV);

if (env === 'test') {
  if (IONIC_ENV == 'dev') {
    useDefaultConfig.dev.resolve.alias = {
      "@app/env": path.resolve(environmentPath(env))
    };
  };
  if (IONIC_ENV == 'prod') {
    useDefaultConfig.prod.resolve.alias = {
      "@app/env": path.resolve(environmentPath(env))
    };
  };
}else{
  useDefaultConfig.prod.resolve.alias = {
    "@app/env": path.resolve(environmentPath('prod'))
  };

  useDefaultConfig.dev.resolve.alias = {
    "@app/env": path.resolve(environmentPath('dev'))
  };
}

/****************拷贝config.xml文件*******************/
var configDEVPath = './publish/dev/config.xml';
var configPRODPath = './publish/prod/config.xml';
if(env=='prod'){
  useDefaultConfig.dev.plugins.push(
    new copyWebpackPlugin([ // 复制插件
      { from: path.resolve(configPRODPath), to:  path.resolve('./') }
    ])
  );
  useDefaultConfig.prod.plugins.push(
    new copyWebpackPlugin([ // 复制插件
      { from: path.resolve(configPRODPath), to:  path.resolve('./') }
    ])
  )
}else{
  useDefaultConfig.dev.plugins.push(
    new copyWebpackPlugin([ // 复制插件
      { from: path.resolve(configDEVPath), to:  path.resolve('./') }
    ])
  );
  useDefaultConfig.prod.plugins.push(
    new copyWebpackPlugin([ // 复制插件
      { from: path.resolve(configDEVPath), to:  path.resolve('./') }
    ])
  )
}
/****************拷贝config.xml文件结束*******************/

function environmentPath(env) {
  var filePath = './src/config/config' + (env === 'prod' ? '' : '.' + env) + '.ts';
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

module.exports = function () {
  return useDefaultConfig;
};
