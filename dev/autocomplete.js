angular.module('auto-complete',['mp.deepBlur']);

angular.module('auto-complete').directive('autoCompleteInput',directiveFunc);

directiveFunc.$inject=[];
function directiveFunc(){
  var linkFunc=function(scope,element,attributes){
    function prevOf(yourElement) {
      var parent = yourElement.parent();
      var children = parent.children();

      var prev;
      for (var i = 1; i < children.length; i++){
        if (children[i] === yourElement[0]) {
          prev = children[i-1];
        }
      }

      return prev;
    }
    element.find('input').on('keydown',function(e){
      var collectionItems=null;
      if(e.keyCode===13){
        angular.element((element.children()[2]).querySelector('.collection-item.active')).triggerHandler('click');
      }
      if(e.keyCode===40|e.keyCode===38){

        collectionItems=angular.element(element.children()[2]).children();
        if(collectionItems.length===0){
          return;
        }
      }else//other keys
      {
        return;
      }
      var active=(element.children()[2]).querySelector('.collection-item.active');
      var firstFlag=true;
      if(angular.element(active).length>0){
        firstFlag=false;
      }
      active=angular.element(active).length>0?active:collectionItems[0];
      if(e.keyCode===40)//down
      {
        if(firstFlag){
            angular.element(active).addClass('active').children('span').css('color','white');
        }else{
          angular.element(active).removeClass('active').children('span').css('color',scope.color);
          angular.element(active).next().addClass('active').children('span').css('color','white');
        }
      }else if(e.keyCode===38)//up
      {
        angular.element(active).removeClass('active').children('span').css('color',scope.color);
        angular.element(prevOf(angular.element(active))).addClass('active').children('span').css('color','white');
      }

    });
  };

  return {
    restrict:'E',
    replace:true,
    scope:{
      autoData:'=',
      sourceLink:'=',
      acTitle:'=',
      color:'=',
      inputModel:'='
    },
    link:linkFunc,
    controller:autocompleteController,
    template:'<div ng-init="init()"  deep-blur="changeShowVariable(false)" style="position:relative;"><style>  input[type=text]:focus:not([readonly])#auto-complete-id{    border-bottom:1px solid {{color}} !important;    box-shadow:0 1px 0 0 {{color}} !important;  }  #auto-complete-label.active{    color:{{color}} !important;  }  .collection-item.active{    background-color:{{color}} !important;  }</style><div class="input-field">  <input type="text" id="auto-complete-id" ng-model="inputModel" ng-model-onblur ng-change="textChange()" ng-focus="changeShowVariable(true)">  <label id="auto-complete-label" for="auto-complete-id"><span ng-bind="acTitle"></span></label></div><div class="collection" ng-show="showList()" style="margin-top: -1%;position:absolute;width:100%;z-index:99;">  <a class="collection-item" ng-repeat="item in getData()" ng-click="chooseItem(item)"><span style="color:{{color}};" ng-bind="item"></span></a></div></div>',
    //templateUrl:'/dirs/autocomplete.html'
  };
};

autocompleteController.$inject=['$scope'];
function autocompleteController($scope){
  $scope.inputModel='';
  $scope.dataType=0;
  $scope.dataToList=[];
  $scope.showListFlag=false;

  $scope.init=function(){
    if($scope.autoData!==undefined&&$scope.autoData.length>0){
      $scope.dataType=1;
    }else if($scope.sourceLink!==undefined&&$scope.sourceLink!==''){
      $scope.dataType=2;
    }
  }

  $scope.changeShowVariable=function(flag){
    if(flag){
      flag=$scope.dataType!==0&&$scope.inputModel.length!==0;
    }else{
      if($scope.chooseItemFlag){
        flag=true;
      }
    }
    $scope.showListFlag=flag;
  }

  $scope.showList=function(){
    return $scope.showListFlag;
  }

  $scope.getData=function(){
    $scope.dataToList=[];
    if($scope.dataType===1){
      for(var i=0;i<$scope.autoData.length;i++){
        if($scope.autoData[i].indexOf($scope.inputModel)!==-1){
          $scope.dataToList.push($scope.autoData[i]);
        }
      }
    }
    if($scope.dataToList.length===0)
      $scope.showListFlag=false;
    return $scope.dataToList;
  }

  $scope.chooseItem=function(item){
    $scope.inputModel=item;
    $scope.showListFlag=false;
  }

  $scope.textChange=function(){
    $scope.showListFlag=$scope.dataType!==0&&$scope.inputModel.length!==0;
  }

  $scope.showTitle=function(){
    return $scope.title!==undefined&&$scope.length!==0;
  }

};

angular.module('auto-complete').service('autoService',autoServiceFunction);

autoServiceFunction.$inject=['$http','$q'];
function autoServiceFunction($http,$q){
  var factoryObject={
    getData:function(link){
      var defered=$q.defered();
      $http.get(link).then(function(data){
        defered.resolve(data);
      },function(data){
        defered.reject();
      });
      return defered.promise;
    }
  };
  return factoryObject;
}
