import { createArrayPhotos } from './moks.js';

const thumbnailTemp = document.querySelector('#picture').content.querySelector('.picture');
const photosContainer = document.querySelector('.pictures');

const createThumbnail = (({url, likes, comments, description, id}) => {
  const thumbnail = thumbnailTemp.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.dataset.id = id;

  return thumbnail;
});

const drawThumbnails = (pictures) => {
  const element = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    element.append(thumbnail);
  });

  photosContainer.append(element);
};

const renderPhoto = createArrayPhotos();
drawThumbnails(renderPhoto);

export{renderPhoto, photosContainer, drawThumbnails};
