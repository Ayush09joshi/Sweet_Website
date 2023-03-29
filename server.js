const express=require('express');
const ejs=require('ejs');
const bodyparser=require('body-parser');
const multer=require('multer');
const path=require('path');
const app=express();
const mongoose=require('mongoose');

var preproductid="132318163";

mongoose.connect("mongodb://127.0.0.1:27017/ShopDB")
const productSchema=new mongoose.Schema({
    name:String,
    price:Number,
    img_name:String
});
const Product=mongoose.model('Product',productSchema);

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static("Images"));
app.use(express.static("public"));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Images/products')
    },
    filename:(req,file,cb)=>{
      
        Product.count({}, function( err, count){
            var productid=preproductid+count;
            cb(null,productid+path.extname(file.originalname));
        })

        
    }
})

const upload=multer({storage:storage});

app.get("/",function(req,res){
    Product.find(function(err,products){
        console.log(Product.find());
        res.render("index",{products:products});
    });
   
})

   app.get("/insertproduct",function(req,res){
    res.render("product_form",{});
    });
    app.get("/shop",function(req,res){
    res.render("shop",{products:products});
    });
    app.get("/about",function(req,res){
    res.render("about",{});
    });
    app.get("/contact",function(req,res){
    res.render("contact",{});
    });


app.post("/upload",upload.single('image'),function(req,res){
    Product.count({}, function( err, count){
        var productid=preproductid+count;
        var newproduct= new Product({ name: req.body.name, price: req.body.price,img_name:productid });
        newproduct.save(function (err) {
          if (err) return console.error(err);
        });
    })
   
    res.redirect("/");

});


app.listen(3000,function(){
console.log("Server started");
});