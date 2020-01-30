const express = require('express');

// Create server instance
const server = express();

// Enable server handle JSON data from POST/PUT
server.use(express.json());

// "Basic" users
const users = ['Juliano', 'João', 'Pedro', 'Maria'];

// Basic Global Middleware
server.use((req, res, next) => {
  console.log(`Metodo: ${req.method};\nURL: ${req.url}`);
  next();
});

// Middleware for routes POST and PUT
function userExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name value not found in request' });
  }
  next();
}

// GET - List All Users
server.get('/users/', (req, res) => {
  return res.json(users);
});

// GET - List One User
server.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

// POST - Create One New User - Middleware to validate name field
server.post('/users/', userExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

// PUT - Edit One User using index in array - Middleware to validate name field
server.put('/users/:index', userExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  return res.json(users);
});

// DELETE - Delete One User using index in array
server.delete('/users/:index', (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json(users);
});

// Keep server listening any conection on port 3000
server.listen(3000, () => {
  console.log('server running on port 3000');
});
