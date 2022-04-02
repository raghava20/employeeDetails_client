import React from 'react'
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';
import API_URL from './API_URL';
import { AiFillFacebook } from "react-icons/ai";

export default function Facebook() {
    const navigate = useNavigate()

    const responseFacebook = async (response) => {
        console.log(response)
        const userData = {
            accessToken: response.accessToken,
            userID: response.userID
        }
        const result = await API_URL.post('/facebooklogin', userData)
        console.log(result)
        localStorage.setItem('token', result.data.token)
        navigate('/form')
    }
    return (
        <FacebookLogin
            appId="512932440399441"
            autoLoad={false}
            callback={responseFacebook}
            icon={<AiFillFacebook />}
            size="small"
        />
    )
}
