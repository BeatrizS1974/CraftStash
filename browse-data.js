var product= [];
var activeProduct = 0;

var app = angular.module('browseDataApp',[]);

app.controller('browseDataCtrl', function($scope, $http) {

    $scope.get_records = function() {
        $http({
            //send request to the server
            method:'get',
            url: indexURL + "/browse-data"

        }).then(function(response){
            //if successfully connected to the server
            if(response.data.msg === "SUCCESS"){
                product = response.data.product;
                $scope.obj = product[activeProduct];
                $scope.showHide;
            
            }else {
                console.log(response.data.msg);

            }
        }), function(error) {
            console.log(error);
        }
    }
    $scope.get_records();

    $scope.changeProduct = function(direction){
        activeProduct += direction;
        $scope.obj = product[activeProduct];
        $scope.showHide;
    }
$scope.showHide = function() {
    $scope.hidePrev = (activeProduct == 0);
    $scope.hideNext = (activeProduct == product.length-1);
}

});// End of Controller