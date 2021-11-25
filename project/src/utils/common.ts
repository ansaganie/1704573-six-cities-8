const shuffleArray = <T>(array: T[]): T[] => {
  const result = array.slice();

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

const convertKeyToCamelCase = <T>(obj: T): T => {
  const result: {
    [key: string]: unknown
  } = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object') {
        result[key] = convertKeyToCamelCase(obj[key]);

        continue;
      }

      if (key.includes('_')) {
        const words = key.split('_');
        const newKey = words.reduce((acc, value, index) => {
          if (index !== 0) {
            return `${acc}${value[0].toUpperCase()}${value.slice(1)}`;
          }

          return value;
        });

        result[newKey] = obj[key];
      } else {
        result[key] = obj[key];
      }
    }
  }

  return result as unknown as T;
};

export {
  shuffleArray,
  convertKeyToCamelCase
};