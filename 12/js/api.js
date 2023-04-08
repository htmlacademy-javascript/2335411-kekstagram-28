import { drawThumbnails } from './thumbnails.js';
import { handleGetFail, showSuccessMessage, showErrorMessage } from './message.js';


const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText, onSuccess, onFail, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail(errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA, drawThumbnails, handleGetFail);

const sendData = (body) =>
  load(Route.SEND_DATA, ErrorText.SEND_DATA, showSuccessMessage, showErrorMessage, Method.POST, body);

export { getData, sendData };
