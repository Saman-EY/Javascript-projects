let products = [
    {
        id: 1,
        title: 'React.js',
        category: 'frontend',
        createdAt: '2021-10-31T15:02:00.411Z'
    },
    {
        id: 2,
        title: 'Node.js',
        category: 'backend',
        createdAt: '2021-10-31T15:03:23.556Z'
    },
    {
        id: 3,
        title: 'Vue.js',
        category: 'frontend',
        createdAt: '2021-11-01T10:47:26.889Z'
    }
];

let categories = [
    {
        id: 1,
        title: 'frontend',
        description: 'frontend of applications',
        createdAt: '2021-11-01T10:47:26.889Z'
    },
    {
        id: 2,
        title: 'backend',
        description: 'the backend of applications',
        createdAt: '2021-10-01T10:47:26.889Z'
    }
];

export default class Storage {
    static getAllCategories() {
        let savedCategories =
            JSON.parse(localStorage.getItem('category')) || [];

        let sortedCategories = savedCategories.sort((a, b) => {
            return a.createdAt > b.createdAt ? -1 : 1;
        });
        return sortedCategories;
    }

    static saveCategory(categoryToSave) {
        let savedCategories = Storage.getAllCategories();

        let existedItem = savedCategories.find(
            (c) => c.id === categoryToSave.id
        );

        if (existedItem) {
            existedItem.id = categoryToSave.id;
            existedItem.title = categoryToSave.title;
        } else {
            categoryToSave.id = new Date().getTime();
            categoryToSave.createdAt = new Date().toISOString();
            savedCategories.push(categoryToSave);
        }
        localStorage.setItem('category', JSON.stringify(savedCategories));
    }

    static getAllProducts(sort = 'newest') {
        let savedProducts = JSON.parse(localStorage.getItem('products')) || [];

        return savedProducts.sort((a, b) => {
            if (sort === 'newest') {
                return a.createdAt > b.createdAt ? -1 : 1;
            } else if (sort === 'oldest') {
                return a.createdAt > b.createdAt ? 1 : -1;
            }
        });
    }

    static savedProducts(productToSave) {
        let savedProducts = Storage.getAllProducts();

        let existedItem = savedProducts.find((c) => c.id === productToSave.id);

        if (existedItem) {
            existedItem.title = productToSave.title;
            existedItem.quantity = productToSave.quantity;
            existedItem.category = productToSave.category;
        } else {
            productToSave.id = new Date().getTime();
            productToSave.createdAt = new Date().toISOString();
            savedProducts.push(productToSave);
        }
        localStorage.setItem('products', JSON.stringify(savedProducts));
    }

    static deleteProdcut(id) {
        let savedProducts = Storage.getAllProducts();

        let filteredProducts = savedProducts.filter((p) => p.id != id);
        localStorage.setItem('products', JSON.stringify(filteredProducts));
    }
}
