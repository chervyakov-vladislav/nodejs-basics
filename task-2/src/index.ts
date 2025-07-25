#!/usr/bin/env node

import 'dotenv/config';
import { getWeather } from './utils/api';
import { parseArgs } from './utils/args';
import { printHelp, printWeather } from './utils/logger';

const initCLI = () => {
  const args = parseArgs();

  if (!Object.keys(args).length || args.h) {
    printHelp();
  }

  if (args.s && typeof args.s === 'string') {
    const weatherPromise = getWeather(args.s);
    printWeather(weatherPromise);
  }
};

initCLI();
