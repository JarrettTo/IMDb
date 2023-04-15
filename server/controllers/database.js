import mysql from "mysql";
import dotenv from 'dotenv';
var db_centerNode = mysql.createPool({
    host : '34.142.151.50',
    user : 'root',
    password : '',
    database : 'Node' 
})
var db_pre1980 = mysql.createPool({
  host : '34.143.137.168',
  user : 'root',
  password : '',
  database : 'Node' 
})
var db_post1980 = mysql.createPool({
  host : '34.142.225.216',
  user : 'root',
  password : '',
  database : 'Node'
})
const testCenterNode = () => {
  
}
export const insert = async (req, res) => {
    const {title, dYear, genre,director, actor1, actor2} = req.body;
    const post={title: "damn", dYear: 1920, genre:"ej", director:"austin", actor1:"josh",actor2:"pakyu"}
    let sql = "INSERT INTO movies SET ?";
    var flag=0
    var backlog
    let test=db_centerNode.getConnection(async (err,connection)=>{
      if(err){  
        if(post.dYear<1980){
          console.log("Recovery Pre")

          insertLogPre1980(post);
          flag=1
          
        }
        else{
          console.log("Recovery Post")
          insertLogPost1980(post);
          flag=1
        }
      }
      else{
        
        console.log("Successfully Connected");
      }
      
    })
    if(flag==1){
      console.log("WoW");
    }
    backlog= await recoveryCheckCenter()
    await new Promise(res=> setTimeout(res,5000))
    console.log(backlog);
    var i;
    for(i=0;i<backlog.length;i++){
      console.log(backlog[i].sql_statement);
      await insertNodeCenter(backlog[i].sql_statement);
      await new Promise(res=> setTimeout(res,1000))
    }
    await new Promise(res=> setTimeout(res,5000))
    let query = db_centerNode.query(sql, post, (err,result)=>{
      if(err){
        console.log(err)
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
const recoveryCheckCenter = async ( ) =>{
  var queries;
  let test=db_pre1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err);
    }
    console.log("Successfully Connected");
  })
  let sql = `SELECT * FROM logs`
  let query = db_pre1980.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("read failure")
      
    }
    else{
      queries=result;
      
    }
  })
  await new Promise(res=> setTimeout(res,5000))
  console.log("HERE",queries);
  return queries;

  
}

const checkLogPost1980= () =>{
  let test=db_post1980.getConnection((err,connection)=>{
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
  let test=db_pre1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    } 
    console.log("Successfully Connected");
    console.log(post);
  })  
  let restore_sql = `INSERT INTO movies (title, dYear, genre, director, actor1, actor2) VALUES (${post.title},${post.dYear},${post.genre},${post.director},${post.actor1},${post.actor2})`
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
  let test=db_post1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })  
  let restore_sql = `INSERT INTO movies (title, dYear, genre, director, actor1, actor2) VALUES ("${post.title}",${post.dYear},"${post.genre}","${post.director}","${post.actor1}","${post.actor2}")`
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
  let test=db_pre1980.getConnection((err,connection)=>{
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

const insertNodeCenter= async(sql)=>{
  let test=db_centerNode.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })
  let query = db_centerNode.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("insert failure")
    }
    else{
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
  let test=db_post1980.getConnection((err,connection)=>{
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