    export default class FormValidator {
        constructor(params, formElement) {
            this._params = params;
            this._formElement = formElement;
        }

        _inputListener() {
            const inputs = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
            const button = this._formElement.querySelector(this._params.submitButtonSelector);
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    this._checkInputValidity(input);
                    this._toggleButtonState(inputs, button);
                });
            });
        }

        enableValidation() {
            this._inputListener();
            this._formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
        };

        // Форма валидна?
        _checkInputValidity(input) {
            if (!input.validity.valid) {
                this._showInputError(input);
            } else {
                this._hideInputError(input);
            }
        }

        // Показать ошибки
        _showInputError(input) {
            const errorElement = this._formElement.querySelector(`#${input.id}--error`);
            input.classList.add(this._params.inputErrorClass);
            errorElement.textContent = input.validationMessage;
            errorElement.classList.add(this._params.errorClass);
        }

        // Убрать ошибки
        _hideInputError(input) {
            const errorElement = this._formElement.querySelector(`#${input.id}--error`);
            input.classList.remove(this._params.inputErrorClass);
            errorElement.classList.remove(this._params.errorClass);
            errorElement.textContent = '';
        }

        // Скрыть ошибки при повторном открытии попапа и деактивация кнопки
        resetFormState(inputs, button) {
            const inputList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
            inputList.forEach(input => {
                this._hideInputError(input);
            });
            const btn = this._formElement.querySelector(this._params.submitButtonSelector);
            btn.classList.add(this._params.inactiveButtonClass);
            btn.setAttribute("disabled", true);
        }

        // Ищем невалидные поля
        _hasInvalidInput(inputs) {
            return inputs.some((input) => {
                return !input.validity.valid;
            });
        }

        // Неактивная кнопка
        _toggleButtonState(inputs, button) {
            if (this._hasInvalidInput(inputs)) {
                button.classList.add(this._params.inactiveButtonClass);
                button.disabled = true;
            } else {
                button.classList.remove(this._params.inactiveButtonClass);
                button.disabled = false;
            }
        }
    }