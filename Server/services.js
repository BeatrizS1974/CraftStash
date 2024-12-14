const csProducts = require('craft-stash-products');
const{MongoClient, ObjectId } =require('mongodb');

const dbUrl = process.env.BD_URI || "mongodb: //127.0.0.1";
const client = new MongoClient(dbUrl);

var services = function(app) { 

    app.post('/write_record', async function(req, res){
        
        var newProduct = {
            id: id,
            name: req.body.ProductDescription,
            color: req.body.Color,
            manufacturer: req.body.Manufacturer,
            type: req.body.ProductType,
            location: req.body.Location,
            quantity: req.body.Quantity
            
        };
       var search = {name: req.body.name};

       try{
        const conn = await client.connect();
        const db = conn.db("products");
        const coll = db.collection("stash");

     const product = await coll.find(search).toArray();

        if(product.length > 0) {
            await conn.close();
            return res.send(JSON.stringify({msg: "Product Already Exists"}));
        }else{
            await coll.insertOne(newProduct);
            await conn.close();
            return res.send(JSON.stringify({msg: "SUCCESS"}));
        }
       }catch (error){
            await conn.close();
            return res.send(JSON.stringify({msg: "Error" + error}));
       }
    });
    app.get("/get-productByType", async function(req, res) {
        const search = req.query.type ? { type: req.query.type } : {};

    try{
        const conn = await client.connect();
        const db = conn.db("products");
        const coll = db.collection("stash");

        const data = await coll.find(search).toArray();
        await conn.close();
        return res.send(JSON.stringify({msg: "SUCCESS", products: data }))

    } catch(error) {
    await conn.close();
    return res.send(JSON.stringify({msg: "Error" + error}));  
} 
});

app.put('/update-product', async function(req, res) {
    

});

app.delete('/delete-product', async function(req, res) {
    
});

//For refreshing the products table
app.post('/refreshProduct', async function(req, res) {
// console.log("In refresh products");
try {
    const conn = await client.connect();
    const db = conn.db("products");
    const coll = db.collection('stash');
    
    await coll.drop();
    console.log("Dropped database");
    await client.close();
    initializeDatabase();
    return res.status(200).send(JSON.stringify({msg:"SUCCESS"}));        
} catch(err) {
    console.log(err);
    return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
}

});

}

//To Initialize the products table
var initializeDatabase = async function() {

try {
    const conn = await client.connect();
    const db = conn.db("products");
    const coll = db.collection('stash');
    const data = await coll.find().toArray();

    if(data.length === 0) {
        var products = csProducts.all;
        await coll.insertMany(products);
        console.log("Added seed records");
    }

    await conn.close();
} catch(err) {
    console.log(err);
}

}

module.exports = { services, initializeDatabase };

