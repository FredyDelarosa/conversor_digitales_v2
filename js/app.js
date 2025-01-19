import { updateOutputOptions, handleConversion } from './controllers/converterController.js';

document.addEventListener('DOMContentLoaded', () => {
    const inputType = document.getElementById('inputType');
    const conversionForm = document.getElementById('conversion-form');

    // Actualizar opciones del selector de salida al cambiar el tipo de entrada
    inputType.addEventListener('change', () => {
        const selectedType = inputType.value;
        updateOutputOptions(selectedType);
    });

    // Manejar la conversión al enviar el formulario
    conversionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleConversion();
    });
});
