const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname + '/../Client/files/data.txt');

var services = function(app) {
    app.post('/write_record', function(req, res){
    var id = "lib" + Date.now();

    var Data = {
        id: id,
        dataElement1: req.body.dataElement1,
        dataElement2: req.body.dataElement2,
        dataElement3: req.body.dataElement3
    };

    var libraryData = [];

    if(fs.existsSync(DB_FILE)){
        //read in current database
        fs.readFile(DB_FILE, "utf8", function(err,data){
            if(err) {
                res.send(json.stringify({msg: err}));
            }else{
                libraryData = JSON.parse(data);

                libraryData.push(Data);

                fs.writeFile(DB_FILE, JSON.stringify(libraryData), function(err){
                    if(err) {
                    res.send(json.stringify({msg: err}));
                }else {
                    res.send(JSON.stringify({msg: "SUCCESS"}));
                }
            
            })
    }

});
}else{
    libraryData.push(data);
    fs.writeFile(DB_FILE, JSON.stringify(libraryData), function(err){
        if(err) {
        res.send(json.stringify({msg: err}));
    }else {
        res.send(JSON.stringify({msg: "SUCCESS"}));
    }
});

}

});


};

module.exports = services;

