const codewordSet = new Set();

function generateNewCodeword(length = 3) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const getNewCodeword = () => {
    let newCodeword = generateNewCodeword();
    while (codewordSet.has(newCodeword)) {
        newCodeword = generateNewCodeword();
    };
    codewordSet.add(newCodeword);

    console.log(codewordSet);
    return newCodeword;
}

module.exports = getNewCodeword;