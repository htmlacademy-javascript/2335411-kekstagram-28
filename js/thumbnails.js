const thumbnailTemp = document.querySelector('#picture').content.querySelector('.picture');

const container = document.querySelector('.pictures');

const createThumbnail = ({ url, likes, comments }) => {
  const thumbnail = thumbnailTemp.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

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
