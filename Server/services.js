const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname + '/files/data.txt');


var services = function(app) { 
    app.post('/write_record', function(req, res){
        
        var id = "lib" + Date.now();
        console.log("dog")
        var Data = {
            id: id,
            dataElement1: req.body.ProductDescription,
            dataElement2: req.body.Color,
            dataElement3: req.body.Manufacturer,
            dataElement4: req.body.ProductType,
            dataElement5: req.body.Location,
            dataElement6: req.body.Quantity
            
        };
        console.log(JSON.stringify(Data))

        var libraryData = [];

        if(fs.existsSync(DB_FILE)){
            //read in current database
            fs.readFile(DB_FILE, "utf8", function(err,data){
                if(err) {
                    res.send(JSON.stringify({msg: err}));
                }else{
                    libraryData = JSON.parse(data);

                    libraryData.push(Data);

                    fs.writeFile(DB_FILE, JSON.stringify(libraryData), function(err){
                        if(err) {
                            res.send(JSON.stringify({msg: err}));
                        }else {
                            res.send(JSON.stringify({msg: "SUCCESS"}));
                        }
                    });   
                } 
            });
        }else{
            libraryData.push(Data);

            fs.writeFile(DB_FILE, JSON.stringify(libraryData), function(err){
                if(err) {
                    console.log(err)
                    res.send(JSON.stringify({msg: err}));
                }else {
                    res.send(JSON.stringify({msg: "SUCCESS"}));
                }
            });      
        }

    });

    app.get("/get-records", function(req, res){
        if(fs.existsSync(DB_FILE)){
            fs.readFile(DB_FILE, "utf8", function(err, data){
                if(err){
                    res.send(JSON.stringify({msg: err}));
                }else {
                    var libraryData = JSON.parse(data);
                    res.send(JSON.stringify({msg: "SUCCESS", fileData: libraryData}));
                
                }
            });
        } else {
            data = [];
            res.send(JSON.stringify({msg: "SUCCESS", fileData: data}));
        }
    });

}

module.exports = services;

