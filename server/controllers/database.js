import mysql from "mysql";
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'flsmdfs30',
    database : 'mco2'
})
export const insert = async (req, res) => {
    let post = {num: 4, name: "Fuck"};
    let sql = "INSERT INTO new_table SET ?";
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
    let sql = "DELETE FROM new_table WHERE num = ?";
    let query = db.query(sql, post, (err,result)=>{
      if(err){
        throw err;
      }
      console.log(result);
      res.send("DONE");
    });
};

export const updateRecord = async (req, res) => {

    let post = {num: req.params.id, name: "BITCHASS"}
    let sql = `UPDATE new_table SET ? WHERE num = ${req.params.id}`;
    let query = db.query(sql, post, (err,result)=>{
      if(err){
        throw err;
      }
      console.log(result);
      res.send("DONE");
    });
};

export const viewRecords = async (req, res) => {
    let sql = `SELECT * FROM new_table`;
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
    let sql = `SELECT * FROM new_table WHERE num = ${req.params.id}`;
    let query = db.query(sql, num, (err,result)=>{
      if(err){
        throw err;
      }
      console.log(result);
      res.send("DONE");
    });
};