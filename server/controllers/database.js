import mysql from "mysql2";
import dotenv from 'dotenv';
var db_centerNode = mysql.createPool({
    host : '34.142.151.50',
    user : 'root',
    password : '',
    connectTimeout: 2000, 
    database : 'Node',
    isolationLevel: 'READ COMMITTED'
})
var db_pre1980 = mysql.createPool({
  host : '34.143.137.168',
  user : 'root',
  password : '',
  connectTimeout: 2000, 
  database : 'Node',
  isolationLevel: 'READ COMMITTED'
})
var db_post1980 = mysql.createPool({
  host : '34.142.225.216',
  user : 'root',
  password : '',
  connectTimeout: 2000, 
  database : 'Node',
  isolationLevel: 'READ COMMITTED'
})
const testCenterNode = () => {
  
}
export const insert = async (req, res) => {
    const {title, dYear, genre,director, actor1, actor2, isoLevel} = req.body;
    const post={title: title, dYear: dYear, genre:genre, director:director, actor1:actor1,actor2:actor2}
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
        await new Promise(res=> setTimeout(res,2000))
        backlog= await recoveryCheckCenterPre1980()
        await new Promise(res=> setTimeout(res,3000))
    
        var i;
        if(backlog){
          for(i=0;i<backlog.length;i++){
            console.log(backlog[i].sql_statement);
            await executeNodeCenter(backlog[i].sql_statement);
  
            await new Promise(res=> setTimeout(res,1000))
          }
         
        }
        backlog2= await recoveryCheckCenterPost1980()
        await new Promise(res=> setTimeout(res,2000))

        if(backlog2){
          for(i=0;i<backlog2.length;i++){
            console.log(backlog2[i].sql_statement);
            await executeNodeCenter(backlog2[i].sql_statement);
  
            await new Promise(res=> setTimeout(res,1000))
          }
          
        }
        let isoQuery=db_centerNode.query(`SET TRANSACTION ISOLATION LEVEL ${isoLevel}`,async (err,result)=>{
          if(err){
            console.log("Error Commiting1");
          }
          else{
            console.log("Begun1");
          }
        })
        await new Promise(res=> setTimeout(res,500))
        let beginQuery=db_centerNode.query("START TRANSACTION",async (err,result)=>{
          if(err){
            console.log("Error Commiting2");
          }
          else{
            console.log("Begun2");
          }
        });
        await new Promise(res=> setTimeout(res,500))
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
  await new Promise(res=> setTimeout(res,3000))
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
  await new Promise(res=> setTimeout(res,3000))
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
  let sql = `SELECT * FROM logs WHERE node<1980`
  let query = db_centerNode.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("read failure")
      
    }
    else{
      queries=result;
      
    }
  })
  await new Promise(res=> setTimeout(res,3000))
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
  let sql = `SELECT * FROM logs WHERE node>=1980`
  let query = db_centerNode.query(sql, (err,result)=>{
    if(err){
      console.log(err);
      console.log("read failure")
      
    }
    else{
      queries=result;
      
    }
  })
  await new Promise(res=> setTimeout(res,3000))
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
  let beginQuery=db_pre1980.query("START TRANSACTION",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });  
  let restore_sql = `INSERT INTO movies (movie_id, title, dYear, genre, director, actor1, actor2) VALUES (${post.movie_id},'${post.title}','${post.dYear}','${post.genre}','${post.director}','${post.actor1}','${post.actor2}')`
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
  let beginQuery=db_centerNode.query("START TRANSACTION",async (err,result)=>{
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
  let beginQuery=db_post1980.query("START TRANSACTION",async (err,result)=>{
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
  let beginQuery=db_pre1980.query("START TRANSACTION",async (err,result)=>{
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
  let beginQuery=db_centerNode.query("START TRANSACTION",async (err,result)=>{
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
  let beginQuery=db_post1980.query("START TRANSACTION",async (err,result)=>{
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
      if(backlog){
        for(i=0;i<backlog.length;i++){
          console.log(backlog[i].sql_statement);
          await executeNodePre1980(backlog[i].sql_statement);
          await new Promise(res=> setTimeout(res,1000))
        }
      }
      
      await new Promise(res=> setTimeout(res,5000))
      let beginQuery=db_pre1980.query("START TRANSACTION",async (err,result)=>{
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
  let beginQuery=db_centerNode.query("START TRANSACTION",async (err,result)=>{
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
      var sql2;
      if(sql.charAt(0)=='U' || sql.charAt(0)=='D'){
        console.log("ID CHECK:", sql.substring(sql.indexOf("WHERE")+16).replace("'",""))
        sql2 = `SELECT * FROM movies WHERE movie_id = ${sql.substring(sql.indexOf("WHERE")+16).replace("'","")}`
      }
      else{
        sql2 = `SELECT * FROM movies WHERE movie_id = ${result.insertId}`
      }
      
      let mode = result.changedRows
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
                  
                  if(result[0]?.dYear<1980){
                    
                    if(sql.charAt(0)=='U'){

                      await updateNodePre1980(sql)
                      
                    }
                    else if(sql.charAt(0)=='D'){
                      await deleteNodePre1980(sql)
                    }

                    else{
                      await insertNodePre1980(result[0])
                    }
                    
                  }
                  else{
                    
                    if(sql.charAt(0)=='U'){

                      await updateNodePost1980(sql)
                      
                    }
                    else if(sql.charAt(0)=='D'){
                      await deleteNodePost1980(sql)
                    }

                    else{
                      await insertNodePost1980(result[0])
                    }
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
  let beginQuery=db_post1980.query("START TRANSACTION",async (err,result)=>{
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
  let beginQuery=db_pre1980.query("START TRANSACTION",async (err,result)=>{
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
      if(backlog){
        for(i=0;i<backlog.length;i++){
          console.log(backlog[i].sql_statement);
          await executeNodePost1980(backlog[i].sql_statement);
          await new Promise(res=> setTimeout(res,1000))
        }
      }
      
      await new Promise(res=> setTimeout(res,5000))
      let beginQuery=db_post1980.query("START TRANSACTION",async (err,result)=>{
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

export const updateRecord = async (req, res) => {
  const {movie_id, title, dYear, genre,director, actor1, actor2, oldYear, isoLevel} = req.body;

  const post={movie_id: movie_id, title: title, dYear: dYear, genre:genre, director:director, actor1:actor1,actor2:actor2}
  let sql = `UPDATE movies SET title='${post.title}', dYear=${post.dYear}, genre='${post.genre}', director='${post.director}', actor1='${post.actor1}', actor2='${post.actor2}' WHERE movie_id='${post.movie_id}'`;
  var flag=0
  var backlog, backlog2
  
  let test=db_centerNode.getConnection(async (err,connection)=>{
    
    if(err){  
      

      if(oldYear<1980){
        console.log("Recovery Pre")

        await updateLogPre1980(post);
        flag=1
        
      }
      else{
        console.log("Recovery Post")
        await updateLogPost1980(post);
        flag=1
      }
      return res.json("Main Node Down");
    }
    else{
      console.log(post);
      console.log("Successfully Connected");
      await new Promise(res=> setTimeout(res,2000))
      backlog= await recoveryCheckCenterPre1980()
      await new Promise(res=> setTimeout(res,2000))

      var i;
      if(backlog){
        for(i=0;i<backlog.length;i++){
          console.log(backlog[i].sql_statement);
          await executeNodeCenter(backlog[i].sql_statement);

          await new Promise(res=> setTimeout(res,1000))
        }
        await new Promise(res=> setTimeout(res,2000))
      }
      backlog2= await recoveryCheckCenterPost1980()
      await new Promise(res=> setTimeout(res,2000))

      if(backlog2){
        for(i=0;i<backlog2.length;i++){
          console.log(backlog2[i].sql_statement);
          await executeNodeCenter(backlog2[i].sql_statement);

          await new Promise(res=> setTimeout(res,1000))
        }
        await new Promise(res=> setTimeout(res,2000))
      }
      let isoQuery=db_centerNode.query(`SET TRANSACTION ISOLATION LEVEL ${isoLevel}`,async (err,result)=>{
        if(err){
          console.log("Error Commiting1");
        }
        else{
          console.log("Begun1");
        }
      });
      let beginQuery=db_centerNode.query("START TRANSACTION",async (err,result)=>{
        if(err){
          console.log(err);
        }
        else{
          console.log("Begun2");
        }
      });
      await new Promise(res=> setTimeout(res,2000))
      let query = db_centerNode.query(sql, (err,result)=>{
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
                  console.log("Error Commiting At Main Node");
                }
                else{
                  console.log("Main Node Update Commited");
                  console.log(post.dYear);
                  if(oldYear<1980){
                    await updateNodePre1980(sql);
                  }
                  else{
                    await updateNodePost1980(sql);
                  }
                  return res.json("Success")
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
const updateLogCenter =async (restore_sql, year) =>{
  let test=db_centerNode.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    } 
    console.log("Successfully Connected");
    
  })
  let beginQuery=db_centerNode.query("START TRANSACTION",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });  
  
  let sql = `INSERT INTO logs (sql_statement, node) VALUES ("${restore_sql}",${year})`
  let query = db_centerNode.query(sql,  (err,result)=>{
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
const updateNodePre1980= async (sql)=>{

  var backlog;
  let test=db_pre1980.getConnection(async (err,connection)=>{
    if(err){  
      console.log("Dead node 3");
      await updateLogCenter(sql,1979);
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
      let beginQuery=db_pre1980.query("START TRANSACTION",async (err,result)=>{
        if(err){
          console.log("Error Commiting");
        }
        else{
          console.log("Begun");
        }
      });
      let query = db_pre1980.query(sql, (err,result)=>{
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
const updateNodePost1980= async (sql)=>{

  var backlog;
  let test=db_post1980.getConnection(async (err,connection)=>{
    if(err){  
      console.log("Dead node 3");
      await updateLogCenter(sql,1981);
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
      let beginQuery=db_post1980.query("START TRANSACTION",async (err,result)=>{
        if(err){
          console.log("Error Commiting");
        }
        else{
          console.log("Begun");
        }
      });
      let query = db_post1980.query(sql, (err,result)=>{
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
const updateLogPost1980 =async (post) =>{
  let test=db_post1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })
  let beginQuery=db_post1980.query("START TRANSACTION",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });  
  let restore_sql = `UPDATE movies SET title='${post.title}', dYear=${post.dYear}, genre='${post.genre}', director='${post.director}', actor1='${post.actor1}', actor2='${post.actor2}' WHERE movie_id='${post.movie_id}'`
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

const updateLogPre1980 =async (post) =>{
  let test=db_pre1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })
  let beginQuery=db_pre1980.query("START TRANSACTION",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });  
  let restore_sql = `UPDATE movies SET title='${post.title}', dYear=${post.dYear}, genre='${post.genre}', director='${post.director}', actor1='${post.actor1}', actor2='${post.actor2}' WHERE movie_id='${post.movie_id}'`
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

export const deleteRecord = async (req, res) => {
  const {oldYear,isoLevel} = req.body;
  const id=req.params.id
  const testYear=1972
  let sql = `DELETE FROM movies WHERE movie_id='${id}'`;
  var flag=0
  var backlog, backlog2
  let test=db_centerNode.getConnection(async (err,connection)=>{
    
    if(err){  
      

      if(oldYear<1980){
        console.log("Recovery Pre")

        await deleteActionLogPre1980(sql);
        flag=1
        
      }
      else{
        console.log("Recovery Post")
        await deleteActionLogPost1980(sql);
        flag=1
      }
      return res.json("Main node is down");
    }
    else{

      console.log("Successfully Connected");
      await new Promise(res=> setTimeout(res,2000))
      backlog= await recoveryCheckCenterPre1980()
      await new Promise(res=> setTimeout(res,2000))
      console.log(backlog);
      var i;
      if(backlog){
        for(i=0;i<backlog.length;i++){
          console.log(backlog[i].sql_statement);
          await executeNodeCenter(backlog[i].sql_statement);

          await new Promise(res=> setTimeout(res,1000))
        }
        await new Promise(res=> setTimeout(res,2000))
      }
      backlog2= await recoveryCheckCenterPost1980()
      await new Promise(res=> setTimeout(res,2000))
      console.log(backlog2);
      if(backlog2){
        for(i=0;i<backlog2.length;i++){
          console.log(backlog2[i].sql_statement);
          await executeNodeCenter(backlog2[i].sql_statement);

          await new Promise(res=> setTimeout(res,1000))
        }
        await new Promise(res=> setTimeout(res,2000))
      }
      let isoQuery=db_centerNode.query(`SET TRANSACTION ISOLATION LEVEL ${isoLevel}`,async (err,result)=>{
          if(err){
            console.log(err);
          }
          else{
            console.log("Begun1");
          }
        });
        await new Promise(res=> setTimeout(res,500))
        let beginQuery=db_centerNode.query("START TRANSACTION",async (err,result)=>{
          if(err){
            console.log("Error Commiting2");
          }
          else{
            console.log("Begun2");
          }
        });
      await new Promise(res=> setTimeout(res,2000))
      let query = db_centerNode.query(sql, (err,result)=>{
        if(err){
          console.log(err)
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
              db_centerNode.query(commitQuery,async (err,result)=>{
                if(err){
                  console.log("Error Commiting");
                }
                else{
                  console.log("Commited");
    
                  if(oldYear<1980){

                    await deleteNodePre1980(sql);
                  }
                  else{
                    await deleteNodePost1980(sql);
                  }
                  return res.json("Delete success");
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

const deleteNodePre1980= async (sql)=>{

  var backlog;
  let test=db_pre1980.getConnection(async (err,connection)=>{
    if(err){  
      console.log("Dead node 2");
      await updateLogCenter(sql,1979);
    }
    else{
      console.log("Successfully Connected");
      await new Promise(res=> setTimeout(res,2000))
      backlog= await recoveryCheckPre1980Center()
      await new Promise(res=> setTimeout(res,2000))
      console.log(backlog);
      var i;
      if(backlog){
        for(i=0;i<backlog.length;i++){
          console.log(backlog[i].sql_statement);
          await executeNodePre1980(backlog[i].sql_statement);
          await new Promise(res=> setTimeout(res,1000))
        }
        await new Promise(res=> setTimeout(res,2000))
      }
      
      let beginQuery=db_pre1980.query("START TRANSACTION",async (err,result)=>{
        if(err){
          console.log("Error Commiting");
        }
        else{
          console.log("Begun");
        }
      });
      let query = db_pre1980.query(sql, (err,result)=>{
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
const deleteNodePost1980= async (sql)=>{

  var backlog;
  let test=db_post1980.getConnection(async (err,connection)=>{
    if(err){  
      console.log("Dead node 3");

      await updateLogCenter(sql,1981);
    }
    else{
      console.log("Successfully Connected");
      await new Promise(res=> setTimeout(res,2000))
      backlog= await recoveryCheckPost1980Center()
      await new Promise(res=> setTimeout(res,2000))
      console.log(backlog);
      var i;
      if(backlog){
        for(i=0;i<backlog.length;i++){
          console.log(backlog[i].sql_statement);
          await executeNodePost1980(backlog[i].sql_statement);
          await new Promise(res=> setTimeout(res,1000))
        }
        await new Promise(res=> setTimeout(res,2000))
      }
      
      let beginQuery=db_post1980.query("START TRANSACTION",async (err,result)=>{
        if(err){
          console.log("Error Commiting");
        }
        else{
          console.log("Begun");
        }
      });
      let query = db_post1980.query(sql, (err,result)=>{
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
const deleteActionLogPost1980 =async (restore_sql) =>{
  let test=db_post1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })
  let beginQuery=db_post1980.query("START TRANSACTION",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });  
  let sql = `INSERT INTO logs (sql_statement) VALUES ("${restore_sql}")`
  let query = db_post1980.query(sql, (err,result)=>{
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

const deleteActionLogPre1980 =async (restore_sql) =>{
  let test=db_pre1980.getConnection((err,connection)=>{
    if(err){  
      console.log(err)
    }
    console.log("Successfully Connected");
  })
  let beginQuery=db_pre1980.query("START TRANSACTION",async (err,result)=>{
    if(err){
      console.log("Error Commiting");
    }
    else{
      console.log("Begun");
    }
  });  

  let sql = `INSERT INTO logs (sql_statement) VALUES ("${restore_sql}")`
  let query = db_pre1980.query(sql, (err,result)=>{
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

export const setUncommited = async (req, res) => {
  
  let sql = `SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED`;
  let query = db_centerNode.query(sql, (err,result)=>{
    if(err){
      console.log(err)
    }

  });
  
  let query4 = db_pre1980.query(sql, (err,result)=>{
    if(err){
      console.log(err)
    }
    console.log(result);

  });
  
  let query6 = db_post1980.query(sql, (err,result)=>{
    if(err){
      console.log(err)
    }
    console.log(result);

  });
  await new Promise(res=> setTimeout(res,2000))
  console.log("Isolation Level Set to Read Uncommited");
};

export const setCommited = async (req, res) => {
  let sql2 = `SET AUTOCOMMIT=0`;
  let query2 = db_centerNode.query(sql2, (err,result)=>{
    if(err){
      console.log(err)
    }


  });
  let sql = `SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED`;
  let query = db_centerNode.query(sql, (err,result)=>{
    if(err){
      console.log(err)
    }


  });
  let query4 = db_pre1980.query(sql2, (err,result)=>{
    if(err){
      console.log(err)
    }


  });
  let query3 = db_pre1980.query(sql, (err,result)=>{
    if(err){
      console.log(err)
    }


  });
  let query5 = db_post1980.query(sql2, (err,result)=>{
    if(err){
      console.log(err)
    }

  });
  let query6 = db_post1980.query(sql, (err,result)=>{
    if(err){
      console.log(err)
    }


  });
  await new Promise(res=> setTimeout(res,3000))

  console.log("Isolation Level Set to Read Commited");
};
export const setRepeatable = async (req, res) => {
  let sql2 = `SET AUTOCOMMIT=0`;
  let query2 = db_centerNode.query(sql2, (err,result)=>{
    if(err){
      console.log(err)
    }

    
  });
  let sql = `SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ`;
  let query = db_centerNode.query(sql, (err,result)=>{
    if(err){
      console.log(err)
    }


  });
  let query4 = db_pre1980.query(sql2, (err,result)=>{
    if(err){
      console.log(err)
    }


  });
  let query3 = db_pre1980.query(sql, (err,result)=>{
    if(err){
      console.log(err)
    }


  });
  let query5 = db_post1980.query(sql2, (err,result)=>{
    if(err){
      console.log(err)
    }

  });
  let query6 = db_post1980.query(sql, (err,result)=>{
    if(err){
      console.log(err)
    }

    
  });
  await new Promise(res=> setTimeout(res,2000))
  console.log("Isolation Level Set to Read Repeatable");
};
export const setSerializable = async (req, res) => {
  let sql2 = `SET AUTOCOMMIT=0`;
  let query2 = db_centerNode.query(sql2, (err,result)=>{
    if(err){
      console.log(err)

    }

  });
  let sql = `SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE`;
  let query = db_centerNode.query(sql, (err,result)=>{
    if(err){
      console.log(err)

    }


  });
  let query4 = db_pre1980.query(sql2, (err,result)=>{
    if(err){
      console.log(err)

    }


  });
  let query3 = db_pre1980.query(sql, (err,result)=>{
    if(err){
      console.log(err)

    }


  });
  let query5 = db_post1980.query(sql2, (err,result)=>{
    if(err){
      console.log(err)

    }

  });
  let query6 = db_post1980.query(sql, (err,result)=>{
    if(err){
      
      console.log(err)

    }
    
  });
  await new Promise(res=> setTimeout(res,2000))
  console.log("Isolation Level Set to Read Serializable");
};
export const viewRecords = async (req, res) => {
    const id = (req.params.id-1)*10
    var records=[]
    let sql = `SELECT * FROM movies LIMIT 10 OFFSET ${id}`;
    let beginsql = `BEGIN`;
    let test1=db_pre1980.getConnection((err,connection)=>{
      if(err){  
        console.log(err)

      }

    })
    let test2=db_post1980.getConnection((err,connection)=>{
      if(err){  
        console.log(err)

      }

    })
    let beginquery = db_pre1980.query(beginsql, (err,result)=>{
      if(err){
        console.log(err)

      }
    });
    let query1 = db_pre1980.query(sql, (err,result)=>{
      if(err){
        console.log(err)

      }
      else{
        records.push(...result)
      }
    });
    let query4 = db_pre1980.query("COMMIT", (err,result)=>{
      if(err){
        console.log(err)
  
      }
      else{
        
      }
    });
    let beginquery2 = db_post1980.query(beginsql, (err,result)=>{
      if(err){
        console.log(err)
       
      }
    });
    let query2 = db_post1980.query(sql, (err,result)=>{
      if(err){
        console.log(err)
        
      }
      else{
        records.push(...result)
      }
    });
    let query3 = db_post1980.query("COMMIT", (err,result)=>{
      if(err){
        console.log(err)
        
      }
      else{
        
      }
    });
    
    await new Promise(res=> setTimeout(res,20000))
    records.sort((a, b) => a.movie_id - b.movie_id);

    res.json(records);
};


export const viewRecord = async (req, res) => {
    const {isoLevel} = req.body;
    let sql = `SELECT * FROM movies WHERE movie_id = ${req.params.id}`;
    var result1;
    let beginsql = `START TRANSACTION`;
    let test1=db_centerNode.getConnection((err,connection)=>{
      if(err){  
        console.log(err)
        
      }

    })

    let tranCount=db_centerNode.query(`SELECT @@autocommit`,async (err,result)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log(result[0])
        if(result[0]['@@autocommit']==1){
          let isoQuery=db_centerNode.query(`SET TRANSACTION ISOLATION LEVEL ${isoLevel}`,async (err,result)=>{
            if(err){
      
            }
            else{
          
            }
          });
        }
        
      }
    });
  
    
    await new Promise(res=> setTimeout(res,500))
    let beginQuery=db_centerNode.query("START TRANSACTION",async (err,result)=>{
      if(err){
        console.log(err)
      }
      else{

      }
    });
    await new Promise(res=> setTimeout(res,500))
    let query = db_centerNode.query(sql, (err,result)=>{
      if(err){
        console.log(err)
        
      }
      else{
        console.log(result)
        result1=result
      }

      
      
    });
    let query3 = db_centerNode.query("COMMIT", (err,result)=>{
      if(err){
        console.log(err)
        
      }
      else{
        
      }
    });
    
    await new Promise(res=> setTimeout(res,2000))
    
    res.json(result1);
};