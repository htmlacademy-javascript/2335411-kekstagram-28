import { URL_MAX_COUNT } from './constants.js';
import { createdIdGenerator, createRandomId } from './util.js';

const generatePhotoId = createdIdGenerator();
const generateCommentId = createRandomId(1, URL_MAX_COUNT);
const generateRandomId = createdIdGenerator();

export {generateCommentId, generatePhotoId, generateRandomId};

