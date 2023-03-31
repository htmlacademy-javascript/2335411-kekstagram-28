import { AVATAR_MAX_COUNT, LIKES_MIN_COUNT, LIKES_MAX_COUNT, COMMENTS_MAX_COUNT, NAMES, DESCRIPTIONS, MESSAGES, URL_MAX_COUNT } from './constants.js';
import { getRandomInteger, getRandomArrayElement, createdIdGenerator,createRandomId } from './util.js';


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
  { length: URL_MAX_COUNT },
  createPhotos
);

export {generateCommentId, generatePhotoId, generateRandomId, createPhotos, createArrayPhotos};
