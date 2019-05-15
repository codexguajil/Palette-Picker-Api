const app = require('./app')

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} is running on localhost:${app.get('port')}.`);
});

module.exports = app;
