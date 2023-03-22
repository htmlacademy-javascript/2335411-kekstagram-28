import {createArrayPhotos} from './moks.js';
import {drawThumbnails} from './thumbnails.js';


const drawArrayThumbnails = drawThumbnails(createArrayPhotos());
drawArrayThumbnails();
