import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Answer from "./Answer";
import { insert } from "./action/actions";
import * as api from './action/api';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    paperWithBorder: {
      border: '1px solid #000000',
      padding: '10px',
      marginBottom:"20px",
      marginTop:"10px"
    },
  });
const View =() =>{
    const classes= useStyles();
    const [postData, setPostData] = useState({
        //initializes postData to the ff values. we set "setPostData" as the setter function for the state variable "postData"
        movie_id: 2, 
        isoLevel: "READ COMMITTED"
    });
    const [truth, setTruth] = useState(false);
    const [post, setPost] = useState(null);
    useEffect(() => {


        api.view(postData.movie_id, postData).then(res=>{
            
            if (res) {
                console.log(res);
                setPost(res.data[0]);
                console.log(post)
            }
        })
        .catch(err => {
            console.log(err);
            
          });
        
        
    }, [truth]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setTruth(!truth)
        
        
    };
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
    const clear = () => {
        setPostData({
            title:"",
            dYear: 0,
            genre:"",
            director:"",
            actor1:"",
            actor2:"",
          
        });
    };
    
    return(
        <div>
            <div>
                <Button onClick={setUncommited}>Read Uncommited</Button>
                <Button onClick={setCommited}>Read Commited</Button>
                <Button onClick={setRepeatable}>Repeatable Read</Button>
                <Button onClick={setSerializable}>Serializable</Button>
    
            </div>
            <Paper className={classes.paperWithBorder}>
            <form autoComplete="off" noValidate  onSubmit={handleSubmit} >
            

            <TextField
                type="number"
                name="movie id"
                variant="outlined"
                label="movie_id"
                fullWidth
                value={postData.movie_id}
                onChange={(e) => {
                    setPostData({ ...postData, movie_id: e.target.value });
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
            
            {post && (
                <Paper className={classes.paperWithBorder}>
                    <Typography>movie_id: {post.movie_id} </Typography>
                    <Typography>title: {post.title} </Typography>
                    <Typography>dYear: {post.dYear}</Typography>
                    <Typography>genre: {post.genre}</Typography>
                    <Typography>director: {post.director}</Typography>
                    <Typography>actor1: {post.actor1}</Typography>
                    <Typography>actor2: {post.actor2}</Typography>
                </Paper>
            )}
            
        </div>
    )
}

export default View;