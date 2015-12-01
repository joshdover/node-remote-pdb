var child_process = require('child_process');
var assert        = require('assert');
var Pdb           = require('../index');
var sleep         = require('sleep').sleep;

describe('pdb', function() {
  var test_app;
  var pdb;
  var connect;

  beforeEach(function() {
    test_app = child_process.spawn('python', ['test/test_app.py']);
    sleep(1);
    pdb = new Pdb();
    connect = pdb.connect({
      host: '127.0.0.1',
      port: 4444
    });
  });

  describe('p', function() {
    it('evaluates arbitrary expressions', function() {
      return connect
        .then(function() {
          // return pdb.where();
          return pdb.p('1 + 2');
        })
        .then(function(result) {
          // return pdb.where()
          assert.equal(result, '3');
        });
    });
  });
});
