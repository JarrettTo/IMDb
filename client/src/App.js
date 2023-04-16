import React, { useState, useEffect } from "react";
import Insert from "./Insert";
import Home from "./Home";
import View from "./View";
import Delete from "./Delete";
import { TextField, Button, Typography, Paper, Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Answer from "./Answer";
import {
    BrowserRouter,
    Routes,
    Route,
    Redirect,
    withRouter,
    useHistory,
  } from "react-router-dom";

const App =() =>{
    
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
        <Paper >
      
        <BrowserRouter>
           
         
            {" "}
            {/*equivalent of a div, lg means large*/}
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/insert" Component={Insert} />
                <Route path="/view" Component={View} />
                
            </Routes>
        

        </BrowserRouter>
        </Paper>
    )
}

export default App;