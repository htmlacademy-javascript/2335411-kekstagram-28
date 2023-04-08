import {HASHTAG_ERROR_MESSAGE, HASHTAG_MAX_COUNT,HASHTAG_REZ_CHECK} from './constants.js';
import {isEscapeKey} from './util.js';
import { onElementAddScale, onElementResetScale } from './scale.js';
import { onElementAddFilters, onElementRemoveFilters } from './effects.js';
import { sendData } from './api.js';

const formModal = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');

const SubmitButtonText = {
  IDLE: 'Данные опубликованы',
  SENDING: 'Сохраняю...',
  POSTING: 'Сохранить'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

const handleDocumentKeydown = (evt) => {
  if (isEscapeKey && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
};

const isValidTag = (tag) => HASHTAG_REZ_CHECK.test(tag);
const hasValidCount = (tags) => tags.length <= HASHTAG_MAX_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  HASHTAG_ERROR_MESSAGE
);

const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', true);
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.removeAttribute('disabled');
  submitButton.textContent = SubmitButtonText.IDLE;
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const valid = pristine.validate();

  if (valid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => unblockSubmitButton);
  }
};

function hideModal () {
  form.reset();
  pristine.reset();
  onElementResetScale();
  onElementRemoveFilters();

  formModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', handleDocumentKeydown);
  form.removeEventListener('submit', handleFormSubmit);
  uploadCancelButton.removeEventListener('click', hideModal);
}


const showModal = () => {
  onElementAddScale();
  onElementAddFilters();
  formModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', handleDocumentKeydown);
  form.addEventListener('submit', handleFormSubmit);
  uploadCancelButton.addEventListener('click', hideModal);
};

const clickOnUpload = () => {
  uploadFile.addEventListener('change', showModal);
};

export { clickOnUpload, hideModal };
