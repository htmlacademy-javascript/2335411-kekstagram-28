const bigPicture = document.querySelector('.big-picture');
const commentList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');

const renderComments = (comments) => {
  commentList.innerHTML = '';
  comments.forEach(({avatar, message}) => {
    const userComment = socialComment.cloneNode(true);
    userComment.querySelector('.social__picture').src = avatar;
    userComment.querySelector('.social__text').textContent = message;
    commentList.append(userComment);
  });
};

const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.social__comments-loader');

const createBigPicture = ({url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
};

const closePictureButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

function closeUserModal () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
}

const onEscapeKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUserModal();
  }
};

closePictureButton.addEventListener('click', () => closeUserModal());

const getFullSize = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onEscapeKeydown);
  createBigPicture(data);
  renderComments(data.comments);
};

export {getFullSize};
