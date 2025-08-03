export const insertSoftHyphens = (text) => {
    return text.split(' ').map(word => {
        if (word.length > 10) {
        return word
            .split('')
            .join('\u00AD'); // soft hyphen символ
        }
        return word;
    }).join(' ');
};

//Олександр