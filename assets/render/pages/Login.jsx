import React, {useEffect, useReducer, useState} from 'react';
import axios from "axios";
import jwt from 'jwt-decode'
import {useNavigate} from "react-router-dom";
import TextInput from "../components/form/TextInput";
import SubmitButton from "../components/form/SubmitButton";
import SideNavbar from "../components/navbar/SideNavbar";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let [state, setState] = useState({
        user: {
            username: '',
            password: ''
        }
    });

    let {user} = state;

    let changeInput = (event) => {
        setState((state) => ({
            user: {
                ...state.user,
                [event.target.name]: event.target.value,
            }
        }));
    }

    let loginSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(
                '/api/login',
                {
                    username: state.user.username,
                    password: state.user.password
                }
            );
            setError(null);
            const token = res.data.token;
            localStorage.setItem('token', token);
            const userData = jwt(res.data.token)
            if (userData.roles.includes('ROLE_ADMIN')) {
                return navigate('/admin');
            } else {
                return navigate('/');
            }
        } catch (err) {
            setError(JSON.parse(err.request.response));
            setState({
                user: {
                    username: '',
                    password: ''
                }
            })
        } finally {
            setLoading(false);
        }

    }


    return (
        <>
            <div className="page__container">
                <SideNavbar/>
                <div className="login__page__container">
                    <div className={'login_container'}>
                        <img className={'login_picture'} src='https://i.imgur.com/rpFqZw7.png' alt='logo'/>
                        <form className={'login_form_container'} onSubmit={loginSubmit}>
                            {loading && <div className={'loading'}>A moment please...</div>}
                            {error && (
                                <span className={'login_form_error'}>{`Les identifiants sont incorrects: ${error.message}`}</span>
                            )}
                            <TextInput label={'Email'} name={'username'} required={true} type={'text'}
                                       value={user.username}
                                       onChange={changeInput}/>
                            <TextInput label={'Mot de passe'} name={'password'} required={true} type={'password'}
                                       value={user.password} onChange={changeInput}/>
                            <SubmitButton value={'Connection !'}/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;