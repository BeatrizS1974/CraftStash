// Sample JSON object acting as a mock database
const dataRecords = [
    { id: 1, dataElement1: 'Distress Oxide- Spun Sugar', dataElement2: 'Ranger', dataElement3: 'D3' },
    { id: 2, dataElement1: 'Distress Oxide - Mowed Lawn', dataElement2: 'Ranger', dataElement3: 'D3' },
    { id: 3, dataElement1: 'Creative FX- Holographic', dataElement2: 'American Crafts', dataElement3: 'D8' },
    { id: 4, dataElement1: 'Embossing Folder- Jolly', dataElement2: 'Tonic Studios', dataElement3: 'C3' },
    { id: 5, dataElement1: 'Distress Mica Stain- Decayed', dataElement2: 'Ranger', dataElement3: 'W1' }
];

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

        // Populate the cells with data
        idCell.textContent = record.id;
        dataElement1Cell.textContent = record.dataElement1;
        dataElement2Cell.textContent = record.dataElement2;
        dataElement3Cell.textContent = record.dataElement3;

        // Append cells to the row
        row.appendChild(idCell);
        row.appendChild(dataElement1Cell);
        row.appendChild(dataElement2Cell);
        row.appendChild(dataElement3Cell);

        // Append row to the table body
        tableBody.appendChild(row);
    });
}

// Call the populateTable function when the page loads
window.onload = populateTable;
