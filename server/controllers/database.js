import mysql from "mysql";
import dotenv from 'dotenv';
const db_centerNode = mysql.createConnection({
    host : '34.142.151.50',
    user : 'root',
    password : '',
    database : 'Node' 
})
const db_pre1980 = mysql.createConnection({
  host : '34.143.137.168',
  user : 'root',
  password : '',
  database : 'Node' 
})
const db_post1980 = mysql.createConnection({
  host : '34.142.225.216',
  user : 'root',
  password : '',
  database : 'Node'
})

export const insert = async (req, res) => {
    const {title, dYear, genre,director, actor1, actor2} = req.body;
    const post={title: "wow", dYear: 1920, genre:"ej", director:"austin", actor1:"josh",actor2:"pakyu"}
    let sql = "INSERT INTO movies SET ?";
    let test=db_centerNode.connect((err)=>{
      if(err){  
        if(post.dYear<1980){
          console.log("Recovery Pre")
          insertLogPre1980(post);
          res.send("/")
        }
        else{
          console.log("Recovery Post")
          insertLogPost1980(post);
          res.send("/")
        }
      }
      else{
        recoveryCheckCenter();
        console.log("Successfully Connected");
      }
      
    })
    let query = db_centerNode.query(sql, post, (err,result)=>{
      if(err){
        console.log("Center Node Dead")
      }
      else{
        console.log(result);
        post.movie_id=result.insertId
        const sleepQuery="DO SLEEP(10)";
        db_centerNode.query(sleepQuery,(err,result)=>{
          if(err){
            console.log("Error Sleeping");
          }
          else{
            console.log("Slept");
            const commitQuery="COMMIT";
            db_centerNode.query(commitQuery,(err,result)=>{
              if(err){
                console.log("Error Commiting");
              }
              else{
                console.log("Commited");
                console.log(post.dYear);
                if(post.dYear<1980){
                  insertNodePre1980(post);
                }
                else{
                  insertNodePost1980(post);
                }
              }
            });
          }
        });
        
        
      }
      
    });
};
const recoveryCheckCenter = () =>{
  let queries = checkLogPre1980()
  console.log(queries);
}
const checkLogPre1980= () =>{
  let test=db_pre1980.connect((err)=>{
    if(err){  
      return null;
    }
    console.log("Successfully Connected");
  })
  let sql = `SELECT * FROM logs`
  let query = db_pre1980.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("read failure")
      return null
    }
    else{
      return result
    }
  })
}
const checkLogPost1980= () =>{
  let test=db_post1980.connect((err)=>{
    if(err){  
      return null;
    }
    console.log("Successfully Connected");
  })
  let sql = `SELECT * FROM logs`
  let query = db_post1980.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("read failure")
      return null
    }
    else{
      return result
    }
  })
}
const insertLogPre1980 =(post) =>{
  let test=db_pre1980.connect((err)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })  
  let restore_sql = `INSERT INTO movies SET ${post}`
  let sql = `INSERT INTO logs (sql_statement) VALUES ("${restore_sql}")`
  let query = db_pre1980.query(sql, post, (err,result)=>{
    if(err){
      console.log(err);
      console.log("insert failure")
    }
    else{
      const sleepQuery="DO SLEEP(10)";
      db_pre1980.query(sleepQuery,(err,result)=>{
        if(err){
          console.log("Error Sleeping");
        }
        else{
          console.log("Slept");
          const commitQuery="COMMIT";
          
          db_pre1980.query(commitQuery,(err,result)=>{
            if(err){
              console.log("Error Commiting");
            }
            else{
              console.log("Successful");
            }
          });
        }
      });  
    
    }
  })
  

}
const insertLogPost1980 =(post) =>{
  let test=db_post1980.connect((err)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })  
  let restore_sql = `INSERT INTO movies SET ${post}`
  let sql = `INSERT INTO logs (sql_statement) VALUES ("${restore_sql}")`
  let query = db_post1980.query(sql, post, (err,result)=>{
    if(err){
      console.log(err);
      console.log("insert failure")
    }
    else{
      const sleepQuery="DO SLEEP(10)";
      db_post1980.query(sleepQuery,(err,result)=>{
        if(err){
          console.log("Error Sleeping");
        }
        else{
          console.log("Slept");
          const commitQuery="COMMIT";
          
          db_post1980.query(commitQuery,(err,result)=>{
            if(err){
              console.log("Error Commiting");
            }
            else{
              console.log("Successful");
            }
          });
        }
      });  
    
    }
  })
}

const insertNodePre1980= (post)=>{
  let sql = "INSERT INTO movies SET ?";
  let test=db_pre1980.connect((err)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })
  console.log(post)
  let query = db_pre1980.query(sql, post, (err,result)=>{
    if(err){
      console.log(err);
      console.log("insert failure")
    }
    else{
      const sleepQuery="DO SLEEP(10)";
      db_pre1980.query(sleepQuery,(err,result)=>{
        if(err){
          console.log("Error Sleeping");
        }
        else{
          console.log("Slept");
          const commitQuery="COMMIT";
          
          db_pre1980.query(commitQuery,(err,result)=>{
            if(err){
              console.log("Error Commiting");
            }
            else{
              console.log("Successful");
            }
          });
        }
      });
      
    }
    
  });
}

const insertNodePost1980= (post)=>{
  let sql = "INSERT INTO movies SET ?";
  let test=db_post1980.connect((err)=>{
    if(err){  
      res.redirect("/error");
    }
    console.log("Successfully Connected");
  })
  let query = db_post1980.query(sql, post, (err,result)=>{
    if(err){
      console.log("insert failure")
    }
    else{
      const sleepQuery="DO SLEEP(10)";
      db_post1980.query(sleepQuery,(err,result)=>{
        if(err){
          console.log("Error Sleeping");
        }
        else{
          console.log("Slept");
          const commitQuery="COMMIT";
          db_post1980.query(commitQuery,(err,result)=>{
            if(err){
              console.log("Error Commiting");
            }
            else{
              console.log("Successful");
            }
          });
        }
      });
      
      
    }
    
  });
}

export const deleteRecord = async (req, res) => {

    let sql = "DELETE FROM movies WHERE movie_id = ?";
    let query = db.query(sql, req.params.id, (err,result)=>{
      if(err){
      }
      console.log(result);
      throw err;
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