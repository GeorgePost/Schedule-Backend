const express= require("express")
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
app.use(express.json());
var allowlist = ['http://localhost:3000/Schedule-FrontEnd', 'https://georgepost.github.io/Schedule-FrontEnd/']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate));
app.use("/api/users", require("./routes/api/users"));
app.options('*', cors());
app.listen(port, ()=>{
    console.log(`Server started listening on port ${port}`);
});
