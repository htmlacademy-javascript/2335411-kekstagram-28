const AVATAR_MAX_COUNT = 6;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const COMMENTS_MAX_COUNT = 10;
const URL_MAX_COUNT = 25;

const NAMES = [
  'Андрей',
  'Михаил',
  'Виктория',
  'Альберт',
  'Витя',
  'Максим',
  'Олег',
  'Женя',
];

const DESCRIPTIONS = [
  'На чиле!',
  'Рабочие будни',
  'Учебный процесс!',
  'На тренировке',
  'Всех с праздником!',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

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

const generatePhotoId = createdIdGenerator();
const generateCommentId = createRandomId(1, URL_MAX_COUNT);
const generateRandomId = createdIdGenerator();

const createComments = () => ({
  id: generateCommentId (),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_MAX_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES) ,
  name: getRandomArrayElement(NAMES)
});

const createPhotos = () => ({
  id: generateRandomId (),
  url: `photos/${generatePhotoId()}.jpg`,
  description: getRandomArrayElement (DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from({ length: getRandomInteger(0, COMMENTS_MAX_COUNT) }, createComments),
});

const createArrayPhotos = () => Array.from(
  { length: 25 },
  createPhotos
);
createArrayPhotos();

