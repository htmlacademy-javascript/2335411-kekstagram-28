import {getFullSize} from './full-size.js';

const thumbnailTemp = document.querySelector('#picture').content.querySelector('.picture');

const container = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnail = thumbnailTemp.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = photo.url;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__img').alt = photo.description;
  thumbnail.dataset.thumbnailId = photo.id;
  thumbnail.addEventListener('click', () => getFullSize(photo));
  return thumbnail;
};

const drawThumbnails = (pictures) => {
  const element = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    element.append(thumbnail);
  });

  container.append(element);
};

export{drawThumbnails};
