import https from 'node:https';
import { printError } from './logger';

export const getWeather = async (city: string) =>
  new Promise((resolve) => {
    const API_KEY = process.env.API_KEY || '123';
    const url = new URL(process.env.BASE_URL || '');
    url.searchParams.set('q', city);
    url.searchParams.set('appid', API_KEY);
    url.searchParams.set('units', 'metric');
    url.searchParams.set('lang', 'ru');

    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (err) {
          if (err instanceof Error) {
            printError(err.message);
          }
        }
      });
    });

    req.on('error', (error) => {
      printError(error.message);
    });

    req.end();
  });
