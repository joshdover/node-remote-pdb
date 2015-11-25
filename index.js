var _        = require('lodash');
var telnet   = require('telnet-client');
var commands = require('./commands');

function Pdb() {
  this.connection = new telnet();
};

Pdb.prototype.connect = function(connectionParams) {
  connectionParams = _.extend({
    shellPrompt: '(Pdb)'
  }, connectionParams);

  return this.connection.connect(connectionParams);
};

Pdb.prototype.close = function() {
  return this.connection.close();
};

function filterArrow(response) {
  return response.replace('-> ', '');
};

_.each(commands, function(commandName) {
  Pdb.prototype[commandName] = function() {
    command = arguments.length
      ? commandName + ' ' + Array.prototype.slice.call(arguments).join(' ')
      : commandName;

    return this.connection
      .exec(command)
      .then(filterArrow);
  };
});

module.exports = Pdb;
