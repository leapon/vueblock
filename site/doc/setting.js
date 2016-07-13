exports.setting = {
  // web app
  http_port: 8080,
  invite_code_user: 'hello',
  invite_code_admin: 'world',
  token_secret: '12345678',
  // database
  database: {
    type: 'mongo',
    host: 'localhost',
    port: 27017,
    name: 'leapbase',
    username: '',
    password: ''
  }
};