{
    'use strict';

    const select = {
        templateOf: {
            bookProduct: '#template-book',
        },
        containerOf: {
            book: '.books-list',
            bookImage: '.book__image',
        },
    };

    const templates = {
        bookProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
    };

    function render(){
        for(let data of dataSource.books){
            const generatedHTML = templates.bookProduct(data);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            const bookContainer = document.querySelector(select.containerOf.book);
            bookContainer.appendChild(generatedDOM);
        }
    }

    const favoriteBooks = [];

    function initActions(){

        const clickedBook = document.querySelectorAll(select.containerOf.bookImage);
        for(let clicked of clickedBook){
            clicked.addEventListener('dblclick', function(event){
                event.preventDefault();
                clicked.classList.add('favorite');
                const attr = clicked.getAttribute('data-id');
                favoriteBooks.push(attr);
            });
        }
    }
    render();
    initActions();
}