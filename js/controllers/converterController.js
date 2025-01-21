import { getConversionResult } from '../models/converterModel.js';
import { updateConversionResult, populateOutputOptions } from '../view/converterView.js';

export const updateOutputOptions = (inputType) => {
    const allTypes = ['binary', 'decimal', 'hexadecimal', 'octal', 'ascii'];
    const outputOptions = allTypes.filter(type => type !== inputType);
    populateOutputOptions(outputOptions);
};

export const handleConversion = () => {
    const inputType = document.getElementById('inputType').value;
    const outputType = document.getElementById('outputType').value;
    const inputValue = document.getElementById('inputValue').value;

    if (!inputType || !outputType || !inputValue) {
        updateConversionResult('Error: Llena todos los campos.');
        return;
    }
 
    try {
        const result = getConversionResult(inputType, outputType, inputValue);
        updateConversionResult(result);
    } catch (error) {
        updateConversionResult(`Error: ${error.message}`);
    }
};
