import {HASHTAG_ERROR_MESSAGE, HASHTAG_MAX_COUNT,HASHTAG_REZ_CHECK} from './constants.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('.body');
const formModal = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo : 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error',
});

uploadCancelButton.addEventListener('click', hideModal);

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
};

function hideModal () {
  form.reset();
  pristine.reset();
  formModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const isValidHashtag = (hashtag) => HASHTAG_REZ_CHECK.test(hashtag);
const hasValidCount = (hashtags) => hashtags.length <= HASHTAG_MAX_COUNT;

const hasUniqueHashtag = (hashtags) => {
  const lowerCaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const validateHashtags = (value) => {
  const hashtags = value
    .trim()
    .split(' ')
    .filter((hashtag) => hashtag.trim().length);
  return hasValidCount(hashtags) && hasUniqueHashtag(hashtags) && hashtags.every(isValidHashtag);
};

pristine.addValidator(
  hashtagField,
  validateHashtags,
  HASHTAG_ERROR_MESSAGE,
);

const handleFormSubmit = (evt) => {
  const valid = pristine.validate();
  if(valid) {
    form.submit();
  }
  evt.preventDefault();
};

const showModal = () => {
  formModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

form.addEventListener('submit', handleFormSubmit);

const uploadButton = () => {
  uploadFile.addEventListener('change', showModal);
};

uploadButton();
