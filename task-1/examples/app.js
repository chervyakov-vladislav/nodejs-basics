import { Worker } from 'node:worker_threads';
import { fork } from 'node:child_process';
import perf_hooks from 'node:perf_hooks';


function runWorker() {
  return new Promise((res) => {
    performance.mark('worker start');
    const worker = new Worker('./worker.js', { workerData: { array: [1, 2, 3, 4, 5] } });
    worker.on('message', (data) => {
      performance.mark('worker end');
      performance.measure('worker', 'worker start', 'worker end');

      res(data);
    });
    worker.on('error', (err) => console.log(err.message));
    

  });
}

function runFork() {
  return new Promise((res) => {
    performance.mark('fork start');
    const forkProcess = fork('./fork.js');
    forkProcess.send({ array: [1, 2, 3] });
    forkProcess.on('message', (msg) => {
      performance.mark('fork end');
      performance.measure('fork', 'fork start', 'fork end');
      res(msg);
    });

  });
}

const timedWorker = perf_hooks.performance.timerify(runWorker);
const timedFork = perf_hooks.performance.timerify(runFork);

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
  items.getEntries().forEach((entry) => console.log(`${entry.name} `, entry.duration));
  // observer.disconnect();
});
performanceObserver.observe({ entryTypes: ['measure'] });

const result = await Promise.all([timedWorker(), timedFork()]);

// console.log(result);