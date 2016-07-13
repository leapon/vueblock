'use strict';
var debug = require('debug')('service');
var tool = require('leaptool');

module.exports = function(app) {

  var module_name = 'service';
  var block = {
    app: app,
    role: 'user',
    model: null
  };

  block.data = tool.object(require('basedata')(app, module_name));
  block.page = tool.object(require('basepage')(app, module_name, block.data));

  // data section
  block.data.generateRandomNumber = function(req, res) {
    debug('data.generateRandomNumber');
    var callback = arguments[3] || null;
    //var parameter = tool.getReqParameter(req);
    app.cb(null, [], { value:Math.random() }, req, res, callback);
  };

  // page section
  block.page.showService = function(req, res) {
    debug('page.showService');
    block.data.generateRandomNumber(req, res, null, function(error, docs, info) {
      var page = app.getPage(req, {
        module_name: module_name,
        page_name: 'service',
        title: 'service'
      });
      page.random_number = info.value;
      res.render('service/index', { page:page });
    });
  };

  // data route
  app.server.get('/data/service/generate_random_number', block.data.generateRandomNumber);

  // page route
  app.server.get('/service', block.page.showService);

  return block;
};
