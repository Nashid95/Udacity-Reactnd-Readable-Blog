import React, { Component } from 'react';
import './App.css';
import HomePage from './view/HomePage';
import PostPage from './view/PostPage';
import Post from './view/Post';
import Notfound from './view/Notfound';
import Category from './view/Category';
import {Route , Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';
import './styles/main.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data',
      
    }
  }





  render() {
    return (
      <div className="app">
        <div className="uk-width-1-1 uk-align-center">
        <nav className="uk-navbar-container uk-margin" data-uk-navbar="mode: hover">
            <div className="uk-navbar-center">
                <ul className="uk-navbar-nav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/post">New Post</Link></li>
                </ul>
            </div>
        </nav>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (<HomePage posts={this.props.posts}/>)}/>
          <Route
            exact
            path="/post"
            render={() => (<PostPage posts={this.props.posts}/>)}/>
          
          <Route
            exact
            path={`/:category/:postId`}
            render={() => (<Post/>)}/>
          <Route
            exact
            path={`/:category`}
            render={() => (<Category/>)}/>
          <Route
            path="*" component={Notfound}/>
          
            </Switch>
        </div>

      </div>
    );
  }
}




export default App