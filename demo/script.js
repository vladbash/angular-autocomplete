angular.module('demoApp', ['auto-complete'])
	.controller('demoCtrl', demoController);

angular.element(document).ready(function () {
	angular.bootstrap(document, ['demoApp'], {});
});

demoController.$inject = ['$scope'];
function demoController($scope) {
	$scope.input = '';
	$scope.data = [
		"john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", 
		"drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred"
	];
	$scope.color = '#00BCD4';
}
