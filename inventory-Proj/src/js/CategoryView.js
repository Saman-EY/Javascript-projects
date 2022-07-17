import Storage from './Storage.js';

let categoryTitle = document.querySelector('#category-title');
let categoryDescription = document.querySelector('#category-des');
let AddCategoryBtn = document.querySelector('#AddCategoryBtn');
let categoryList = document.querySelector('#categoryList');

class CategoryView {
    constructor() {
        AddCategoryBtn.addEventListener('click', (e) => this.addNewCategory(e));
        this.categories = [];
    }

    addNewCategory(e) {
        e.preventDefault();
        let title = categoryTitle.value;
        let description = categoryDescription.value;
        if (!title || !description) {
            return;
        }
        Storage.saveCategory({ title, description });
        categoryTitle.value = '';
        categoryDescription.value = '';
        this.categories = Storage.getAllCategories();
        this.CreateCategoryList();
    }

    setApp() {
        this.categories = Storage.getAllCategories();
    }

    CreateCategoryList() {
        let result = `<option value="" class="text-slate-100 bg-slate-900 font-extrabold" disabled selected hidden >select a category</option>`;
        this.categories.forEach((element) => {
            result += `<option value="${element.id}" class="text-slate-300 bg-slate-900">${element.title}</option>`;
        });
        categoryList.innerHTML = result;
    }
}

export default new CategoryView();
