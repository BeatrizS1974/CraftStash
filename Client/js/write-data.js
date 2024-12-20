
    document.getElementById("submitBtn").addEventListener("click", function() {
        // Get values from the input fields
        var ProductDescription = $("#ProductDescription").val();
        var color = $("#color").val();
        var manufacturer = $("#manufacturer").val();
        var productType = $("#productType").val();
        var location = $("#location").val();
        var quantity = $("#quantity").val();
        
        // Create JSON object
        var jsonString = JSON.stringify  ({
            ProductDescription: ProductDescription,
            Color: color, 
            ManufacturerName: manufacturer,
            ProductType: productType,
            Location: location,
            Quantity: quantity
        });
       
        // AJAX request to submit data
        $.ajax({
            url: indexURL + "/write-data",
            type: "post",
            data: jsonString,
            contentType: "application/json",
            success: function(response) {
                
                var data = JSON.parse(response);
                if (data.msg === "SUCCESS") {
                    alert("Data Saved");
                  
                    document.getElementById("dataForm").reset();
                } else {
                    console.log(data.msg);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
//});

// Clear button event listener
document.getElementById("clearBtn").addEventListener("click", function() {
    document.getElementById("dataForm").reset();
});

const saveBtn = document.getElementById("saveBtn");
if (saveBtn) {
    saveBtn.addEventListener("click", function() {
    const ProductDescription = document.getElementById("ProductDescription").value;
    const color = document.getElementById("color").value;
    const manufacturer = document.getElementById("manufacturer").value;
    const productType = document.getElementById("productType").value;
    const location = document.getElementById("location").value;
    const quantity = document.getElementById("quantity").value;
     
    // Storing data in localStorage
    localStorage.setItem("ProductDescription", ProductDescription);
    localStorage.setItem("Color", color);
    localStorage.setItem("ManufacturerName", manufacturer);
    localStorage.setItem("ProductType", productType);
    localStorage.setItem("Location", location);
    localStorage.setItem("Quantity", quantity);
    alert("Data has been saved!");
});
}