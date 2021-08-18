
// Round-robin 轮训调度

const rrSchedule = ({
  pool, operator, delayQueue, socket, signal
}) => {
  let released = true;
  for(let worker of pool) {
    if (operator('get', worker.id) === 'idle') {
      console.log('Round-Robin Schedule:', worker.id);
      // 分配任务
      operator('set', worker.id, 'busy');
      worker.send(signal, socket);
      released = false;
      break;
    }
  }
  // 分发时所有子进程 都处于繁忙状态
  // 此时任务入栈
  if (released) {
    console.log('record socket');
    delayQueue.push(socket);
  }
}

// ip-hash ip哈希调度

const ipHashSchedule = ({
  pool, operator, delayQueue, socket, CPUS, signal
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
  const worker = pool[id];
  console.log('IP-Hash Schedule:', worker.id);
  const status = operator('get', worker.id);
  if (status === 'idle') {
      operator('set', worker.id, 'busy');
      worker.send(signal, socket);
  } else {
    // 分发时当前进程处于繁忙状态
    // 此时任务入栈
    console.log('record socket');
    delayQueue.push(socket);
  }
}
module.exports = {
  rrSchedule,
  ipHashSchedule
}