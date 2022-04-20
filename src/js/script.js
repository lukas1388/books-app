{
    'use strict';

    const select = {
        templateOf: {
            bookProduct: '#template-book',
        },
        containerOf: {
            book: '.books-list',
            bookImage: '.book__image',
            filters: '.filters',
        },
    };

    const templates = {
        bookProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
    };

    function render(){
        for(let data of dataSource.books){
            const ratingBgc = determineRatingBgc(data.rating);
            const ratingWidth = data.rating * 10;
            data.ratingBgc = ratingBgc;
            data.ratingWidth = ratingWidth;
            const generatedHTML = templates.bookProduct(data);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            const bookContainer = document.querySelector(select.containerOf.book);
            bookContainer.appendChild(generatedDOM);
        }
    }

    const favoriteBooks = [];
    const filters = [];

    function initActions(){

        const clickedWrapper = document.querySelector(select.containerOf.book);
        const filtersWrapper = document.querySelector(select.containerOf.filters);

        clickedWrapper.addEventListener('dblclick', function(event){
            event.preventDefault();
            const clicked = event.target.offsetParent;
            const attr = clicked.getAttribute('data-id');
            if(clicked.classList.contains('book__image')){
                if(!favoriteBooks.includes(attr)){
                    clicked.classList.add('favorite');
                    favoriteBooks.push(attr);
                } else {
                    const index = favoriteBooks.indexOf(attr);
                    clicked.classList.remove('favorite');
                    favoriteBooks.splice(index, 1);
                }
            }
        });

        filtersWrapper.addEventListener('click', function(event){
            const clicked = event.target;
            if(clicked.tagName == 'INPUT' && clicked.type == 'checkbox' && clicked.name == 'filter'){
                if(clicked.checked){
                    filters.push(clicked.value)
                } else {
                    const index = filters.indexOf(clicked.value);
                    filters.splice(index, 1);
                }
            }
            filterBooks();
        });
    }

    function filterBooks(){
        for(let book of dataSource.books){
            let shouldBeHidden = false;

            for(let filter of filters){
                if(book.details[filter]){
                    shouldBeHidden = true;
                    break;
                }
            }

            const bookHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');

            if(shouldBeHidden){
                bookHidden.classList.add('hidden');
            } else {
                bookHidden.classList.remove('hidden');
            }
        }
    }

    function determineRatingBgc(rating){
        if(rating < 6) return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
        if(rating > 6 && rating <= 8) return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
        if(rating > 8 && rating <=9) return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
        if(rating > 9) return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }

    render();
    initActions();
}