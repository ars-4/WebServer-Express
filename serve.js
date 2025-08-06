const { Server } = require('./server');
const fs = require('fs');

fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    console.log("Error reading config.json:", err);
    return;
  }
  try {
    const config = JSON.parse(data);
    if (config.servers && Array.isArray(config.servers)) {
      config.servers.forEach(serverConfig => {
        const server = new Server(serverConfig);
        server.runServer();
      });
    } else {
      console.log("Invalid configuration: 'servers' array not found in config.json");
    }
  } catch (parseErr) {
    console.log("Error parsing config.json:", parseErr);
  }
});
