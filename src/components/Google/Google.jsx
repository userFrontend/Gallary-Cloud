import { GoogleLogin } from '@react-oauth/google';
import React from 'react'

const Google = () => {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
       <div id="signInButton">
            <GoogleLogin 
                onSuccess={responseMessage} 
                onError={errorMessage} 
            />
       </div>
    )
}

export default Google