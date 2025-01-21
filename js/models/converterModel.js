const wordToDecimal = (word) => {
    const numberWords = {
        cero: 0, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, 
        seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10,
        once: 11, doce: 12, trece: 13, catorce: 14, quince: 15,
        dieciséis: 16, diecisiete: 17, dieciocho: 18, diecinueve: 19,
        veinte: 20
    };

    const decimal = numberWords[word.toLowerCase()];
    if (decimal === undefined) throw new Error('La palabra numérica no es válida.');
    return decimal;
};

const isWordNumeric = (value) => {
    const numberWords = [
        'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 
        'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 
        'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 
        'veinte'
    ];
    return numberWords.includes(value.toLowerCase());
};

const isValidHex = (value) => /^[0-9A-Fa-f]+$/.test(value);
const isValidBinary = (value) => /^[01]+$/.test(value);
const isValidOctal = (value) => /^[0-7]+$/.test(value);
const isValidAscii = (value) => typeof value === 'string' && value.length === 1;

export const getConversionResult = (inputType, outputType, inputValue) => {
    const conversions = {
        binary: binaryToOthers,
        decimal: decimalToOthers,
        hexadecimal: hexToOthers,
        octal: octalToOthers,
        ascii: asciiToOthers
    };

    if (inputType === 'hexadecimal' && !isValidHex(inputValue)) {
        throw new Error('El valor hexadecimal no es válido.');
    }
    if (inputType === 'binary' && !isValidBinary(inputValue)) {
        throw new Error('El valor binario no es válido.');
    }
    if (inputType === 'octal' && !isValidOctal(inputValue)) {
        throw new Error('El valor octal no es válido.');
    }
    if (inputType === 'ascii' && !isValidAscii(inputValue)) {
        throw new Error('El valor ASCII no es válido.');
    }
    if (isWordNumeric(inputValue)) {
        inputValue = wordToDecimal(inputValue);
        inputType = 'decimal';
    }

    if (!conversions[inputType]) {
        throw new Error('Tipo de entrada no válido.');
    }

    return conversions[inputType](inputValue, outputType);
};

const binaryToOthers = (binary, target) => {
    const decimal = parseInt(binary, 2);
    if (isNaN(decimal)) throw new Error('El valor binario no es válido.');
    if (target === 'decimal') return decimal.toString(); 
    return convertFromDecimal(decimal, target);
};

const decimalToOthers = (decimal, target) => {
    decimal = parseInt(decimal, 10);
    if (isNaN(decimal)) throw new Error('El valor decimal no es válido.');
    return convertFromDecimal(decimal, target);
};

const hexToOthers = (hex, target) => {
    const decimal = parseInt(hex, 16);
    if (isNaN(decimal)) throw new Error('El valor hexadecimal no es válido.');
    if (target === 'decimal') return decimal.toString();
    return convertFromDecimal(decimal, target);
};

const octalToOthers = (octal, target) => {
    const decimal = parseInt(octal, 8);
    if (isNaN(decimal)) throw new Error('El valor octal no es válido.');
    if (target === 'decimal') return decimal.toString(); 
    return convertFromDecimal(decimal, target);
};

const asciiToOthers = (ascii, target) => {
    if (ascii.length > 1) throw new Error('El valor ASCII debe ser un único carácter.');
    const decimal = ascii.charCodeAt(0);
    if (target === 'decimal') return decimal.toString(); 
    return convertFromDecimal(decimal, target); 
};

const convertFromDecimal = (decimal, target) => {
    switch (target) {
        case 'binary': return decimal.toString(2);
        case 'hexadecimal': return decimal.toString(16).toUpperCase();
        case 'octal': return decimal.toString(8);
        case 'ascii': return String.fromCharCode(decimal);
        default: throw new Error('Tipo de salida no válido.');
    }
};
