import mysql from "mysql";
import dotenv from 'dotenv';
const db = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : '',
    database : process.env.DATABASE
})
export const insert = async (req, res) => {
    const {movie_id, title, dYear, genre,director, actor1, actor2} = req.body;
    const post={movie_id, title, dYear, genre, director, actor1,actor2}
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

    let sql = "DELETE FROM movies WHERE movie_id = ?";
    let query = db.query(sql, req.params.id, (err,result)=>{
      if(err){
        throw err;
      }
      console.log(result);
      res.send("DONE");
    });
};

export const updateRecord = async (req, res) => {

    const {movie_id, title, dYear, genre,director, actor1, actor2} = req.body;
    const post={movie_id, title, dYear, genre, director, actor1,actor2}
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
    let sql = `SELECT * FROM movies WHERE movies_id = ${req.params.id}`;
    let query = db.query(sql, (err,result)=>{
      if(err){
        throw err;
      }
      console.log(result);
      res.send("DONE");
    });
};