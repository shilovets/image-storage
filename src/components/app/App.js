import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';

import Header from "../header/header";
import ImagesList from "../images-list/images-list";
import AddImages from "../add-images/add-images";

const App = () => {
    return (
        <BrowserRouter>
            <div className='jumbotron'>
                <Header/>

                <Switch>
                    <Route path='/' exact render={() => <h2 className='hello-text'>Welcome to the images storage</h2>}/>
                    <Route path='/imagesList' component={ImagesList}/>
                    <Route path='/addImage' component={AddImages}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;