const { codewordSet, getNewCodeword, generateNewCodeword } = require('../codewordSet');


describe('Test uniqueness of codeword generating', () => {

  test('add new unique codeword', () => {
    expect(codewordSet.size).toBe(0);
    let codeword = getNewCodeword();
    expect(codewordSet.has(codeword)).toBe(true);

    expect(codewordSet.size).toBe(1);
    codeword = getNewCodeword();
    expect(codewordSet.size).toBe(2);

    expect(codewordSet.has(codeword)).toBe(true);
  })

  test('check uniqueness', () => {
    for (let i = 0; i < 40000; ++i) {
      codewordSet.add(getNewCodeword());
    }
    expect(codewordSet.size).toBe(40002);
  })


})
