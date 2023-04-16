import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Answer from "./Answer";
import { insert } from "./action/actions";
import * as api from './action/api';

const Delete =() =>{
    
    const [postData, setPostData] = useState({
        //initializes postData to the ff values. we set "setPostData" as the setter function for the state variable "postData"
        title:"",
        dYear: 0,
        genre:"",
        director:"",
        actor1:"",
        actor2:"",
    });
    useEffect(() => {
        console.log(postData);
        
        
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.insert(postData);
        console.log(postData);
        
        
    };
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
            <form autoComplete="off" noValidate  onSubmit={handleSubmit} >
            
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
            
        </div>
    )
}

export default Delete;