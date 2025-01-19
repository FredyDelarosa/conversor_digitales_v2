// Función para convertir palabras numéricas a números decimales
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

// Validar si el valor ingresado es una palabra numérica
const isWordNumeric = (value) => /^[a-záéíóúüñ]+$/i.test(value);

// Obtener el resultado de conversión
export const getConversionResult = (inputType, outputType, inputValue) => {
    const conversions = {
        binary: binaryToOthers,
        decimal: decimalToOthers,
        hexadecimal: hexToOthers,
        octal: octalToOthers,
        ascii: asciiToOthers
    };

    if (isWordNumeric(inputValue)) {
        inputValue = wordToDecimal(inputValue); // Convertir palabra numérica a decimal
        inputType = 'decimal';
    }

    if (!conversions[inputType]) {
        throw new Error('Tipo de entrada no válido.');
    }

    return conversions[inputType](inputValue, outputType);
};

// Conversiones desde Binary
const binaryToOthers = (binary, target) => {
    const decimal = parseInt(binary, 2);
    if (isNaN(decimal)) throw new Error('El valor binario no es válido.');
    if (target === 'decimal') return decimal.toString(); // Agregado
    return convertFromDecimal(decimal, target);
};

// Conversiones desde Decimal
const decimalToOthers = (decimal, target) => {
    decimal = parseInt(decimal, 10);
    if (isNaN(decimal)) throw new Error('El valor decimal no es válido.');
    return convertFromDecimal(decimal, target);
};

// Conversiones desde Hexadecimal
const hexToOthers = (hex, target) => {
    const decimal = parseInt(hex, 16);
    if (isNaN(decimal)) throw new Error('El valor hexadecimal no es válido.');
    if (target === 'decimal') return decimal.toString(); // Agregado
    return convertFromDecimal(decimal, target);
};

// Conversiones desde Octal
const octalToOthers = (octal, target) => {
    const decimal = parseInt(octal, 8);
    if (isNaN(decimal)) throw new Error('El valor octal no es válido.');
    if (target === 'decimal') return decimal.toString(); // Agregado
    return convertFromDecimal(decimal, target);
};

// Conversiones desde ASCII
const asciiToOthers = (ascii, target) => {
    if (ascii.length > 1) throw new Error('El valor ASCII debe ser un único carácter.');
    const decimal = ascii.charCodeAt(0);
    if (target === 'decimal') return decimal.toString(); // Agregado
    return convertFromDecimal(decimal, target); // Maneja binario, hexadecimal y octal
};

// Convertir desde Decimal a otros sistemas
const convertFromDecimal = (decimal, target) => {
    switch (target) {
        case 'binary': return decimal.toString(2);
        case 'hexadecimal': return decimal.toString(16).toUpperCase();
        case 'octal': return decimal.toString(8);
        case 'ascii': return String.fromCharCode(decimal);
        default: throw new Error('Tipo de salida no válido.');
    }
};
