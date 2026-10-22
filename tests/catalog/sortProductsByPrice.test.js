const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test.each([
    ['asc', products, [3, 6, 5, 4, 2, 1]],
    [undefined, products, [3, 6, 5, 4, 2, 1]],
    [
      'asc',
      [
        { id: 1, price: 49900 },
        { id: 3, price: 18900 },
        { id: 4, price: 27900 },
      ],
      [3, 4, 1],
    ],
    ['desc', products, [1, 2, 4, 5, 6, 3]],
    [
      'desc',
      [
        { id: 3, price: 18900 },
        { id: 1, price: 49900 },
        { id: 4, price: 27900 },
      ],
      [1, 4, 3],
    ],
    [
      'desc',
      [
        { id: 5, price: 24900 },
        { id: 2, price: 35900 },
        { id: 6, price: 21900 },
      ],
      [2, 5, 6],
    ],
  ])(
    'сортирует товары в направлении',
    (direction, catalog, expectedIds) => {
      const result = direction
        ? sortProductsByPrice(catalog, direction)
        : sortProductsByPrice(catalog);

      expect(result.map((product) => product.id)).toEqual(expectedIds);
    }
  );

  test.each(['asc', 'desc'])(
    'направление не изменяет исходный массив',
    (direction) => {
      const catalog = [
        { id: 1, price: 49900 },
        { id: 3, price: 18900 },
        { id: 4, price: 27900 },
      ];
      const originalIds = catalog.map((product) => product.id);

      sortProductsByPrice(catalog, direction);

      expect(catalog.map((product) => product.id)).toEqual(originalIds);
    }
  );

  test('направление по умолчанию не изменяет исходный массив всех товаров', () => {
    const originalIds = products.map((product) => product.id);

    sortProductsByPrice(products);

    expect(products.map((product) => product.id)).toEqual(originalIds);
  });
});