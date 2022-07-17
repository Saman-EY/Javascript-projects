import Storage from './Storage.js';

let productTitle = document.querySelector('#productTitle');
let productQty = document.querySelector('#productQty');
let categoryList = document.querySelector('#categoryList');
let AddProductBtn = document.querySelector('#AddProductBtn');
let productContainer = document.querySelector('#productContainer');
let searchInput = document.querySelector('#searchInput');
let selectedSort = document.querySelector('#date-sort');

class ProductView {
    constructor() {
        AddProductBtn.addEventListener('click', (e) => this.addNewProduct(e));
        searchInput.addEventListener('input', (e) => this.searchProducts(e));
        selectedSort.addEventListener('change', (e) => this.changeSort(e));
        this.products = [];
    }

    addNewProduct(e) {
        e.preventDefault();
        let title = productTitle.value;
        let qty = productQty.value;
        let category = categoryList.value;
        if (!title || !qty || !category) return;
        Storage.savedProducts({ title, qty, category });
        productTitle.value = '';
        productQty.value = '';
        categoryList.value = "";
        this.products = Storage.getAllProducts();
        this.createProductList(this.products);
    }

    setApp() {
        this.products = Storage.getAllProducts();
    }

    createProductList(products) {
        let result = '';
        products.forEach((item) => {
            let selectedCategory = Storage.getAllCategories().find(
                (c) => c.id == item.category
            );
            result += `<div class="flex justify-between items-center">
                <span class="textColor">${item.title}</span>
                <div class="flex items-center gap-4">
                     <span class="text-slate-300">${new Date(
                         item.createdAt
                     ).toLocaleDateString('fa')}</span>
                     <span class="rounded-full  text-sm px-2 py-1 text-slate-400 border-2 border-slate-500">${
                         selectedCategory.title
                     }</span>
                     <span class="flex justify-center items-center w-8 h-8 rounded-full bg-slate-400 text-slate-200 border border-slate-200">${
                         item.qty
                     }</span>
                     <button data-id=${
                         item.id
                     } class="deleteBtn text-red-400">delete</button>
                 </div>
            </div>`;
        });
        productContainer.innerHTML = result;

        let deleteBtn = [...document.querySelectorAll('.deleteBtn')];
        deleteBtn.forEach((i) => {
            i.addEventListener('click', (e) => this.deleteProduct(e));
        });
    }

    searchProducts(e) {
        let value = e.target.value.trim().toLowerCase();
        let filteredProducts = this.products.filter((p) =>
            p.title.toLowerCase().includes(value)
        );
        // console.log(filteredProducts);
        this.createProductList(filteredProducts);
    }

    changeSort(e) {
        this.products = Storage.getAllProducts(e.target.value);
        this.createProductList(this.products);
    }

    deleteProduct(e) {
        let productid = e.target.dataset.id;
        Storage.deleteProdcut(productid);
        this.products = Storage.getAllProducts();
        this.createProductList(this.products);
    }
}

export default new ProductView();
