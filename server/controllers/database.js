import mysql from "mysql";
import dotenv from 'dotenv';
var db_centerNode = mysql.createPool({
    host : '34.142.151.50',
    user : 'root',
    password : '',
    connectTimeout: 2000, 
    database : 'Node' 
})
var db_pre1980 = mysql.createPool({
  host : '34.143.137.168',
  user : 'root',
  password : '',
  connectTimeout: 2000, 
  database : 'Node' 
})
var db_post1980 = mysql.createPool({
  host : '34.142.225.216',
  user : 'root',
  password : '',
  connectTimeout: 2000, 
  database : 'Node'
})
const testCenterNode = () => {
  
}
export const insert = async (req, res) => {
    const {title, dYear, genre,director, actor1, actor2} = req.body;
    const post={title: "damn", dYear: 1990, genre:"ej", director:"austin", actor1:"josh",actor2:"pakyu"}
    let sql = "INSERT INTO movies SET ?";
    var flag=0
    var backlog, backlog2
    let test=db_centerNode.getConnection(async (err,connection)=>{
      
      if(err){  
        

        if(post.dYear<1980){
          console.log("Recovery Pre")

          await insertLogPre1980(post);
          flag=1
          
        }
        else{
          console.log("Recovery Post")
          await insertLogPost1980(post);
          flag=1
        }
      }
      else{

        console.log("Successfully Connected");
        await new Promise(res=> setTimeout(res,6000))
        backlog= await recoveryCheckCenterPre1980()
        await new Promise(res=> setTimeout(res,5000))
        console.log(backlog);
        var i;
        if(backlog){
          for(i=0;i<backlog.length;i++){
            console.log(backlog[i].sql_statement);
            await executeNodeCenter(backlog[i].sql_statement);
  
            await new Promise(res=> setTimeout(res,1000))
          }
          await new Promise(res=> setTimeout(res,5000))
        }
        backlog2= await recoveryCheckCenterPost1980()
        await new Promise(res=> setTimeout(res,5000))
        console.log(backlog2);
        if(backlog2){
          for(i=0;i<backlog2.length;i++){
            console.log(backlog2[i].sql_statement);
            await executeNodeCenter(backlog2[i].sql_statement);
  
            await new Promise(res=> setTimeout(res,1000))
          }
          await new Promise(res=> setTimeout(res,5000))
        }
        let beginQuery=db_centerNode.query("BEGIN",async (err,result)=>{
          if(err){
            console.log("Error Commiting");
          }
          else{
            console.log("Begun");
          }
        });
        await new Promise(res=> setTimeout(res,2000))
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
                db_centerNode.query(commitQuery,async (err,result)=>{
                  if(err){
                    console.log("Error Commiting");
                  }
                  else{
                    console.log("Commited");
                    console.log(post.dYear);
                    if(post.dYear<1980){
                      await insertNodePre1980(post);
                    }
                    else{
                      await insertNodePost1980(post);
                    }
                  }
                });
              }
            });
            
            
          }
          
        });
      }
      
    })
    if(flag==1){
      console.log("WoW");
    }
    else{

    
      
    }
};


const recoveryCheckCenterPre1980 = async ( ) =>{
  var queries;
  let test=db_pre1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err);
      return null;
    }
    console.log("Successfully Connected2");
  })
  let sql = `SELECT * FROM logs`
  let query = db_pre1980.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("read failure")
      return null;
    }
    else{
      queries=result;
      
    }
  })
  await new Promise(res=> setTimeout(res,5000))
  console.log("HERE",queries);
  return queries;

  
}
const recoveryCheckCenterPost1980 = async ( ) =>{
  var queries;
  let test=db_post1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err);
      return null;
    }
    console.log("Successfully Connected");
  })
  let sql = `SELECT * FROM logs`
  let query = db_post1980.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("read failure")
      return null;
    }
    else{
      queries=result;
      
    }
  })
  await new Promise(res=> setTimeout(res,5000))
  console.log("HERE",queries);
  return queries;

  
}

