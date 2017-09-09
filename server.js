const express = require('express');
const app = express();
const path = require('path');

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db');
const User = conn.define('user', {
  name: conn.Sequelize.STRING
});

conn.sync({ force: true })
  .then( ()=> {
    return Promise.all([
      User.create({ name: 'moe' }),
      User.create({ name: 'larry' }),
      User.create({ name: 'curly' })
    ]);
  });

app.use(require('body-parser').urlencoded({ extended: false }));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next)=> {
  User.findAll()
    .then( users => res.send(users))
    .catch(next);
});

app.post('/api/users', (req, res, next)=> {
  User.create(req.body)
    .then( user => res.send(user))
    .catch(next);
});

app.delete('/api/users/:id', (req, res, next)=> {
  User.destroy({ where: { id: req.params.id }})
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.listen(process.env.PORT || 3000);
