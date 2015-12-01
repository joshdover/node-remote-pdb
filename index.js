var _        = require('lodash');
var telnet   = require('telnet-client');
var commands = require('./commands');

function Pdb() {
  this.connection = new telnet();
};

Pdb.prototype.connect = function(connectionParams) {
  connectionParams = _.extend({
    shellPrompt: '(Pdb)',
    irs: '\r\n',
    ors: '\n\n'
  }, connectionParams);

  return this.connection.connect(connectionParams);
};

Pdb.prototype.close = function() {
  return this.connection.close();
};

var whereParser = function(output) {
  console.log(output);
  var parts = /\>\s(.*)\(([0-9])+\)\<module\>\(\)$/.exec(output);

  return {
    file: parts[0],
    lineNumber: parts[1]
  }
};

Pdb.prototype.currentLocation = function() {
  return this
    .where()
    .then(whereParser);
};

function outputFilter(response) {
  response = response.replace(/^-> /, '');
  response = response.replace(/\n-> /, '\n');

  response = response.replace(/\(Pdb\)\s/, '');

  return response;
};

_.each(commands, function(commandName) {
  Pdb.prototype[commandName] = function() {
    command = arguments.length
      ? commandName + ' ' + Array.prototype.slice.call(arguments).join(' ')
      : commandName;

    return this.connection
      .exec(command, { echoLines: 1 })
      .then(outputFilter);
  };
});

module.exports = Pdb;
