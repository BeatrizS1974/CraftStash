const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'files', 'data.txt');

// Write a new record
const writeRecord = (req, res) => {
    const id = "lib" + Date.now();
    console.log("data Submission Received");

    const { ProductDescription, Color, Manufacturer, ProductType, Location, Quantity } = req.body;

    if (!ProductDescription || !Color || !Manufacturer || !ProductType || !Location || !Quantity) {
        return res.json({ msg: "Missing required fields" });
    }
    const Data = {
        id: id,
        dataElement1: req.body.ProductDescription,
        dataElement2: req.body.Color,
        dataElement3: req.body.Manufacturer,
        dataElement4: req.body.ProductType,
        dataElement5: req.body.Location,
        dataElement6: req.body.Quantity,
    };

    console.log("Saving the following data: ", JSON.stringify(Data));

    let libraryData = [];

    if (fs.existsSync(DB_FILE)) {
        fs.readFile(DB_FILE, "utf8", (err, data) => {
            if (err) {
                return res.json({ msg: err });
            }
            console.log(dog)
            libraryData = JSON.parse(data);
            libraryData.push(Data);

            fs.writeFile(DB_FILE, JSON.stringify(libraryData), (err) => {
                if (err) {
                    res.json({ msg: err });
                } else {
                    res.json({ msg: "SUCCESS" });
                }
            });
        });
    } else {
        libraryData.push(Data);

        fs.writeFile(DB_FILE, JSON.stringify(libraryData), (err) => {
            if (err) {
                console.log(err);
                res.json({ msg: err });
            } else {
                res.json({ msg: "SUCCESS" });
            }
        });
    }
};

// Get all records
const getRecords = (req, res) => {
    if (fs.existsSync(DB_FILE)) {
        fs.readFile(DB_FILE, "utf8", (err, data) => {
            if (err) {
                res.json({ msg: err });
            } else {
                const libraryData = JSON.parse(data);
                res.json({ msg: "SUCCESS", fileData: libraryData });
            }
        });
    } else {
        res.json({ msg: "SUCCESS", fileData: [] });
    }
};

// Delete a record by ID
const deleteRecord = (req, res) => {
    const recordId = req.params.id;

    try {
        if (fs.existsSync(DB_FILE)) {
            fs.readFile(DB_FILE, "utf8", (err, data) => {
                if (err) {
                    return res.json({ msg: "Error reading the database file: " + err });
                }

                let libraryData = [];
                try {
                    libraryData = JSON.parse(data);  // Parse the data if it's valid JSON

                    // Filter out the record with the specified ID
                    libraryData = libraryData.filter(record => record.id !== recordId);

                    // Rewrite the file with the updated records
                    fs.writeFile(DB_FILE, JSON.stringify(libraryData), (err) => {
                        if (err) {
                            return res.json({ msg: "Error writing to the database file: " + err });
                        } else {
                            return res.json({ msg: "SUCCESS" });
                        }
                    });
                } catch (parseError) {
                    return res.json({ msg: "Error parsing the database file data: " + parseError });
                }
            });
        } else {
            return res.json({ msg: "No records found" });
        }
    } catch (err) {
        return res.json({ msg: "An error occurred: " + err });
    }
};

// Export individual functions for use in `router.js`
module.exports = { writeRecord, getRecords, deleteRecord };