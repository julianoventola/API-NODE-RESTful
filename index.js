const express = require('express');

const server = express();

const users = ['Juliano', 'João', 'Pedro'];

server.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

server.listen(3000, () => {
  console.log('server running on port 3000');
});
