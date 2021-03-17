import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import Banner from '../Banner/Banner.jsx';
import NewsList from '../NewsList/NewsList.jsx';
import NewsView from '../NewsView/NewsView.jsx';
import Page404 from '../Page404/Page404.jsx';

function Content(props) {
  const { profile } = useAuth();

  return (
    <div className="content">
      <Switch>
        <Route path="/" exact component={Banner} />
        <Route path="/news/:id" component={NewsList} />
        <Route path="/news" component={NewsList} />
        <Route component={Page404} />
      </Switch>
    </div>
  )
}

Content.propTypes = {
};

export default Content;
