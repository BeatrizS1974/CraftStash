

// Submit button event listener
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("submitBtn").addEventListener("click", function() {
});  
    var dataElement1 = $("#dataElement1").val()
    var dataElement2 = $("#dataElement2").val()
    var dataElement3 = $("#dataElement3").val()
    var dataElement4 = $("#dataElement4").val()
    var dataElement5 = $("#dataElement5").val()
    var dataElement6 = $("#dataElement6").val()

    var jsonString = {
     dataElement1:dataElement1,
     dataElement2:dataElement2, 
     dataElement3:dataElement3,
     dataElement4:dataElement4,
     dataElement5:dataElement5,
     dataElement6:dataElement6
    };

    $.ajax({
        url: indexURL + "/write-record",
        type: "post",
        data: jsonString,
        success: function(response){
            var data = JSON.parse(response);
            if(data.msg === "SUCCESS" ){
                alert("Data Saved");
            }else {
                console.log(data.msg);
            
            }
        },
        error: function(err){
            console.log(err);
        }
        });

    });

    //alert("Submit button was pressed");


// Clear button event listener
document.getElementById("clearBtn").addEventListener("click", function() {
    document.getElementById("dataForm").reset();
});

// Save button event listener
document.getElementById("saveBtn").addEventListener("click", function() {
    const dataElement1 = document.getElementById("dataElement1").value;
    const dataElement2 = document.getElementById("dataElement2").value;
    const dataElement3 = document.getElementById("dataElement3").value;
    const dataElement4 = document.getElementById("dataElement4").value;
    const dataElement5 = document.getElementById("dataElement5").value;
    const dataElement6 = document.getElementById("dataElement6").value;

    // Storing data in localStorage
    localStorage.setItem("dataElement1", dataElement1);
    localStorage.setItem("dataElement2", dataElement2);
    localStorage.setItem("dataElement3", dataElement3);
    localStorage.setItem("dataElement4", dataElement4);
    localStorage.setItem("dataElement5", dataElement5);
    localStorage.setItem("dataElement6", dataElement6);
    alert("Data has been saved!");
});
