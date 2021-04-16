
// Показать ошибки
const showInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}--error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(params.errorClass);
};
// Убрать ошибки
const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}--error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};

// Форма валидна?
const checkInputValidity = (formElement, inputElement, params) => {
    if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

// Ищем невалидные поля
const hasInvalidInput = (inputsList) => {
  return inputsList.some((inputElement) => {
  return !inputElement.validity.valid;
  })
};

// Неактивная кнопка
const toggleButtonState = (inputsList, buttonElement, params) => {
    if (hasInvalidInput(inputsList)) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// Обработчики
const setEventListeners = (formElement, params) => {
  const inputsList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  toggleButtonState(inputsList, buttonElement, params);
  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(inputsList, buttonElement, params);
    });
  });
};

// Валидация
const enableValidation = (params) => {
  const formsList = Array.from(document.querySelectorAll(params.formSelector));
  formsList.forEach(function(formElement) {
  formElement.addEventListener('submit', preventFormSubmit);
  setEventListeners(formElement, params);
  });
};

//enableValidation(params);

enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error_visible',
});

function preventFormSubmit (event) {
  event.preventDefault();
}

