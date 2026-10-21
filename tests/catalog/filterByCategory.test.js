const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

describe('filterByCategory', () => {
  const cases = [
    ['all', [1, 2, 3, 4, 5, 6]],
    [undefined, [1, 2, 3, 4, 5, 6]],
    ['', [1, 2, 3, 4, 5, 6]],
    ['electronics', [1, 2]],
    ['books', [3, 6]],
    ['home', [4, 5]],
    ['clothes', []],
    ['toys', []],
    ['sports', []],
  ];

  test.each(cases)(
    'выводим по ID',
    (category, expectedIds) => {
      const result = filterByCategory(products, category);
      const actualIds = result.map(({ id }) => id);

      expect(actualIds).toEqual(expectedIds);
    }
  );
});