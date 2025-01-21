import { updateOutputOptions, handleConversion } from './controllers/converterController.js';

document.addEventListener('DOMContentLoaded', () => {
    const inputType = document.getElementById('inputType');
    const conversionForm = document.getElementById('conversion-form');

    inputType.addEventListener('change', () => {
        const selectedType = inputType.value;
        updateOutputOptions(selectedType);
    });

    conversionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleConversion();
    });
});
