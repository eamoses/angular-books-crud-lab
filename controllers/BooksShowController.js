angular
  .module('libraryApp')
  .controller('BooksShowController', BooksShowController);

  var endpoint = 'https://super-crud.herokuapp.com/books';

BooksShowController.$inject=['$http', '$routeParams', '$location'];
function BooksShowController($http, $routeParams, $location) {
  var vm = this;

  $http({
      method: 'GET',
      url: endpoint + '/' + $routeParams.id
    }).then(function successCallback(json) {
      vm.book = json.data;
    }, function errorCallback(response) {
      console.log('There was an error getting the data', response);
    });

    vm.editBook = function(book) {
    // console.log('updating book: ', );
    $http({
      method: 'PUT',
      url: endpoint + '/' + vm.book._id,
      data: book
    }).then(onBookUpdateSuccess);

    function onBookUpdateSuccess(response){
      vm.book = response.data;
      $location.path('/');
    }
  };

  vm.deleteBook = function (book) {
    $http({
      method: 'DELETE',
      url: endpoint + '/' + vm.book._id
    }).then(function successCallback(json) {
      $location.path('/');
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  };

}