const recoveryCheckPre1980Center = async ( ) =>{
  var queries;
  let test=db_centerNode.getConnection((err,connection)=>{
    if(err){  
      console.log(err);
    }
    console.log("Successfully Connected");
  })
  let sql = `SELECT * FROM logs`
  let query = db_centerNode.query(sql, (err,result)=>{
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

const recoveryCheckPost1980Center = async ( ) =>{
  var queries;
  let test=db_centerNode.getConnection((err,connection)=>{
    if(err){  
      console.log(err);
    }
    console.log("Successfully Connected");
  })
  let sql = `SELECT * FROM logs`
  let query = db_centerNode.query(sql, (err,result)=>{
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

const insertLogPre1980 =async (post) =>{
  let test=db_pre1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    } 
    console.log("Successfully Connected");
    console.log(post);
  })
  let beginQuery=db_pre1980.query("BEGIN",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });  
  let restore_sql = `INSERT INTO movies (title, dYear, genre, director, actor1, actor2) VALUES ('${post.title}','${post.dYear}','${post.genre}','${post.director}','${post.actor1}','${post.actor2}')`
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

const insertLogCenter =async (post) =>{
  let test=db_centerNode.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    } 
    console.log("Successfully Connected");
    console.log(post);
  })
  let beginQuery=db_centerNode.query("BEGIN",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });  
  let restore_sql = `INSERT INTO movies (title, dYear, genre, director, actor1, actor2) VALUES ('${post.title}','${post.dYear}','${post.genre}','${post.director}','${post.actor1}','${post.actor2}')`
  let sql = `INSERT INTO logs (sql_statement, node) VALUES ("${restore_sql}","${post.dYear}")`
  let query = db_centerNode.query(sql, post, (err,result)=>{
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
  })
  

}


const deleteLogPost1980 =async (sql2) =>{
  let test=db_post1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    } 
    console.log("Successfully Connected");

  })
  let beginQuery=db_post1980.query("BEGIN",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });  
  let sql = `DELETE FROM logs WHERE sql_statement="${sql2}"`
  let query = db_post1980.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("insert failure")
    }
    else{
      console.log(result);
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
const deleteLogPre1980 =async (sql2) =>{
  let test=db_pre1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    } 
    console.log("Successfully Connected");

  })
  let beginQuery=db_pre1980.query("BEGIN",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });  
  let sql = `DELETE FROM logs WHERE sql_statement="${sql2}"`
  let query = db_pre1980.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("insert failure")
    }
    else{
      console.log(result);
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

const deleteLogCenter =async (sql2) =>{
  let test=db_centerNode.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    } 
    console.log("Successfully Connected");

  })
  let beginQuery=db_centerNode.query("BEGIN",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });  
  let sql = `DELETE FROM logs WHERE sql_statement="${sql2}"`
  let query = db_centerNode.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("insert failure")
    }
    else{
      console.log(result);
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
  })
  

}
const insertLogPost1980 =async (post) =>{
  let test=db_post1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })
  let beginQuery=db_post1980.query("BEGIN",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });  
  let restore_sql = `INSERT INTO movies (title, dYear, genre, director, actor1, actor2) VALUES ('${post.title}',${post.dYear},'${post.genre}','${post.director}','${post.actor1}','${post.actor2}')`
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

