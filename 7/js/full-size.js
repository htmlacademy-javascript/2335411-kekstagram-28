import { isEscapeKey } from './util.js';
import { renderPhoto, photosContainer } from './thumbnails.js';

const COMMENTS_BLOCK = 5;

const bigPicturePreview = document.querySelector('.big-picture__preview');
const commentsContainer = bigPicturePreview.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');

let commentsLoaded = 0;
let comments = [];

const renderComment = (({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
});

const renderComments = () => {
  commentsLoaded += COMMENTS_BLOCK;

  if (commentsLoaded >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
    commentsLoaded = comments.length;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsLoaded; i++) {
    const commentElement = renderComment(comments[i]);
    commentsFragment.append(commentElement);
  }
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
  commentsCount.innerHTML = `${commentsLoaded} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const renderBigPicture = ({ url, description, likes }) => {
  bigPicturePreview.querySelector('.big-picture__img img').src = url;
  bigPicturePreview.querySelector('.big-picture__img img').alt = description;
  bigPicturePreview.querySelector('.likes-count').textContent = likes;
  bigPicturePreview.querySelector('.social__caption').textContent = description;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (element) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderBigPicture(element);
  comments = element.comments;
  commentsLoaded = 0;
  renderComments();

  document.addEventListener('keydown', onDocumentKeydown);
};

photosContainer.addEventListener('click', (evt) => {
  const targetThumbnail = evt.target.closest('.picture');
  if (targetThumbnail) {
    evt.preventDefault();
    const targetThumbnailId = renderPhoto.find((item) => item.id === Number(targetThumbnail.dataset.id));
    openBigPicture(targetThumbnailId);
  }
});

const onCommentsLoaderButtonClick = () => renderComments();
commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureClose.addEventListener('click', closeBigPicture);
