const net = require("net");
const maxConnectCount = 50;

const BASE_PORT = 9000;

let LAST_PORT = BASE_PORT;

const getAvailablePort = (options) => new Promise((resolve, reject) => {
	const server = net.createServer();
	server.unref();
	server.on('error', reject);
	server.listen(options, () => {
		const { port } = server.address();
		server.close(() => {
			resolve(port);
		});
	});
});
const PORTS = [];
const getProts = async () => {
  while(PORTS.length < maxConnectCount) {
    try {
      const port = await getAvailablePort({
          port: LAST_PORT
      });
      PORTS.push(port);
    } catch (e) {
      console.log('port is useless', e)
    }
    LAST_PORT++;
  }
}

let count = 0;

const createConnections = async () => {
  await getProts();
  for(let i = 0; i < PORTS.length; i++) {
    net
      .createConnection({
        port: 8989,
        host: "127.0.0.1",
        localAddress: "127.0.0.1",
        localPort: PORTS[i],
        timeout: 350000
      })
      .on("data", (d) => {
        console.log(`No.${i}: ${d.toString()}`);
        count++;
        console.log(count);
      })
  }

}

createConnections();