const insertNodePre1980= async (post)=>{
  let sql = "INSERT INTO movies SET ?";
  var backlog;
  let test=db_pre1980.getConnection(async (err,connection)=>{
    if(err){  
      console.log("Dead node 3");
      await insertLogCenter(post);
    }
    else{
      console.log("Successfully Connected");
      await new Promise(res=> setTimeout(res,6000))
      backlog= await recoveryCheckPre1980Center()
      await new Promise(res=> setTimeout(res,5000))
      console.log(backlog);
      var i;
      for(i=0;i<backlog.length;i++){
        console.log(backlog[i].sql_statement);
        await executeNodePre1980(backlog[i].sql_statement);
        await new Promise(res=> setTimeout(res,1000))
      }
      await new Promise(res=> setTimeout(res,5000))
      let beginQuery=db_pre1980.query("BEGIN",async (err,result)=>{
        if(err){
          console.log("Error Commiting");
        }
        else{
          console.log("Begun");
        }
      });
      let query = db_pre1980.query(sql, post, (err,result)=>{
        if(err){
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
    
  })
  
}



const executeNodeCenter= async(sql)=>{
  let test=db_centerNode.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })
  let beginQuery=db_centerNode.query("BEGIN",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });
  let query = db_centerNode.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("insert failure")
    }
    else{
      let sql2 = `SELECT * FROM movies WHERE movie_id = ${result.insertId}`
      console.log(result);
      const sleepQuery="DO SLEEP(10)";
      db_centerNode.query(sleepQuery,(err,result)=>{
        if(err){
          console.log("Error Sleeping");
        }
        else{
          console.log("Slept");
          const commitQuery="COMMIT";
          
          db_centerNode.query(commitQuery,async (err,result)=>{
            if(err){
              console.log("Error Commiting");
            }
            else{
              console.log("Successful");
              db_centerNode.query(sql2, async (err, result)=>{
                if(err){
                  console.log(err);
                }
                else{
                  if(result[0].dYear<1980){
                    await insertNodePre1980(result[0])
                  }
                  else{
                    await insertNodePost1980(result[0])
                  }
                  
                }
              })
              await deleteLogPost1980(sql)
              await deleteLogPre1980(sql)
            }
          });
        }
      });
      
    }
    
  });
}

const executeNodePost1980= async(sql)=>{
  let test=db_post1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })
  let beginQuery=db_post1980.query("BEGIN",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });
  let query = db_post1980.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("insert failure")
    }
    else{
      console.log(result);
      const sleepQuery="DO SLEEP(10)";
      db_post1980.query(sleepQuery,(err,result)=>{
        if(err){
          console.log("Error Sleeping");
        }
        else{
          console.log("Slept");
          const commitQuery="COMMIT";
          
          db_post1980.query(commitQuery,async (err,result)=>{
            if(err){
              console.log("Error Commiting");
            }
            else{
              console.log("Successful");
              await deleteLogCenter(sql)
            }
          });
        }
      });
      
    }
    
  });
}

const executeNodePre1980= async(sql)=>{
  let test=db_pre1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })
  let beginQuery=db_pre1980.query("BEGIN",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });
  let query = db_pre1980.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("insert failure")
    }
    else{
      console.log(result);
      const sleepQuery="DO SLEEP(10)";
      db_pre1980.query(sleepQuery,(err,result)=>{
        if(err){
          console.log("Error Sleeping");
        }
        else{
          console.log("Slept");
          const commitQuery="COMMIT";
          
          db_pre1980.query(commitQuery,async (err,result)=>{
            if(err){
              console.log("Error Commiting");
            }
            else{
              console.log("Successful");
              await deleteLogCenter(sql)
            }
          });
        }
      });
      
    }
    
  });
}

const insertNodePost1980= async (post)=>{
  let sql = "INSERT INTO movies SET ?";
  var backlog;
  let test=db_post1980.getConnection(async (err,connection)=>{
    if(err){  
      console.log("Dead node 3");
      await insertLogCenter(post);
    }
    else{
      
      console.log("Successfully Connected");
      await new Promise(res=> setTimeout(res,6000))
      backlog= await recoveryCheckPost1980Center()
      await new Promise(res=> setTimeout(res,5000))
      console.log(backlog);
      var i;
      for(i=0;i<backlog.length;i++){
        console.log(backlog[i].sql_statement);
        await executeNodePost1980(backlog[i].sql_statement);
        await new Promise(res=> setTimeout(res,1000))
      }
      await new Promise(res=> setTimeout(res,5000))
      let beginQuery=db_post1980.query("BEGIN",async (err,result)=>{
        if(err){
          console.log("Error Commiting");
        }
        else{
          console.log("Begun");
        }
      });
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
    
  })
  
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
    let sql = `SELECT * FROM movies WHERE movie_id = ${req.params.id}`;
    let query = db_centerNode.query(sql, (err,result)=>{
      if(err){
        throw err;
      }
      console.log(result);
      res.send("DONE");
    });
};