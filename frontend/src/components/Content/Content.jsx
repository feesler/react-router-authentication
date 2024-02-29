import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Banner from '../Banner/Banner.jsx';
import Article from '../Article/Article.jsx';
import NewsList from '../NewsList/NewsList.jsx';
import Page404 from '../Page404/Page404.jsx';

function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" Component={Banner} />
        <Route path="/news/:id" Component={Article} />
        <Route path="/news" Component={NewsList} />
        <Route Component={Page404} />
      </Routes>
    </div>
  )
}

export default Content;
