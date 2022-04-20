{
    'use strict';

    const select = {
        templateOf: {
            bookProduct: '#template-book',
        },
        containerOf: {
            book: '.books-list',
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
    render();
}