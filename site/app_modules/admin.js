var debug = require('debug')('admin');
var util = require('util');
var jwt = require('jsonwebtoken');
var tool = require('leaptool');

module.exports = function(app) {

  var module_name = 'admin';
  var block = {
    app: app,
    role: 'admin',
    model: null
  };

  block.data = tool.object(require('basedata')(app, module_name));
  block.page = tool.object(require('basepage')(app, module_name, block.data));

  // make sure token is valid
  block.data.checkToken = function(req, res, next) {
    if (req.session && req.session.user) {
      next(); // no need for token check if user is logged in already
    } else {
      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, app.setting.token_secret, function(err, value) {
          if (err) {
            debug('token verify error:', err);
            return res.json({ success: false, message: 'Invalid token' });
          } else {
            debug('api token check - decoded token value:', value);
            app.module.user.data.getByField(req, res, 'username', value.user, function(error, docs, info) {
              var user = docs && docs[0] || null;
              debug('token user found:', user);
              if (user) {
                req.user = user;
                next();
              } else {
                return res.json({ success: false, message: 'No user found for token' });
              }
            })
          }
        });
      } else {
        // if there is no token, return 403
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
      }
    }
  };

  // make sure logged in user has access to route
  block.data.checkAccess = function(req, res, next) {
    var user = req.session && req.session.user || req.user;
    if (user) {
      var module_name = tool.getModuleFromUrl(req.url);
      var module_in_url = module_name && app.module[module_name];
      var module_role_name = module_in_url && module_in_url.role || '';
      debug('req url info:', req.url, ', module role:', module_role_name);
      debug('user info:', user.username, ', roles:', user.roles);
      if (user.roles.indexOf(module_role_name) >= 0) {
        next(); // user's roles include url's corresponding module role name
      } else {
        return res.status(403).send({
            success: false,
            message: 'User access is denied'
        });
      }
    } else {
      return res.status(403).send({
          success: false,
          message: 'No user info found'
      });
    }
  };

  // site admin page
  block.page.getAdminPage = function(req, res) {
    var page = app.getPage(req, { title:'admin' });
    res.render('admin/index', { page:page });
  };

  /*
  // user manager page
  block.page.getManagePage = function(req, res) {
    var page = app.getPage(req);
    res.render('admin/manage', { page:page });
  };
  */

  // routes
  app.server.all('/admin', block.page.checkLogin);
  app.server.all('/admin/*', block.page.checkLogin);
  app.server.get('/admin', block.page.getAdminPage);

  /*
  app.server.get('/' + module_name + '/page/:pagename', block.page.showPage);
  app.server.all('/manage', block.page.checkLogin);
  app.server.all('/manage/*', block.page.checkLogin);
  app.server.get('/manage', block.page.getManagePage);
  */

  return block;
};
