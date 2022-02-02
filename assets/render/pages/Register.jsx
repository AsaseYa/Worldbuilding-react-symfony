import React, {useState} from 'react';
import SideNavbar from "../components/navbar/SideNavbar";
import TextInput from "../components/form/TextInput";
import SubmitButton from "../components/form/SubmitButton";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let [state, setState] = useState({
        user: {
            nickname: '',
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

    let registerSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(
                '/api/register', {
                    nickname: state.user.nickname,
                    username: state.user.username,
                    password: state.user.password
                }
            );
            let response = JSON.parse(res.request.response);
            if (response.success) {
                setLoading(false);
                navigate('/login');
            } else {
                setError(response.content);
                setLoading(false);
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="page__container">
                <SideNavbar/>
                <div className={'register__page__container'}>
                    <div className={'register_container'}>
                        <img className={'register_picture'} src='https://i.imgur.com/rpFqZw7.png' alt='logo'/>
                        <form className={'register_form_container'} onSubmit={registerSubmit}>
                            {loading && <div className={'loading'}>A moment please...</div>}
                            {error && (
                                <span
                                    className={'register_form_error'}>{error}</span>
                            )}
                            <TextInput label={'Pseudonyme'} name={'nickname'} required={true} type={'text'}
                                       value={user.nickname}
                                       onChange={changeInput}/>
                            <TextInput label={'Email'} name={'username'} required={true} type={'email'}
                                       value={user.username}
                                       onChange={changeInput}/>
                            <TextInput label={'Mot de Passe'} name={'password'} required={true} type={'password'}
                                       value={user.password}
                                       onChange={changeInput}/>
                            <SubmitButton value={'S\'enregistrer !'}/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
