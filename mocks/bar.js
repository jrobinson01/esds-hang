const data = JSON.parse(JSON.stringify(require('./data.json')));

module.exports = function(ctx) {
  data.name = 'bar';
  return data;
}
