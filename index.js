var got = require('got');
var assign = require('object-assign');

function gothub(options) {

  options = options || {};

  this.endpoint = ('endpoint' in options) ? options.endpoint.replace(/\/$/, '') : 'https://api.github.com';

  if ('token' in options) {
    this.token = options.token;
  }

};

['get', 'post', 'put', 'patch', 'head', 'delete'].forEach(function(method){

  gothub.prototype[method] = function(path, opts, callback){

    if (!path) {
      throw new Error('"path" is required');
    }

    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }

    opts = assign({ json:true }, opts);

    opts.method = method.toUpperCase();

    opts.headers = assign({
      'accept': 'application/vnd.github.v3+json',
      'user-agent': 'https://github.com/flesch/gothub'
    }, ('headers' in opts) ? opts.headers : {});

  	if (this.token) {
  		opts.headers.authorization = 'token ' + this.token;
  	}

  	if (method === 'put' && !opts.body) {
  		opts.headers['content-length'] = 0;
  	}

  	return got(this.endpoint + ('/' + path).replace(/\/+/g, '/'), opts, callback);

  };

});

module.exports = gothub;
