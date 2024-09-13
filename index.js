const express= require("express")
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors({
  origin: "https://slug-panel.onrender.com",
  headers: ["Content-Type"],
  credentials: true,
}));
app.use("/api/users", require("./routes/api/users"));
app.options('*', cors());
app.listen(port, ()=>{
    console.log(`Server started listening on port ${port}`);
});
