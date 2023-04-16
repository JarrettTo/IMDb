import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const Answer =({input})=>{
    const [result, setResult] = useState({
        //Contains the input in binary. Use this state variable to formulate the answer and solution.
        M:"",
        nM:"",
        Q:"",
        A:""
    });
    const textToBinary = async() => {
        console.log("WOW")
        if(input.format==0){
            input.dividend=parseInt(input.dividend,10).toString(2)
            input.divisor=parseInt(input.divisor,10).toString(2)
            setResult({...result, Q: input.dividend, A: '0000', M:input.divisor});
        }
        
    
        
    };
    useEffect(() => {
        if(input.format==0){
            textToBinary();
        }
        else{
            setResult({...result, Q: input.dividend, A: '0000', M:input.divisor});
        }
        
    }, [input]);
    return(
      
            <>
                {result.Q!="" && (
                    <>
                    <div>Dividend: {result.Q}</div>
                    <div>Divisor: {result.M}</div>
                    </>
                )}
            </>
        
    )
}

export default Answer;