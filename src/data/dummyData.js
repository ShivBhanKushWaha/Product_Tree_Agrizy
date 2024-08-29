export const initialData = {
    categories: [
      {
        id: 1,
        name: 'Electronics',
        subcategories: [
          {
            id: 1,
            name: 'Mobile Phones',
            products: [
              { id: 1, name: 'iPhone 12' },
              { id: 2, name: 'Samsung Galaxy S21' },
            ],
          },
          {
            id: 2,
            name: 'Laptops',
            products: [
              { id: 3, name: 'MacBook Pro' },
              { id: 4, name: 'Dell XPS 13' },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'Furniture',
        subcategories: [
          {
            id: 3,
            name: 'Chairs',
            products: [
              { id: 5, name: 'Office Chair' },
              { id: 6, name: 'Gaming Chair' },
            ],
          },
          {
            id: 4,
            name: 'Tables',
            products: [
              { id: 7, name: 'Dining Table' },
              { id: 8, name: 'Coffee Table' },
            ],
          },
        ],
      },
    ],
  };
