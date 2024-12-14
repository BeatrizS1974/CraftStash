
function fetchProducts() {
    $.ajax({
        url: mongoMountainUrl + "/get-product",
        type: "GET",
        success: function(data) {
            if (data && data.products) {
                displayProducts(data.products); // Call function to display products
            } else {
                alert('Error fetching products: No data received.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('Failed to fetch products.'); // User-friendly error message
        }
    });
}

// Function to display spells
function displayProducts(products) {
    const tableBody = $('#product-table tbody');
    tableBody.empty(); // Clear the table body first

   products.forEach(product => {
        const row = $('<tr></tr>');

        // Create table cells for each spell property
        row.append($('<td></td>').text(product.name));
        row.append($('<td></td>').text(spell.color));
        row.append($('<td></td>').text(product.manufacturer));
        row.append($('<td></td>').text(product.type));
        row.append($('<td></td>').text(product.location));
        row.append($('<td></td>').text(product.quantity));
        row.append($('<td></td>').text(product.counter || 'None'));

        // Append the row to the table body
        tableBody.append(row);
    });
}

// Call the fetchSpells function when the page loads
$(document).ready(function() {
    fetchProducts();
});
