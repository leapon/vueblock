var debug = require('debug')('resource');
var util = require('util');
var tool = require('leaptool');
var moment = require('moment');

module.exports = function(app) {

  var module_name = 'resource';
  var block = {
    app: app,
    role: 'admin',
  };

  block.data = tool.object(require('basedata')(app, module_name));
  block.page = tool.object(require('basepage')(app, module_name, block.data));

  block.model = {
    name: {
      type: 'string'
    },
    type: {
      type: 'string',
      values: ['page', 'file']
    },
    url: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
    status: {
      type: 'string',
      values: ['active', 'inactive']
    },
    create_date: {
      type: 'date'
    },
    create_by: {
      type: 'string'
    },
    edit_date: {
      type: 'date'
    },
    edit_by: {
      type: 'string'
    }
  };


  // data
  block.data.check = function(req, res) {
    var callback = arguments[3] || null;
    var parameter = tool.getReqParameter(req);
    
    app.cb(null, [], {}, req, res, callback);
  };
  
  // page route
  app.server.get('/data/resource/check', block.data.check);
  
  return block;
};
