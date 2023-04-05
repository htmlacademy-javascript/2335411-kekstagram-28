import {HASHTAG_ERROR_MESSAGE, HASHTAG_MAX_COUNT,HASHTAG_REZ_CHECK} from './constants.js';
import {isEscapeKey} from './util.js';
import { onElementAddScale, onElementResetScale } from './scale.js';
import { onElementAddFilters, onElementRemoveFilters } from './effects.js';

const formModal = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

uploadCancelButton.addEventListener('click', hideModal);

const isTextFieldInFocus = () => document.activeElement === hashtagField || document.activeElement === commentField;

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt) && !isTextFieldInFocus()) {
    evt.preventDefault();
    hideModal();
  }
};

function hideModal () {
  form.reset();
  pristine.reset();
  formModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  onElementResetScale();
  onElementRemoveFilters();
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
    .filter(Boolean);
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
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  onElementAddScale();
  onElementAddFilters();
};

form.addEventListener('submit', handleFormSubmit);

const onUploadButton = () => {
  uploadFile.addEventListener('change', showModal);
};

export {onUploadButton};
