var app = angular.module("tableApp",[]);

app.controller("tableCtrl", function($scope, $http){
    $scope.product = [];

    $scope.get_records = function() {

        $http({
            method: 'get',
            url: indexURL + "/view-data"

        }).then(function(response){
            if (response.data.msg==="SUCCESS"){
                $scope.product = response.data.product;
                $scope.types= getTypes(response.data.product);
                $scope.selectedType= $scope.types[0];
            }else{
                console.log(response.data.msg);
            }

        }, function (error){
            console.log(error);
        
        });

    };
    //End of get Records
    $scope.get_records();

    $scope.redrawTable= function() {
        var type= $scope.selectedType.value;

        $http({
            method: 'get',
            url: indexURL + "/get-productByType",
            params:{type:type}

        }).then(function(response){
            if (response.data.msg==="SUCCESS"){
                $scope.product = response.data.product;
            }else{
                console.log(response.data.msg);
            }

        }, function (error){
            console.log(error);
        });
    };
    $scope.editProduct = function(productID) {
        var product = $scope.product[productID];
        $scope.name = product.product;
        $scope.color = product.color; 
        $scope.manufacturer = product.manufacturer; 
        $scope.productType = product.productType;
        $scope.location = product.location;
        $scope.quantity = product.quantity;

        // Toggle visibility of table and form
        $scope.hideTable = true;
        $scope.hideForm = false;
    };
});