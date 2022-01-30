import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './render/index.scss';
import Home from './render/pages/Home';
import Login from './render/pages/Login';
import Register from './render/pages/Register';

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path={'/'} element={<Home />}/>
                    <Route path={'login'} element={<Login />}/>
                    <Route path={'register'} element={<Register />}/>
                </Routes>
            </Router>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
