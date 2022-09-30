export const calcRate = (str: string, rates: Record<string, number>) => {
  const quotes = str.match(/"([^"]+)"/g);
  if (!quotes) return null;

  const fromCur = {
    name: quotes[0].match(/[a-zA-z_]+/g),
    value: parseFloat(quotes[0].slice(1, quotes[0].length)),
  };

  const toCur = quotes[1].match(/[a-zA-z_]+/g);
  
  if (
    !fromCur.name ||
    !toCur ||
    !rates[fromCur.name[0].toUpperCase()] ||
    !rates[toCur[0].toUpperCase()]
  ) {
    return null;
  }

  const res =
    fromCur.value * (rates[toCur[0].toUpperCase()] / rates[fromCur.name[0].toUpperCase()]);

  return { cur: toCur[0].toUpperCase(), value: res };
};