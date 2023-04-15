//body-parser cors express mongoose nodemon

/*@brief: Initialization of backend including the server and database, as well as the different require libraries
 * @author: Justin To and Daniel Capinpin
 */
import dbRoutes from "./routes/database.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql";

const PORT = process.env.PORT   || 9090;


const app = express();
app.use(cors());

app.listen(PORT,()=>{
  console.log("Server started on port", PORT)
})

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/database", dbRoutes);

