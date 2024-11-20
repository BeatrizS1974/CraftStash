const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const services = require('./services');
const router = require('./router'); // 
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the client directory
app.use("/client", express.static(path.resolve(__dirname, "../client/")));

// Page listeners (router)
router(app);

// Service listeners (data processes)
app.post('/write_record', services.writeRecord);
app.get('/get-records', services.getRecords);
app.delete('/delete-record/:id', services.deleteRecord);

// Listen
app.listen(port, (err) => {
    if (err) throw err;
    console.log("Listening on port: " + port);
});
