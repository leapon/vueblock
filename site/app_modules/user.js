var debug = require('debug')('user');
var util = require('util');
var tool = require('leaptool');
var moment = require('moment');

module.exports = function(app) {

  var module_name = 'user';
  var block = {
    app: app,
    role: 'user'
  };

  block.data = tool.object(require('basedata')(app, module_name));
  block.page = tool.object(require('basepage')(app, module_name, block.data));

  block.model = {
    username: {
      type: 'string',
      required: true
    },
    firstname: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    },
    email: {
      type: 'string',
      subtype: {
        type: 'email'
      },
      required: true,
      option: {
        unique: true
      }
    },
    salt: {
      type: 'string',
      subtype: {
        type:'string'
      }
    },
    password: {
      type: 'string',
      subtype: {
        type: 'password'
      }
    },
    api_token: {
      type: 'string' // jwt token containing use id
    },
    roles: {
      type: 'array',
      subtype: {
        type:'string'
      }
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

  /*
  block.listFields = [
    { name:'username', display:'Username', flex:2, sort:'asc' },
    { name:'email', display:'Email', flex:3 },
    { name:'status', display:'Status', flex:1 }
  ];
  */

  // data
  block.data.addUser = function(req, res) {
    var callback = arguments[3] || null;
    var parameter = tool.getReqParameter(req);
    // user email is lower case
    parameter.email = parameter.email.toLowerCase();
    parameter.roles = parameter.roles ? parameter.roles : [];
    debug('add user:', parameter);
    tool.setReqParameter(req, parameter);
    var condition = {email: parameter.email};
    var filter = {}
    block.data.get(req, res, condition, filter, function(error, docs, info) {
      var item = docs && docs[0] || null;
      if (item) {
        error = new Error('user exists for email ' + parameter.email);
        info = { message:'Error in adding a new user' };
        app.cb(error, docs, info, req, res, callback);
      } else {
        block.data.addUserNext(req, res, null, callback);
      }
    });
  };

  block.data.addUserNext = function(req, res, next, callback) {
    var user = tool.getReqParameter(req);
    user.username = user.username || user.email;
    user.salt = Math.round(100000000 * Math.random());
    user.password = tool.hash(user.password + user.salt);
    user.api_token = tool.encodeToken({ user:user.username }, app.setting.token_secret);
    block.data.add(req, res, user, function(error, docs, info) {
      var user = docs && docs[0];
      debug('user created:', JSON.stringify(user));
      if (req.session) {
        req.session.user = user;
      }
      app.cb(error, docs, info, req, res, callback);
    });
  };

  block.data.login = function(req, res, next) {
    var callback = arguments[3] || null;
    var parameter = tool.getReqParameter(req);
    var email = parameter.email || '';
    var condition = { email:email };
    var filter = {};
    block.data.get(req, res, condition, filter, function(error, docs, info) {
      authenticated = false;
      var user = docs && docs[0] || null;
      if (user) {
        var password = tool.hash(parameter.password + user.salt);
        var message = '';
        if (password === user.password) {
          message = email + ' passes login';
          authenticated = true;
        } else {
          message = email + ' fails login';
        }
      }
      info = { success:authenticated, message:message };
      app.cb(error, user, info, req, res, callback);
    })
  };

  // page
  block.page.login = function(req, res) {
    var page = app.getPage(req, { title:'login' });
    page.redirect = req.query.url || '';
    res.render('user/login', { page:page });
  };

  block.page.loginPost = function(req, res) {
    var parameter = tool.getReqParameter(req);
    block.data.login(req, res, null, function(error, user, info) {
      if (info.success) {
        if (req.session) {
          delete user.salt;
          delete user.password;
          req.session.user = user;
        }
        var nextUrl = parameter.redirect || '/';
        res.redirect(nextUrl);
      } else {
        var text = 'Login failed';
        info = {
          message: 'Incorrect username or password'
        };
        app.renderInfoPage(new Error(text), null, info, req, res);
      }
    });
  };

  block.page.signup = function(req, res) {
    debug('user signup');
    var page = app.getPage(req, {});
    page.title = 'User Signup';
    res.render('user/signup', { page:page });
  };

  block.page.signupPost = function(req, res) {
    var parameter = tool.getReqParameter(req);
    debug('user signup posted - parameter:', parameter);

    var invite_code = parameter.invite_code;
    var user_roles = [];
    switch (parameter.invite_code) {
      case app.setting.invite_code_user:
        user_roles = ['user'];
        break;
      case app.setting.invite_code_admin:
        user_roles = ['admin', 'user'];
        break;
    }

    if (user_roles.length == 0) {
      debug('entered invite code, ' + invite_code + ', does not match');
      var message = 'Incorrect invite code';
      app.renderInfoPage(new Error('Signup Error'), null, { message:message }, req, res);
    } else {
      tool.setReqParameter(req, { roles:user_roles });
      block.data.addUser(req, res, null, function(error, docs, info) {
        if (error) {
          app.renderInfoPage(error, docs, info, req, res);
        } else {
          var user = docs && docs[0];
          var nextUrl = parameter.redirect || '/';
          res.redirect(nextUrl);
        }
      });
    }

  };

  block.page.logout = function(req, res) {
    if (req.session) {
      req.session.user = null;
    }
    var nextUrl = '/';
    res.redirect(nextUrl);
  };

  block.page.getProfile = function(req, res) {
    var page = app.getPage(req, { title:'User Profile' });
    res.render('user/profile', { page:page });
  };

  /*
  block.page.getIndex = function(req, res) {
    block.data.getWeb(req, res, null, function(error, docs, info) {
      var page = app.getPage(req);
      res.render('user/index', { page:page });
    });
  };

  block.page.loginLinkedIn = function(req, res) {
    var page = app.getPage(req);
    page.redirect = req.query.url || '';
    page.title = 'User Login via LinkedIn';
    page.linkedinKey = app.setting.linkedin && app.setting.linkedin.key || '';
    res.render('user/login-linkedin', { page:page });
  };

  block.page.getProfile = function(req, res) {
    var page = app.getPage(req);
    page.title = 'User Profile';
    page.controller = "users";
    res.render('user/profile', { page:page });
  };

  block.page.resetPassword = function(req, res){
    var parameter = tool.getReqParameter(req);
    var key = parameter.key || '';
    if (key) {
      // Password reset key: userId + 10 digit spacer + timestamp
      // decode: new Buffer(key, 'base64').toString('ascii')
      var keyOutput = new Buffer(key, 'base64').toString('ascii');
      var userId = keyOutput.substr(0,24);
      var initDate = new Date(parseInt(keyOutput.substr(34)));
      block.data.getById(req, res, userId, function(error, docs, info) {
        var user = docs && docs[0] || null;
        var page = app.getPage(req);
        page.redirect = req.query.url || '';
        page.title = 'Password Change';
        page.user = user;
        page.key = key;
        res.render('user/password_change', { page:page });
      });
    } else {
      var page = app.getPage(req);
      page.redirect = req.query.url || '';
      page.title = 'Password Reset';
      res.render('user/password_reset', { page:page });
    }
  };

  block.page.resetPasswordPost = function(req, res) {
    var parameter = tool.getReqParameter(req);
    var email = parameter.email || '';
    var condition = { email:email };
    var filter = {};
    block.data.get(req, res, condition, filter, function(error, docs, info) {
      var user = docs && docs[0] || null;
      if (user) {
        // send notification email to user
        console.log('app.website=',app.website);
        var passwordResetKey = getPasswordResetKey(user);

        function getPasswordResetKey(user) {
          var userId = user._id + '';
          var currentTime =  (new Date()).valueOf();
          var spacer = Math.floor(Math.random()* 10000000000); // 10 digit random number as spacer
          var key = userId + spacer + currentTime;
          key = new Buffer(key).toString('base64');
          return key;
        };

        //resetUrl = app.website + '/user/password/reset?key=' + passwordResetKey;
        var resetUrl = 'http://localhost:8700' + '/users/password/reset?key=' + passwordResetKey; //!need website url later
        //console.log('resetUrl=',resetUrl);
        var emailSubject = 'Reset your account password'
        var emailContent = 'The hyperlink to reset your password:<br>\r\n<br>\r\n' + resetUrl;
        app.mailer && app.mailer.send({
          to: user.email,
          subject: emailSubject,
          content: emailContent,
          isHtml: true,
          callback: function(error, info) {
            console.log('mail sent:', error, info);
          }
        });
        info = { message: 'Please check your email: ' + user.email + ' for password reset information.' };
      } else {
        info = { message:'User is not found for given email.' };
      }
      app.renderInfoPage(error, null, info, req, res);
    });
  };

  block.page.changePasswordPost = function(req, res) {
    var parameter = tool.getReqParameter(req);
    var password = parameter.password;
    var key = parameter.key || '';
    // Password reset key: userId + 10 digit spacer + timestamp
    // decode: new Buffer(key, 'base64').toString('ascii')
    var keyOutput = new Buffer(key, 'base64').toString('ascii');
    var userId = keyOutput.substr(0,24);
    var parameter2 = {};
    parameter2._id = userId;
    parameter2.password = password;
    block.data.edit(req, res, parameter2, function(error, docs, info) {
      info = { message:'Your password is changed successfully.' };
      app.renderInfoPage(error, null, info, req, res);
    });
  };

  block.page.userList = function(req, res) {
    var condition = {};
    var filter = {};
    block.data.get(req, res, condition, filter, function(error, docs, info) {
      var page = app.getPage(req);
      page.title = 'List of users';
      page.users = docs;
      res.render('user/list', { page:page });
    });
  };

  block.page.delUser = function(req, res) {
    var parameter = tool.getReqParameter(req);
    var id = parameter.id;
    app.db.deleteById(module_name, id, function(error, docs, info) {
      res.redirect('/users/list');
    });
  };
  */

  // page route
  app.server.get('/user/login', block.page.login);
  app.server.post('/user/login', block.page.loginPost);
  app.server.get('/user/signup', block.page.signup);
  app.server.post('/user/signup', block.page.signupPost);
  app.server.get('/user/logout', block.page.logout);

  app.server.all('/user/profile', block.page.checkLogin);
  app.server.get('/user/profile', block.page.getProfile);

  /*
  app.server.get('/users', block.page.getIndex);
  app.server.get('/users/:username/profile', block.page.getProfile);
  app.server.get('/users/password/reset', block.page.resetPassword);
  app.server.post('/users/password/reset_post', block.page.resetPasswordPost);
  app.server.post('/users/password/change_post', block.page.changePasswordPost);

  app.server.all('/users/list', block.page.checkLogin);
  app.server.get('/users/list', block.page.userList);
  app.server.get('/users/:id/del', block.page.delUser);

  app.server.get('/users/login/linkedin', block.page.loginLinkedIn);
  */

  return block;
};
