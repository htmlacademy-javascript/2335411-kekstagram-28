const SCALE_STEP = 25;
const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const scaleImg = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const reduceScale = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if(newValue < SCALE_MIN_VALUE) {
    newValue = SCALE_MIN_VALUE;
  }
  scaleImg(newValue);
};

const increaseScale = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if(newValue > SCALE_MAX_VALUE) {
    newValue = SCALE_MAX_VALUE;
  }
  scaleImg(newValue);
};

const onElementAddScale = () => {
  scaleSmaller.addEventListener('click', reduceScale);
  scaleBigger.addEventListener('click', increaseScale);
};

const onElementResetScale = () => {
  scaleImg(parseInt(scaleValue.getAttribute('value'), 10));
  scaleSmaller.removeEventListener('click', reduceScale);
  scaleBigger.removeEventListener('click', increaseScale);
};

export {onElementAddScale, onElementResetScale};
