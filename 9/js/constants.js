const AVATAR_MAX_COUNT = 6;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const COMMENTS_MAX_COUNT = 10;
const URL_MAX_COUNT = 25;
const HASHTAG_REZ_CHECK = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_ERROR_MESSAGE = 'Ошибка! Проверьте правильность введенных данных';
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
export {AVATAR_MAX_COUNT, LIKES_MIN_COUNT, LIKES_MAX_COUNT, COMMENTS_MAX_COUNT, URL_MAX_COUNT, NAMES, DESCRIPTIONS, MESSAGES, HASHTAG_ERROR_MESSAGE, HASHTAG_MAX_COUNT, HASHTAG_REZ_CHECK};
