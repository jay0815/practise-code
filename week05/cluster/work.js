const cluster = require('cluster');
const process = require("process");

// console.log(`Worker ${process.pid} started`);
// console.log(`Worker id is ${cluster.worker.id}`);

const KILL_SIGNAL = 'SELF_KILL';

cluster.worker.on('message', (message, socket) => {
  const { remotePort } = socket;
  socket.write(`${remotePort} is responed by ${cluster.worker.id}`, () => {
    socket.end();
    cluster.worker.send(`${remotePort}-${message}`, () => {
      if (message === KILL_SIGNAL) {
        cluster.worker.disconnect();
      }
    });
  });
})
