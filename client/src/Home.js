import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Answer from "./Answer";
import { insert } from "./action/actions";
import * as api from './action/api';
import {
    BrowserRouter,
    Routes,
    Route,
    Redirect,
    withRouter,
    useNavigate,
  } from "react-router-dom";
  const useStyles = makeStyles({
    paperWithBorder: {
      border: '1px solid #000000',
      padding: '10px',
      marginBottom:"20px",
      marginTop:"10px"
    },
  });
const Home =() =>{
    const navigate = useNavigate();
    const [posts,setPosts] = useState();
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(true);
    const [postData, setPostData] = useState({
        //initializes postData to the ff values. we set "setPostData" as the setter function for the state variable "postData"
        movie_id:0,
        title:"",
        dYear: 0,
        genre:"",
        director:"",
        actor1:"",
        actor2:"",
        oldYear:0,
        isoLevel:"READ COMMITTED"
    });
    const myStyle = {
        padding: "20px",
    }
    const classes= useStyles();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(postData);
        await api.update(postData);
        
        
        
    };
    const handleSubmit3 = async (e) => {
        e.preventDefault();
        setPostData({...postData, movie_id: Number(postData.movie_id),oldYear: Number(postData.oldYear) })
        console.log(postData);
        await api.delete1(postData.movie_id, postData);
        
        
        
    };
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        console.log(page);
        setLoading(!loading)

    };
    useEffect(() => {
        var test;
        
        api.viewall(page).then(res=>{
            
            if (res) {
                console.log(res);
                setPosts(res.data);
            }
        })
        .catch(err => {
            console.log(err);
            
          });
        
        
        
    }, [loading]);
    
 
    
    const moveInsert = ()=>{
        navigate('/insert')
    }
    const moveView = ()=>{
        navigate('/view')
    }
    const setUncommited= async ()=>{
        setPostData({...postData, isoLevel:"READ UNCOMMITTED"})
    }
    const setCommited= async ()=>{
        setPostData({...postData, isoLevel:"READ COMMITTED"})
    }
    const setRepeatable= async ()=>{
        setPostData({...postData, isoLevel:"REPEATABLE READ"})
    }
    const setSerializable= async ()=>{
        setPostData({...postData, isoLevel:"SERIALIZABLE"})
    }
    const wow = (post)=>{
        console.log(post.movie_id)
    }
    return(
     <>

        <div>
            <Button onClick={moveInsert}>Insert</Button>
            <Button onClick={moveView}>View</Button>
 
        </div>
        <div>
            <Button onClick={setUncommited}>Read Uncommited</Button>
            <Button onClick={setCommited}>Read Commited</Button>
            <Button onClick={setRepeatable}>Repeatable Read</Button>
            <Button onClick={setSerializable}>Serializable</Button>
 
        </div>
        <Paper className={classes.paperWithBorder}>
        <Typography>Delete</Typography>
        <form autoComplete="off" noValidate  onSubmit={handleSubmit3} >
        <TextField
            type="number"
            name="Movie ID"
            variant="outlined"
            label="Movie ID"
            fullWidth
            value={postData.movie_id}
            onChange={(e) => {
                setPostData({ ...postData, movie_id: e.target.value });
            }}
        /> 
        <TextField
            type="number"
            name="Old Year"
            variant="outlined"
            label="Old Year"
            fullWidth
            value={postData.oldYear}
            onChange={(e) => {
                setPostData({ ...postData, oldYear: e.target.value });
            }}
        />    
        <Button
            
            variant="contained"
            size="large"
            type="submit"
            fullWidth
        >
            Submit{" "}
        </Button>
        </form>
        </Paper>
        <Paper className={classes.paperWithBorder}>
        <Typography>Update</Typography>
        <form autoComplete="off" noValidate  onSubmit={handleSubmit} >
        <TextField
            type="number"
            name="Movie ID"
            variant="outlined"
            label="Movie ID"
            fullWidth
            value={postData.movie_id}
            onChange={(e) => {
                setPostData({ ...postData, movie_id: e.target.value });
            }}
        />    
        <TextField
            
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) => {
                setPostData({ ...postData, title: e.target.value });
            }}
        />
        <TextField
            type="number"
            name="old year"
            variant="outlined"
            label="old year"
            fullWidth
            value={postData.oldYear}
            onChange={(e) => {
                setPostData({ ...postData, oldYear: e.target.value });
            }}
        />
        <TextField
            type="number"
            name="year"
            variant="outlined"
            label="Year"
            fullWidth
            value={postData.dYear}
            onChange={(e) => {
                setPostData({ ...postData, dYear: e.target.value });
            }}
        />
        <TextField
            
            name="genre"
            variant="outlined"
            label="Genre"
            fullWidth
            value={postData.genre}
            onChange={(e) => {
                setPostData({ ...postData, genre: e.target.value });
            }}
        />
        <TextField
            
            name="director"
            variant="outlined"
            label="Director"
            fullWidth
            value={postData.director}
            onChange={(e) => {
                setPostData({ ...postData, director: e.target.value });
            }}
        />
        <TextField
            
            name="actor1"
            variant="outlined"
            label="actor1"
            fullWidth
            value={postData.actor1}
            onChange={(e) => {
                setPostData({ ...postData, actor1: e.target.value });
            }}
        />
        <TextField
            
            name="actor2"
            variant="outlined"
            label="actor12"
            fullWidth
            value={postData.actor2}
            onChange={(e) => {
                setPostData({ ...postData, actor2: e.target.value });
            }}
        />
        <Button
            
            variant="contained"
            size="large"
            type="submit"
            fullWidth
        >
            Submit{" "}
        </Button>
        </form>
        </Paper>
        {(posts && posts.length > 0) && posts.map(post=>(
        <Paper className={classes.paperWithBorder}>
            <Typography>movie_id: {post.movie_id} </Typography>
            <Typography>title: {post.title} </Typography>
            <Typography>dYear: {post.dYear}</Typography>
            <Typography>genre: {post.genre}</Typography>
            <Typography>director: {post.director}</Typography>
            <Typography>actor1: {post.actor1}</Typography>
            <Typography>actor2: {post.actor2}</Typography>
        </Paper>))
        

        }
        <Paper className={classes.paperWithBorder}>
        <form autoComplete="off" noValidate  onSubmit={handleSubmit2} >
        <TextField
            
            name="Page Number"
            variant="outlined"
            label="Page Number"
            fullWidth
            
            onChange={(e) => {
                setPage(e.target.value);
            }}
        />    
        
        <Button
            
            variant="contained"
            size="large"
            type="submit"
            fullWidth
        >
            Submit{" "}
        </Button>
        </form>
        </Paper>
    </>
    )
}

export default Home;