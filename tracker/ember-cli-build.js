'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  const bootstrapPath = 'node_modules/bootstrap-sass/assets/';
  let app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
          bootstrapPath + 'stylesheets'
      ]
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // 生成指向bootstrap资源文件的路径
  // 使用import向ing用添加对该资源的引用
  // app.import(bootstrapPath + 'javascripts/bootstrap.js');
  app.import(`${bootstrapPath}javascripts/bootstrap/collapse.js`);
  app.import(`${bootstrapPath}javascripts/bootstrap/transition.js`);
  return app.toTree();
};
