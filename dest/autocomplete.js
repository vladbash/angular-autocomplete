angular.module('auto-complete', [])
  .directive('autoCompleteInput', directiveFunc);

directiveFunc.$inject = ['$timeout'];
function directiveFunc($timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      autoData: '=',
      sourceLink: '=',
      acTitle: '=',
      color: '=',
      inputModel: '=ngModel'
    },
    link: function (scope, element, attributes) {
      function prevOf(yourElement) {
        var parent = yourElement.parent();
        var children = parent.children();

        var prev;
        for (var i = 1; i < children.length; i++) {
          if (children[i] === yourElement[0]) {
            prev = children[i - 1];
          }
        }

        return prev;
      }
      element.find('input').bind('blur', function () {
        $timeout(function () { scope.showListFlag = false; }, 200);
      });
      element.find('input').on('keydown', function (e) {
        var collectionItems = null;
        if (e.keyCode === 13) {
          angular.element((element.children()[2]).querySelector('.collection-item.active')).triggerHandler('click');
        }
        if (e.keyCode === 40 | e.keyCode === 38) {
          collectionItems = angular.element(element.children()[2]).children();
          if (collectionItems.length === 0) {
            return;
          }
        } else//other keys
        {
          return;
        }
        var active = (element.children()[2]).querySelector('.collection-item.active');
        var firstFlag = true;
        if (angular.element(active).length > 0) {
          firstFlag = false;
        }
        active = angular.element(active).length > 0 ? active : collectionItems[0];
        if (e.keyCode === 40)//down
        {
          if (firstFlag) {
            angular.element(active).addClass('active').children('span').css('color', 'white');
          } else {
            angular.element(active).removeClass('active').children('span').css('color', scope.color);
            angular.element(active).next().addClass('active').children('span').css('color', 'white');
          }
        } else if (e.keyCode === 38)//up
        {
          angular.element(active).removeClass('active').children('span').css('color', scope.color);
          angular.element(prevOf(angular.element(active))).addClass('active').children('span').css('color', 'white');
        }
      });
    },
    controller: autocompleteController,
    template:'<div ng-init="init()" ng-blur="changeShowVariable(false)" style="position:relative;"><style>\r\n  input[type=text]:focus:not([readonly])#auto-complete-id{\r\n    border-bottom:1px solid {{color}} !important;\r\n     box-shadow:0 1px 0 0 {{color}} !important;\r\n   }\r\n    #auto-complete-label.active{\r\n        color:{{color}} !important;\r\n       }\r\n    .collection-item.active\r\n    {\r\n      background-color:{{color}} !important;\r\n    }\r\n    </style><div class="input-field"><input type="text" id="auto-complete-id" ng-model="inputModel" ng-change="textChange()" ng-focus="changeShowVariable(true)"> <label id="auto-complete-label" for="auto-complete-id"><span ng-bind="acTitle"></span></label></div><div class="collection" ng-show="showList()" style="margin-top: -1%;position:absolute;width:100%;z-index:99;"><a class="collection-item" ng-repeat="item in getData()" ng-click="chooseItem(item)"><span style="color:{{color}};" ng-bind="item"></span></a></div></div>'
  };
};

autocompleteController.$inject = ['$scope', 'autoService'];
function autocompleteController($scope, autoService) {
  $scope.inputModel = '';
  $scope.dataType = 0;
  $scope.dataToList = [];
  $scope.showListFlag = false;

  $scope.init = function () {
    if ($scope.autoData !== undefined && $scope.autoData.length > 0) {
      $scope.dataType = 1;
    } else if ($scope.sourceLink !== undefined && $scope.sourceLink !== '') {
      $scope.dataType = 2;
      $scope.dataToList = autoService.getData($scope.sourceLink);
    }
  }

  $scope.changeShowVariable = function (flag) {
    if (flag) {
      flag = $scope.dataType !== 0 && $scope.inputModel.length !== 0;
    } else {
      if ($scope.chooseItemFlag) {
        flag = true;
      }
    }
    $scope.showListFlag = flag;
  }

  $scope.showList = function () {
    return $scope.showListFlag;
  }

  $scope.getData = function () {
    $scope.dataToList = [];
    if ($scope.dataType === 1) {
      for (var i = 0; i < $scope.autoData.length; i++) {
        if ($scope.autoData[i].toLowerCase().indexOf($scope.inputModel.toLowerCase()) !== -1) {
          $scope.dataToList.push($scope.autoData[i]);
        }
      }
    }
    if ($scope.dataToList.length === 0)
      $scope.showListFlag = false;
    return $scope.dataToList;
  }

  $scope.chooseItem = function (item) {
    $scope.inputModel = item;
    $scope.showListFlag = false;
  }

  $scope.textChange = function () {
    $scope.showListFlag = $scope.dataType !== 0 && $scope.inputModel.length !== 0;
  }

  $scope.showTitle = function () {
    return $scope.title !== undefined && $scope.length !== 0;
  }

};

angular.module('auto-complete').service('autoService', autoServiceFunction);

autoServiceFunction.$inject = ['$http', '$q'];
function autoServiceFunction($http, $q) {
  var factoryObject = {
    getData: function (link) {
      var defered = $q.defer();
      $http.get(link).then(function (data) {
        defered.resolve(data);
      }, function (data) {
        defered.reject();
      });
      return defered.promise;
    }
  };
  return factoryObject;
}
