import { Typography } from '@mui/material';
import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import API_URL from './API_URL';

export default function Google() {
    const navigate = useNavigate()

    const responseSuccessGoogle = async (response) => {
        console.log(response)
        const userData = {
            tokenId: response.tokenId
        }
        const result = await API_URL.post('/googlelogin', userData)
        console.log(result)
        localStorage.setItem('token', result.data.token)
        navigate('/form')
    }
    const responseErrorGoogle = (response) => {

    }
    return (
        <GoogleLogin
            clientId="131234865270-aivpq1o8ag1rrsq48p7jgnbb4laoie1a.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}
