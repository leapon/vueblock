var debug = require('debug')('role');
var util = require('util');
var tool = require('leaptool');
var moment = require('moment');

module.exports = function(app) {

  var module_name = 'role';
  var block = {
    app: app,
    role: 'admin',
  };

  block.data = tool.object(require('basedata')(app, module_name));
  block.page = tool.object(require('basepage')(app, module_name, block.data));

  block.model = {
    name: {
      type: 'string',
      required: true
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

  return block;
};
