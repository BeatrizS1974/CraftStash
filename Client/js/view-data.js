var products= [];
var activeProducts = 0;


var app = angular.module('browseProductsApp',[]);

app.controller('browseProductsCtrl', function($scope, $http) {

    $scope.get_records = function() {
        $http({
            //send request to the server
            method:'get',
            url: indexURL + "/view-data"

        }).then(function(response){
            
            //if successfully connected to the server
            if(response.data.msg === "SUCCESS"){
                spells = response.data.products;
                $scope.obj = spells[activeProducts];
                $scope.showHide;
            
            }else {
                console.log(response.data.msg);

            }
        }), function(error) {
            console.log(error);
        }
    }
    $scope.get_records();

    $scope.changeProducts = function(direction){
        activeProducts += direction;
        $scope.obj = products[activeProducts];
        $scope.showHide;
    }
$scope.showHide = function() {
    $scope.hidePrev = (activeProducts == 0);
    $scope.hideNext = (activeProducts == products.length-1);
}

});// End of Controller