import {createPhotos} from './moks.js';

const createArrayPhotos = () => Array.from(
  { length: 25 },
  createPhotos
);
createArrayPhotos();
