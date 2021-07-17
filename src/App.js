import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

//components
import {FullArticle} from './components/fullArticle/FullArticle';
import {ArticlesList} from './components/articlesList/ArticlesList';

const App = () => {

    return(
        <Router>
            <Switch>
                <Route path='/' exact component={ArticlesList}></Route>
                <Route path='/article' exact component={FullArticle}></Route>
            </Switch>
        </Router>
    )
}

export default App;