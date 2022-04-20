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

        const clickedWrapper = document.querySelector(select.containerOf.book);
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
    }
    render();
    initActions();
}