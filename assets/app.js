import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './render/index.scss';
import Home from './render/pages/Home';
import Login from './render/pages/Login';
import Register from './render/pages/Register';
import World from "./render/pages/World";
import WorldStats from "./render/pages/WorldStats";

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path={'/'} element={<Home/>}/>
                    <Route exact path={'login'} element={<Login/>}/>
                    <Route exact path={'register'} element={<Register/>}/>
                    <Route exact path={'worlds'} element={<World/>}/>
                    <Route exact path={'worlds/:worldSlug'} element={<WorldStats/>}/>
                </Routes>
            </Router>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
