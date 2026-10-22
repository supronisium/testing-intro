const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  test.each([
    ['Наушники', [1]],
    ['Чистый код', [6]],
    ['Настольная лампа', [4]],
    ['javascript', [3]],
    ['ЧЕХОЛ', [5]],
    ['наушники', [1]],
  ])('по запросу "возвращает товары с ID', (query, expectedIds) => {
    const result = searchProducts(products, query);

    expect(result.map((product) => product.id)).toEqual(expectedIds);
  });

  test.each([
    ['', [1, 2, 3, 4, 5, 6]],
    ['   ', [1, 2, 3, 4, 5, 6]],
    ['\t\n', [1, 2, 3, 4, 5, 6]],
  ])('по пустому или пробельному запросу возвращает все товары', (query, expectedIds) => {
    const result = searchProducts(products, query);

    expect(result.map((product) => product.id)).toEqual(expectedIds);
  });
});