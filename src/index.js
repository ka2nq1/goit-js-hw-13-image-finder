import '../src/css/styles.css';
import addToMarkup from '../src/js/addToMarkup.js';
import fetchImages from '../src/js/apiService.js';
import refs  from '../src/js/refs.js';


const API_KEY = '19533691-71e0a15ad94cf623e7f323fff';

let inputValue; 
let page = 1;
refs.btnLoad.style.display = "none";

const getFormSubmit = (event) => {
    event.preventDefault();
    refs.galleryList.innerHTML = '';
    inputValue = event.target.elements.query.value;
    if (inputValue.length > 1) {
        fetchImages(inputValue, page, API_KEY)
            .then(images =>{
                console.log(images)
                addToMarkup(images)
                refs.btnLoad.style.display = "block";
            })
        .catch(err => console.log(err))
    }
   
}

refs.form.addEventListener('submit', getFormSubmit)

const loadMoreImages = () => {
    page += 1;
    fetchImages(inputValue, page, API_KEY)
    .then(images => {
            console.log(images)
            addToMarkup(images)
            window.scrollTo({
                top: document.documentElement.offsetHeight - 2500,
                behavior: 'smooth'
            });
        })
        .catch(err => console.log(err))
}

refs.btnLoad.addEventListener('click', loadMoreImages)