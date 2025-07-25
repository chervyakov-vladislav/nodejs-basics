import { A } from './fileA';
import http from 'node:http';

console.log('adsasd');
console.log(A);
console.log('');

const server = http.createServer((_req, _res) => {
  return;
});

server.listen(3000, () => {
  console.log('server listen 3000');
});

const _a = 3;
