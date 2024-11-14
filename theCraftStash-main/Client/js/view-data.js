// Sample JSON object acting as a mock database
// //const dataRecords = [
//     { id: 1, dataElement1: 'Distress Oxide', dataElement2: 'Spun Sugar', dataElement3: 'Ranger',
//          dataElement4: 'Ink Pad', dataElement5: 'K1', dataElement6: '1' },
//     { id: 2, dataElement1: 'Distress Oxide ', dataElement2: 'Mowed Lawn', dataElement3: 'Ranger', 
//         dataElement4: 'Ink Pad', dataElement5: 'K1', dataElement6: '1'},
//     { id: 3, dataElement1: 'Creative FX', dataElement2: 'Holographic', dataElement3: 'American Crafts',
//          dataElement4: 'Mixed Media',dataElement5: 'K2', dataElement6: '1' }, 
//     { id: 4, dataElement1: 'Embossing Folder- Jolly', dataElement2: 'N/A', dataElement3: 'Catherine Pooler',
//          dataElement4: 'embossing folder', dataElement5: 'A4', dataElement6: '1'},
//     { id: 5, dataElement1: 'Distress Mica Stain', dataElement2: 'Decayed', dataElement3: 'Ranger',
//          dataElement4: 'Mixed Media', dataElement5: 'W1', dataElement6: '1' }
// ];

retrieveData();

function retrieveData(){
    $.ajax({
        url:indexURL + "/get-records",
        type: "get",
        success: function(response){
            var Librarydata= JSON.parse(response);

            if(data.msg = "SUCCESS"){
                    createLibraryTable(data.fileData);

            }else {
                console.log(data.msg)
            }
        },
        error: function(err){
            console.log(err);
        }
    });
}

// Function to populate the table on page load
function populateTable() {
    const tableBody = document.querySelector("#dataTable tbody");

    // Loop through the JSON data and create rows
    dataRecords.forEach(record => {
        const row = document.createElement('tr');

        // Create table data cells for each field
        const idCell = document.createElement('td');
        const dataElement1Cell = document.createElement('td');
        const dataElement2Cell = document.createElement('td');
        const dataElement3Cell = document.createElement('td');
        const dataElement4Cell = document.createElement('td');
        const dataElement5Cell = document.createElement('td');
        const dataElement6Cell = document.createElement('td');

        // Populate the cells with data
        idCell.textContent = record.id;
        dataElement1Cell.textContent = record.dataElement1;
        dataElement2Cell.textContent = record.dataElement2;
        dataElement3Cell.textContent = record.dataElement3;
        dataElement4Cell.textContent = record.dataElement4;
        dataElement5Cell.textContent = record.dataElement5;
        dataElement6Cell.textContent = record.dataElement6;

        // Append cells to the row
        row.appendChild(idCell);
        row.appendChild(dataElement1Cell);
        row.appendChild(dataElement2Cell);
        row.appendChild(dataElement3Cell);
        row.appendChild(dataElement4Cell);
        row.appendChild(dataElement5Cell);
        row.appendChild(dataElement6Cell);
        // Append row to the table body
        tableBody.appendChild(row);
    });
}

// Call the populateTable function when the page loads
window.onload = populateTable;
