const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const patientRoute = require('./routes/patient.route');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// PostgreSQL Connection
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'your_password',
  port: 5432,
});
client.connect();

app.use('/patients', patientRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port);
});

// WebSocket server
const wsServer = new WebSocketServer({ server: server });
wsServer.on('connection', (socket) => {
  console.log('WebSocket client connected');
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    wsServer.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocketServer.OPEN) {
        client.send(message);
      }
    });
  });
  socket.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
