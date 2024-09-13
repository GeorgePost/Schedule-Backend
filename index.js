const express= require("express")
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  headers: ["Content-Type"],
  credentials: true,
}));
app.use("/api/users", require("./routes/api/users"));
app.options('*', cors());
app.listen(port, ()=>{
    console.log(`Server started listening on port ${port}`);
});
