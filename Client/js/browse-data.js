$(document).ready(function () {

    // Function to load data into the table
    function retrieveData() {
        $.ajax({
            url: indexURL + "/browse-data",
            type: "GET",
            success: function (response) {
                const data = JSON.parse(response);

                if (data.msg === "SUCCESS") {
                    populateTable(data.fileData);
                    addDeleteEventListeners(); // Add listeners after populating the table
                } else {
                    console.error("Error fetching data:", data.msg);
                }
            },
            error: function (err) {
                console.error("Error during AJAX call:", err);
            }
        });
    }

    // Function to populate the table on page load
    function populateTable(dataRecords) {
        const tableBody = document.querySelector("#dataTable tbody");
        tableBody.innerHTML = ""; // Clear any existing rows before adding new ones

        // Loop through the JSON data and create rows
        dataRecords.forEach(record => {
            const row = document.createElement("tr");

            // Create table data cells for each field
            const idCell = document.createElement('td');
            const dataElement1Cell = document.createElement('td');
            const dataElement2Cell = document.createElement('td');
            const dataElement3Cell = document.createElement('td');
            const dataElement4Cell = document.createElement('td');
            const dataElement5Cell = document.createElement('td');
            const dataElement6Cell = document.createElement('td');
            const deleteCell = document.createElement('td');
           

            // Populate the cells with data
            idCell.textContent = record.id;
            dataElement1Cell.textContent = record.dataElement1;
            dataElement2Cell.textContent = record.dataElement2;
            dataElement3Cell.textContent = record.dataElement3;
            dataElement4Cell.textContent = record.dataElement4;
            dataElement5Cell.textContent = record.dataElement5;
            dataElement6Cell.textContent = record.dataElement6;

            // Create the delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.setAttribute('data-id', record.id); 
            deleteButton.addEventListener('click', function() {
                deleteRecord(record.id); 
    
            });
            deleteCell.appendChild(deleteButton);
          
            row.appendChild(idCell);
            row.appendChild(dataElement1Cell);
            row.appendChild(dataElement2Cell);
            row.appendChild(dataElement3Cell);
            row.appendChild(dataElement4Cell);
            row.appendChild(dataElement5Cell);
            row.appendChild(dataElement6Cell);
            row.appendChild(deleteCell);

            // Append row to the table body
            tableBody.appendChild(row);
        });
    }

    // Function to add event listeners to delete buttons
    function addDeleteEventListeners() {
        $(".delete-btn").click(function () {
            const recordId = $(this).data("id");
            deleteRecord(recordId);
        });
    }

    // Function to delete a record
    function deleteRecord(id) {
        $.ajax({
            url: indexURL + "/browse-data" , 
            type: "delete",
            success: function (response) {
                if (response.msg === "SUCCESS") {
                    alert("Record deleted successfully!");
                    retrieveData(); 
                } else {
                    alert("Error deleting record!");
                }
            },
            error: function (err) {
                console.error("Error deleting record:", err);
                alert("Failed to delete the record.");
            }
        });
    }

    // Initialize the table on page load
    retrieveData();
});
