const path = require('path');

//Page Listener(router)
var router = function(app) {

        app.get("/", function(req, res){
            res.status(200).sendFile(path.join(__dirname + "/../Client/index.html"));
    });

    app.get("/home", function(req, res){
        res.status(200).sendFile(path.join(__dirname + "/../Client/index.html"));
    });

    app.get("/write-data", function(req, res){
        res.status(200).sendFile(path.join(__dirname + "/../Client/write-data.html"));
    });
    app.get("/view-data", function(req, res){
        res.status(200).sendFile(path.join(__dirname + "/../Client/view-data.html"));
    });
    app.get("/browse-data", function(req, res){
        res.status(200).sendFile(path.join(__dirname + "/../Client/browse-data.html"));
    });

    app.get('/get-records', async (req, res) => {
        try {
            const fileData = await services.getRecords();
            res.json({ data: fileData });
        } catch (err) {
            res.status(500).json({ msg: "Error fetching records", error: err.message });
        }
    });

    app.delete('/delete-record/:id', async (req, res) => {
        try {
            const recordId = req.params.id;
            const result = await services.deleteRecord(recordId);
            res.json({ msg: result });
        } catch (err) {
            res.status(500).json({ msg: "Error deleting record", error: err.message });
        }
    });
};

module.exports = router;