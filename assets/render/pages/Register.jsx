import React, {Component} from 'react';
import SideNavbar from "../components/navbar/SideNavbar";
import TextInput from "../components/form/TextInput";
import SubmitButton from "../components/form/SubmitButton";
import axios from "axios";
import jwt from "jwt-decode";

const Register = () => {
    let [state, setState] = useState({
        user: {
            nickname: '',
            email: '',
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

/*    let registerSubmit = async (event) => {
        event.preventDefault();
        //@TODO Gestion de l'erreur invalid credentials
        const res = await axios.post(
            '/api/login',
            {
                username: state.user.username,
                password: state.user.password
            }
        );
        const token = res.data.token;
        localStorage.setItem('token', token);
        const userData = jwt(res.data.token)
        if (userData.roles.includes('ROLE_ADMIN')) {
            return navigate('/admin');
        } else {
            return navigate('/');
        }
    }*/

    return (
        <>
            <div className="page__container">
                <SideNavbar/>
                <div className={'register__page__container'}>
                    <img className={'register_picture'} src='https://i.imgur.com/rpFqZw7.png' alt='logo'/>
                    <form className={'register_form_container'} onSubmit={registerSubmit}>
                        <TextInput label={'Pseudonyme'} name={'nickname'} required={true} type={'text'}
                                   value={user.nickname}
                                   onChange={changeInput}/>
                        <TextInput label={'Email'} name={'username'} required={true} type={'text'}
                                   value={user.email}
                                   onChange={changeInput}/>
                        <TextInput label={'Mot de Passe'} name={'password'} required={true} type={'text'}
                                   value={user.password}
                                   onChange={changeInput}/>
                        <SubmitButton value={'S\'enregistrer !'}/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;
