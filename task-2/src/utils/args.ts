export const parseArgs = (args = process.argv.slice(2)) => {
  return args.reduce((result: Record<string, string | boolean>, value, index, array) => {
    if (value.charAt(0) === '-' && array[index + 1] && array[index + 1].charAt(0) !== '-') {
      result[value.slice(1)] = array[index + 1];

      return result;
    }

    if (value.charAt(0) === '-') {
      result[value.slice(1)] = true;
    }

    return result;
  }, {});
};
