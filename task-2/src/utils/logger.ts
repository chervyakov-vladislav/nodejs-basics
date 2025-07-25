import { color, icon } from './constants';

export const printError = (error: string) => {
  console.error(`${color.red}${icon.error} ERROR:${color.default} ${error}`);
};

export const printSuccess = (success: string) => {
  console.log(`${color.green}${icon.success} SUCCESS:${color.default} ${success}`);
};

export const printHelp = () => {
  console.log(`HELP
    Нет параметров - вывод погоды
    -s [CITY] - для установки города
    -h для вызова помощи`);
};

export const printWeather = async (dataPromise: Promise<any>) => {
  const data = await dataPromise;

  if (!data || data.cod !== 200) {
    console.error(`${color.red}${icon.error} Не удалось получить данные о погоде.${color.default}`);
    return;
  }

  const {
    name,
    sys: { country },
    weather,
    main: { temp, feels_like, humidity, pressure },
    wind: { speed },
  } = data;

  const weatherDescription = weather[0].description;
  const weatherMain = weather[0].main;

  const weatherIcons: Record<string, string> = {
    Clear: icon.sun,
    Clouds: icon.cloud,
    Rain: icon.rain,
    Drizzle: icon.umbrella,
    Thunderstorm: icon.thunder,
    Snow: icon.snow,
    Mist: icon.fog,
    Smoke: icon.fog,
    Haze: icon.fog,
    Dust: icon.fog,
    Fog: icon.fog,
    Sand: icon.fog,
    Ash: icon.fog,
    Atmosphere: icon.fog,
    Squall: icon.wind,
    Tornado: icon.wind,
  };

  const selectedIcon = weatherIcons[weatherMain] || icon.rainbow;

  console.log(`${color.green}${icon.success} Погода в ${name}, ${country}:${color.default}`);
  console.log(`  ${selectedIcon}  ${weatherDescription}`);
  console.log(`  ${icon.temp}  Температура: ${temp}°C (ощущается как ${feels_like}°C)`);
  console.log(`  ${icon.humidity} Влажность: ${humidity}%`);
  console.log(`  ${icon.wind}  Ветер: ${speed} м/с`);
  console.log(`  ${icon.pressure} Давление: ${pressure} гПа`);
};
