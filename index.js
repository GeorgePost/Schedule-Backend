const express= require("express")
const app = express();
const helmet = require("helmet");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
      },
    }),
  );
app.use("/api/users", require("./routes/api/users"));
app.listen(3000, ()=>{
    console.log("Server started listening on port 3000");
});
