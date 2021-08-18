const net = require("net");
const cluster = require('cluster');
const CPUS = require('os').cpus().length;
// const Schedule = require('./schedule.js');

let POOL = [];
const ALL_WORKERS_STATUS = new Map();
const DELAY_TASK = [];
const PORTS = [];
const HAS_RESPONED_PORTS = [];
const RELATIONS = [];
const KILL_SIGNAL = 'SELF_KILL';


console.log(`Number of CPUs is ${CPUS}`);
console.log(`Master ${process.pid} is running`);

const mode = process.argv[2];

cluster.setupMaster({
  exec: 'work.js'
})

// Fork workers.
for (let i = 0; i < CPUS; i++) {
  const worker = cluster.fork();
  POOL.push(worker);
  ALL_WORKERS_STATUS.set(worker.id, 'idle');
}

// Round-robin 轮训调度

const rrSchedule = ({
  socket, signal
}) => {
  let released = true;
  for(let worker of POOL) {
    if (ALL_WORKERS_STATUS.get(worker.id) === 'idle') {
      console.log('Round-Robin Schedule:', worker.id);
      // 分配任务
      ALL_WORKERS_STATUS.set(worker.id, 'busy');
      RELATIONS.push({ id: worker.id, port: socket.remotePort });
      worker.send(signal, socket);
      released = false;
      break;
    }
  }
  // 分发时所有子进程 都处于繁忙状态
  // 此时任务入栈
  if (released) {
    DELAY_TASK.push(socket);
  }
}

// ip-hash ip哈希调度

const ipHashSchedule = ({
  socket, signal
}) => {
  // 目前没想好 如何在 client 端模拟不同的 ip，暂时通过 port 来模拟不同服务
  // const getWorkerIndex = (ip) => {
  //   let symbol = "";
  //   for(let i = 0; i < ip.lenght; i++) {
  //   if(!isNaN(+ip[i])) {
  //     symbol += ip[i];
  //   }
  //   return Number(symbol) % CPUS;
  // }
  const getWorkerIndex = (port) => {
    return parseInt(Math.random() * Number(port)) % CPUS;
  };
  const id = getWorkerIndex(socket.remotePort)
  const worker = POOL[id];
  console.log('IP-Hash Schedule:', worker.id);
  const status = ALL_WORKERS_STATUS.get(worker.id);
  if (status === 'idle') {
    ALL_WORKERS_STATUS.set(worker.id, 'busy');
    // RELATIONS.push({ id: worker.id, port: socket.remotePort });
    worker.send(signal, socket);
  } else {
    // 分发时当前进程处于繁忙状态
    // 此时任务入栈
    DELAY_TASK.push(socket);
  }
}

// start server
// 创建TCP服务器
const server = net.createServer();

const dealDelayTask = (worker, signal) => {
  if (DELAY_TASK.length) {
    const socket = DELAY_TASK.shift();
    if (worker.isDead()) {
      scheduleFactory({
        socket,
        signal,
        operator,
        delayQueue: DELAY_TASK,
        pool: POOL,
        CPUS
      })
    } else {
      ALL_WORKERS_STATUS.set(worker.id, 'busy');
      // RELATIONS.push({ id: worker.id, port: socket.remotePort });
      worker.send(signal, socket);
    }
  } else {
    ALL_WORKERS_STATUS.set(worker.id, 'idle');
  }
}

// 根据进程参数决定调度算法
// const scheduleFactory = mode === 'rb' ? Schedule.rrSchedule : Schedule.ipHashSchedule;
const scheduleFactory = mode === 'rb' ? rrSchedule : ipHashSchedule;

const randomKillSignal = () => {
  return parseInt(CPUS * Math.random()) % 4 === 0 ? KILL_SIGNAL : 'NONE'
}

const operator = (directive, key, status) => {
  switch (directive) {
    case "get":
      return ALL_WORKERS_STATUS.get(key);
    case "set":
      ALL_WORKERS_STATUS.set(key, status)
      break;
    default:
      break;
  }
  return;
}
/*
  服务器收到请求后分发给工作进程去处理
*/
server.on("connection", (socket) => {
  console.log('start');
  PORTS.push(socket.remotePort)
  // 调度
  const signal = randomKillSignal();
  scheduleFactory({
    socket,
    signal,
    operator,
    delayQueue: DELAY_TASK,
    pool: POOL,
    CPUS
  });
});

// const getStatus = () => {
//   const record = [];
//   ALL_WORKERS_STATUS.forEach((value, key) => {
//     record.push(({
//       value, key
//     }))
//   })
//   return record;
// }

server.listen(8989, () => {
  cluster.on('message', (worker, message) => {
    const [port, status] = message.split("-");
    console.log(`worker ${worker.id} has complated port ${port} 's work and status is ${status}`);
    HAS_RESPONED_PORTS.push(port);
    if (status !== KILL_SIGNAL) {
      ALL_WORKERS_STATUS.set(worker.id, 'idle');
      const signal = randomKillSignal();
      dealDelayTask(worker, signal);
    }
    // console.log('live works status', getStatus());
    // console.log('RELATIONS', RELATIONS);
  });
  cluster.on('disconnect', (worker) => {
    console.log(`The worker #${worker.id} has disconnected`);
    ALL_WORKERS_STATUS.delete(worker.id);
    POOL = POOL.filter((w) => w.id !== worker.id);
    const nextWorker = cluster.fork();
    POOL.push(nextWorker);
    ALL_WORKERS_STATUS.set(nextWorker.id, 'idle');
    // console.log('live works status', getStatus());
    // console.log('RELATIONS', RELATIONS);
    // const signal = randomKillSignal();
    dealDelayTask(nextWorker, "NONE");
  });
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.id} died`);
    // console.log('live works status', getStatus());
    // console.log('RELATIONS', RELATIONS);
  });
});
