var _ = require('lodash');
var telnet = require('telnet-client');
var connection = new telnet();

var COMMANDS = [
  'EOF',
  'bt',
  'cont',
  'enable',
  'jump',
  'pp',
  'run',
  'unt',
  'a',
  'c',
  'continue',
  'exit',
  'l',
  'q',
  's',
  'until',
  'alias',
  'cl',
  'd',
  'h',
  'list',
  'quit',
  'step',
  'up',
  'args',
  'clear',
  'debug',
  'help',
  'n',
  'r',
  'tbreak',
  'w',
  'b',
  'commands',
  'disable',
  'ignore',
  'next',
  'restart',
  'u',
  'whatis',
  'break',
  'condition',
  'down',
  'j',
  'p',
  'return',
  'unalias',
  'where'
];

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

_.each(COMMANDS, function(commandName) {
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
