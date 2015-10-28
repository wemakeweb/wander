import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { createHistory } from 'history';

import FeedView from './components/feed';
import PostView from './components/post';

let history = createHistory();

render((
  <Router history={history}>
    <Route path="/" component={FeedView} />
    <Route path="/:id" component={PostView} />
  </Router>
), document.getElementById('react-root'));