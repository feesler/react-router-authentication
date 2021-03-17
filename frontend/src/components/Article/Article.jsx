import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import Page404 from '../Page404/Page404.jsx';
import Card from '../Card/Card.jsx';

const newsUrl = process.env.REACT_APP_NEWS_URL;

function Article() {
  const { id } = useParams();
  const { profile, sendRequest } = useAuth();
  const [article, setArticle] = useState(undefined);

  useEffect(() => {
    let canceled = false;

    const requestArticle = async (itemId) => {
      const reqUrl = `${newsUrl}/${itemId}`;
      const result = await sendRequest(reqUrl);
      if (!canceled && result) {
        if (result.data) {
          setArticle(result.data);
        } else {
          setArticle(null);
        }
      }
    }

    if (profile) {
      requestArticle(id);
    }

    return () => { canceled = true; };
  }, [id, profile, sendRequest]);

  if (!profile) {
    return null;
  }

  if (article === null) {
    return <Page404 />;
  }

  return (
    <div className="news-list">
      <Card {...article} />
    </div>
  )
}

export default Article;
