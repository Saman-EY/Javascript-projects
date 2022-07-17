import CategoryView from './CategoryView.js';
import Productview from "./ProductView.js"



document.addEventListener('DOMContentLoaded', () => {
    CategoryView.setApp();
    Productview.setApp();
    CategoryView.CreateCategoryList();
    Productview.createProductList(Productview.products);
});
