import React from 'react'

interface Props{
    texts: string[];

    onClick: (text : string)=> void;
}

const Button = ({texts, onClick}:Props) => {
    

    return (
        <>
            {texts.map((text)=>(
            <button 
                className="btn btn-primary"
                onClick={()=>console.log({ text })}
            >
                { text }
            </button>            
            
            ))};
            
        </>
    )
}

export default Button