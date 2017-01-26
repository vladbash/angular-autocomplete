# angular-autocomplete

#Demo

[http://vladb95.github.io/angular-autocomplete/]

### Installation
```sh
$ bower install angular-materialize-autocomplete
```
### Dependencies
* [https://github.com/angular/angular.js]
* [https://github.com/Dogfalo/materialize]



## Using

###script.js
```sh

angular.module('demoApp',['auto-complete']);

angular.module('demoApp').controller('demoCtrl',demoController);

demoController.$inject=['$scope'];
function demoController($scope){
  $scope.input='';
	$scope.data=["john", "bill", "charlie", "robert", "alban",
  "oscar", "marie", "celine", "brad", "drew", "rebecca",
   "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred"];
  $scope.color='#00BCD4';
}
```
###index.html

```sh
<auto-complete-input auto-data="data" ac-title="'Choose employee'" color="color" ng-model="input"></auto-complete-input>
```
