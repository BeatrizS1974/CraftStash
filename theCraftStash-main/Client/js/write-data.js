// Submit button event listener
document.getElementById("submitBtn").addEventListener("click", function() {
    alert("Submit button was pressed");
});

// Clear button event listener
document.getElementById("clearBtn").addEventListener("click", function() {
    document.getElementById("dataForm").reset();
});

// Save button event listener
document.getElementById("saveBtn").addEventListener("click", function() {
    const dataElement1 = document.getElementById("dataElement1").value;
    const dataElement2 = document.getElementById("dataElement2").value;
    const dataElement3 = document.getElementById("dataElement3").value;

    // Storing data in localStorage
    localStorage.setItem("dataElement1", dataElement1);
    localStorage.setItem("dataElement2", dataElement2);
    localStorage.setItem("dataElement3", dataElement3);

    alert("Data has been saved!");
});
