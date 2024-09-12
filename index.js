const express= require("express")
const app = express();
app.configure(function(){
  app.use(express.json());
  app.use(express.urlencoded({extended:false}));
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(function (req,res,next){
    res.header("Access-Control-Allow-origin", "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  })
  app.use("/api/users", require("./routes/api/users"));
})
app.listen(3000, ()=>{
    console.log("Server started listening on port 3000");
});
