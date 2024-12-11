const { Console } = require("console");

var app = angular.module("tableApp",[]);

app.controller("tableCtrl", function($scope, $http){
    $scope.Products = [];

    $scope.get_records = function() {

        $http({
            method: 'get',
            url: indexURL + "/get-table"

        }).then(function(response){
            if (response.data.msg==="SUCCESS"){
                $scope.Products= response.data.products;
                $scope.types= getTypes(response.data.products);
                $scope.selectedType= $scope.types[0];
            }else{
                console.log(response.data.msg);
            }

        }), function (error){
            console.log(error);
        }
        
    };//End of get Records
    $scope.get_records();

    $scope.redrawTable= function() {
        var type= $scope.selectedType.value;

        $http({
            method: 'get',
            url: indexURL + "/get-productsByType",
            params:{type:type}

        }).then(function(response){
            if (response.data.msg === "SUCCESS"){
                $scope.Products = response.data.products
            }else{
                console.log(response.data.msg);
            }

        }), function (error){
            console.log(error);
        }
    }

    $scope.editProducts = function(productsNumber) {
        $scope.name = $scope.products[productsNumber].name;
        $scope.manufacturer = $scope.products[productsNumber].manufacturer; 
        $scope.color = $scope.products[productsNumber].color; 
        $scope.type = $scope.products[productsNumber].type;
        $scope.location = $scope.products[productsNumber].location; 
        $scope.quantity = $scope.products[productsNumber].quantity;
        $scope.productsID= $scope.products[productsNumber]['_id'];

        $scope.hideTable= true;
        $scope.hideForm= false;
    }
    $scope.cancelUpdate = function() {
        $scope.hideTable= false;
        $scope.hideForm= true; 
    }

        $scope.updateProducts = function() {
            if($scope.name=== "" || $scope.color === "" || $scope.type === "")
            {
                $scope.addResults= "Name, color and type are required.";
                return;
            }
            $http({
                method: 'put',
                url: indexURL + "/update-products",
                data:{
                    productsID: $scope.productsID,
                    name: $scope.name,
                    color: $scope.color.toLowerCase(),
                    manufacturer: $scope.manufacturer,
                    type: $scope.type,
                    location: $scope.location,
                    quantity: $scope.quantity,

                },
        
           }).then(function (response){
                if(response.data.msg === "SUCCESS"){
                $scope.cancelUpdate();
                $scope.redrawTable();
                console.log(dog);
            $scope.resetForm = function(){
                $scope.name="";
                $scope.manufacturer="";
                $scope.color="";
                $scope.type="";
                $scope.location="";
                $scope.quantity="";
            };
            
            }else{
                $scope.addResults = response.data.msg;
            }


            }),function(error) {
                console.log(error);
            }
        }
    $scope.deleteProduct = function(productName) {
        console.log(productName)

        $http({
            method:'delete',
            url: indexURL + "/delete-product",
            params:{name: productName}

        }).then(function(response){
            if(response.data.msg == "SUCCESS"){
                $scope.redrawTable();

            }else{
                console.log(response.data.msg);
            }
        }),function (error){
            console.log(error);

        }
    }
}); // End Controller

function getTypes(productTableData) {
    var typeExists;
    typesArray = [{value:"", display:"ALL"}];

    for(var i = 0; i< productTableData.length; i++){
        typeExists = typesArray.find(function (element){
            return element.value ===productTableData[i].type;

        });
        if(typeExists){
            continue;

        }else{
            typesArray.push({value: productTableData[i].type, display: productTableData[i].type.toUpperCase()})
        }
    }

    return typesArray;
}
