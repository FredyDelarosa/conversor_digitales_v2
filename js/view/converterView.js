export const populateOutputOptions = (options) => {
    const outputType = document.getElementById('outputType');
    outputType.innerHTML = '<option value="" disabled selected>-- Seleccionar --</option>';
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = capitalize(option);
        outputType.appendChild(opt);
    });
};

export const updateConversionResult = (result) => {
    const resultContainer = document.getElementById('conversionResult');
    resultContainer.textContent = `Resultado: ${result}`;
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
