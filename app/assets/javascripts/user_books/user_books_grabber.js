ReddyReader.UserBooksGrabber = function(displayWidget) {
  this.displayWidget = displayWidget;
  this.getUserBooks();
}

ReddyReader.UserBooksGrabber.prototype =  {
  getUserBooks: function() {
    $.ajax({
      url: '/user_book_display'
    }).done(function(serverdata){
      console.log(serverdata)
      books = this.addWPMToBooks(serverdata.books,serverdata.time_per_page)
      this.displayWidget.handleBookList(books);
      $("#userbookdisplay").show();
    }.bind(this));
  },

  addWPMToBooks: function(books, time_per_page){
    for(var i = 0; i < books.length; i++) {
      console.log(books[i]);
      books[i].timeToRead = ((books[i].page_count * time_per_page)/60).toFixed(2);
      //in hours
    }
    return books;
  }
}