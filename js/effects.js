const EFFECTS = {
  none: {
    name: 'none',
    min: 0,
    max: 0,
    step: 0,
    unit: '',
  },
  chrome : {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin :{
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const imgUpload = document.querySelector('.img-upload');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
const effectLevelSliderContainer = imgUpload.querySelector('.img-upload__effect-level');
const effectLevelSlider = imgUpload.querySelector('.effect-level__slider');
const effectLevelValue = imgUpload.querySelector('.effect-level__value');
const effectsList = imgUpload.querySelector('.effects__list');

let currentEffect = EFFECTS.none;

const showSlider = () => {
  effectLevelSliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  effectLevelSliderContainer.classList.add('hidden');
};

const isDefault = () => currentEffect === EFFECTS.none;

const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.min,
    step: currentEffect.step
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectsContainerChange = (evt) => {
  currentEffect = EFFECTS[evt.target.value];

  if (currentEffect) {
    imgUploadPreview.classname = `effects__preview--${currentEffect.name}`;
    updateSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();

  if (isDefault()) {
    imgUploadPreview.style.filter = EFFECTS.none.name;
  } else {
    imgUploadPreview.style.filter = `${currentEffect.name}(${sliderValue}${currentEffect.unit})`;
  }

  effectLevelValue.value = sliderValue;
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: currentEffect.min,
    max: currentEffect.max,
  },
  start: currentEffect.min,
  step: currentEffect.step,
  connect: 'lower',
});

hideSlider();

const onElementAddFilters = () => {
  effectsList.addEventListener('change', onEffectsContainerChange);
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
};

const onElementRemoveFilters = () => {
  currentEffect = EFFECTS.none;
  updateSlider();

  effectsList.removeEventListener('change', onEffectsContainerChange);
  effectLevelSlider.noUiSlider.off('update', onSliderUpdate);
};


export {onElementAddFilters, onElementRemoveFilters};
