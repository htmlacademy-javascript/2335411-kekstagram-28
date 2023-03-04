const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomId (min, max) {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= max) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger (min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const createdIdGenerator = () => {
  let i = 0;

  return function () {
    i += 1;
    return i;
  };
};


export {getRandomInteger, getRandomArrayElement, createRandomId, createdIdGenerator};
