var Pdb = require('../index');
var pdb = new Pdb();
pdb
  .connect({
    host: '127.0.0.1', port: 4444
  })
  .then(function() {
    return pdb.help()
  })
  .then(console.log)
  .then(function() {
    return pdb.where()
  })
  .then(console.log)
  .then(function() {
    return pdb.s()
  })
  .then(console.log)
  .then(function() {
    return pdb.s()
  })
  .then(console.log)
  .then(function() {
    return pdb.p('x + y')
  })
  .then(console.log)
  .then(pdb.close)
