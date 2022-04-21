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

  class BooksList {
    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.getElements();
      thisBooksList.initActions();
      thisBooksList.filterBooks();
    }

    initData(){
      const thisBooksList = this;

      thisBooksList.data = dataSource.books;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.clickedWrapper = document.querySelector(select.containerOf.book);
      thisBooksList.filtersWrapper = document.querySelector(select.containerOf.filters);
    }

    render(){
      const thisBooksList = this;

      for(let data of thisBooksList.data){
        const ratingBgc = thisBooksList.determineRatingBgc(data.rating);
        const ratingWidth = data.rating * 10;
        data.ratingBgc = ratingBgc;
        data.ratingWidth = ratingWidth;
        const generatedHTML = templates.bookProduct(data);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.containerOf.book);
        bookContainer.appendChild(generatedDOM);
      }
    }

    initActions(){
      const thisBooksList = this;

      thisBooksList.clickedWrapper.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clicked = event.target.offsetParent;
        const attr = clicked.getAttribute('data-id');
        if(clicked.classList.contains('book__image')){
          if(!thisBooksList.favoriteBooks.includes(attr)){
            clicked.classList.add('favorite');
            thisBooksList.favoriteBooks.push(attr);
          } else {
            const index = thisBooksList.favoriteBooks.indexOf(attr);
            clicked.classList.remove('favorite');
            thisBooksList.favoriteBooks.splice(index, 1);
          }
        }
      });
      
      thisBooksList.filtersWrapper.addEventListener('click', function(event){
        const clicked = event.target;
        if(clicked.tagName == 'INPUT' && clicked.type == 'checkbox' && clicked.name == 'filter'){
          if(clicked.checked){
            thisBooksList.filters.push(clicked.value);
          } else {
            const index = thisBooksList.filters.indexOf(clicked.value);
            thisBooksList.filters.splice(index, 1);
          }
        }
        thisBooksList.filterBooks();
      });
    }

    filterBooks(){
      const thisBooksList = this;

      for(let book of thisBooksList.data){
        let shouldBeHidden = false;
      
        for(let filter of thisBooksList.filters){
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

    determineRatingBgc(rating){

      if(rating < 6) return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      if(rating > 6 && rating <= 8) return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      if(rating > 8 && rating <=9) return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      if(rating > 9) return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
  }

  new BooksList();
}