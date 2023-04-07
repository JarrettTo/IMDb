import mysql from "mysql";
const db = mysql.createConnection({
    host : '34.142.151.50',
    user : 'root',
    password : '',
    database : 'node'
})
export const insert = async (req, res) => {
    let post = {movie_id: 1, title: "Fuck", dYear: 1990, genre: "Josh, Quinzon", director: "Eldrich Go", actor1: "Justin To", actor2: "Irah Oliva"};
    let sql = "INSERT INTO movies SET ?";
    let query = db.query(sql, post, (err,result)=>{
      if(err){
        throw err;
      }
      console.log(result);
      res.send("DONE");
    });
};
export const deleteRecord = async (req, res) => {
    let post = 3;
    let sql = "DELETE FROM movies WHERE movie_id = ?";
    let query = db.query(sql, post, (err,result)=>{
      if(err){
        throw err;
      }
      console.log(result);
      res.send("DONE");
    });
};

export const updateRecord = async (req, res) => {

    let post = {movie_id: 1, title: "Duck", dYear: 1990, genre: "Quinzon", director: "Eldrich Go", actor1: "Justin To", actor2: "Irah Oliva"};
    let sql = `UPDATE movies SET ? WHERE movie_id = ${req.params.id}`;
    let query = db.query(sql, post, (err,result)=>{
      if(err){
        throw err;
      }
      console.log(result);
      res.send("DONE");
    });
};

export const viewRecords = async (req, res) => {
    let sql = `SELECT * FROM movies`;
    let query = db.query(sql, (err,result)=>{
      if(err){
        throw err;
      }
      console.log(result);
      res.send("DONE");
    });
};
export const viewRecord = async (req, res) => {
    let num = 4;
    let sql = `SELECT * FROM movies WHERE movies_id = ${req.params.id}`;
    let query = db.query(sql, num, (err,result)=>{
      if(err){
        throw err;
      }
      console.log(result);
      res.send("DONE");
    });
};