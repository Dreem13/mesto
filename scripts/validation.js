    export class FormValidator {
        constructor(params, formElement) {
            this.params = params;
            this.formElement = formElement;
        }

        _inputListener() {
            const inputs = Array.from(this.formElement.querySelectorAll(this.params.inputSelector));
            const button = this.formElement.querySelector(this.params.submitButtonSelector);
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    this._checkInputValidity(input);
                    this._toggleButtonState(inputs, button);
                });
            });
        }

        enableValidation() {
            this._inputListener();
            this.formElement.addEventListener('submit', (evt) => {
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
            const errorElement = this.formElement.querySelector(`#${input.id}--error`);
            input.classList.add(this.params.inputErrorClass);
            errorElement.textContent = input.validationMessage;
            errorElement.classList.add(this.params.errorClass);
        }

        // Убрать ошибки
        _hideInputError(input) {
            const errorElement = this.formElement.querySelector(`#${input.id}--error`);
            input.classList.remove(this.params.inputErrorClass);
            errorElement.classList.remove(this.params.errorClass);
            errorElement.textContent = '';
        }

        // // Скрыть ошибки при повторном открытии попапа
        _resetFormState() {
            const inputList = Array.from(this.formElement.querySelectorAll(params.inputSelector));
            inputList.forEach(input => {
                this._hideInputError(input);
            });
            _toggleButtonState(inputs, button);
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
                button.classList.add(this.params.inactiveButtonClass);
                button.disabled = true;
            } else {
                button.classList.remove(this.params.inactiveButtonClass);
                button.disabled = false;
            }
        }

    }