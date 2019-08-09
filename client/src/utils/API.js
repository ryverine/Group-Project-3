import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  getLocations: function() {
    return axios.get("/api/locations");
  },
  getStore: function(id) {
    return axios.get("/api/store/" + id);
  },
  getProduct: function(id) {
    console.log("getProduct(" + id + ")");
    return axios.get("/api/product/" + id);
  },
  getUser: function(credentials) {
    return axios.get("/api/user/" + credentials);
  },
  /* Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },*/
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  googleBooksSearch: function(searchText){
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchText);
  }
};
