import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import Page404 from '../Page404/Page404.jsx';
import Card from '../Card/Card.jsx';

const newsUrl = process.env.REACT_APP_NEWS_URL;

function NewsList() {
  const { id } = useParams();
  const { profile, sendRequest } = useAuth();
  const [news, setNews] = useState([]);

  useEffect(() => {
    let canceled = false;

    const requestNews = async (itemId) => {
      if (!canceled) {
        setNews([]);
      }

      const reqUrl = (itemId)
        ? `${newsUrl}/${itemId}`
        : newsUrl;
      const result = await sendRequest(reqUrl);
      if (!canceled && result) {
        if (result.data) {
          setNews((itemId) ? result.data : [...result.data]);
        } else {
          setNews(null);
        }
      }
    }

    if (profile) {
      requestNews(id);
    }

    return () => { canceled = true; };
  }, [id, profile]);

  console.log('[NewsList] id: ', id, 'news:', news);

  if (!profile) {
    return null;
  }

  if (!news) {
    return <Page404 />;
  }


  const isList = Array.isArray(news);

  return (
    <div className="news-list">
      { !isList && <Card {...news} />}
      { isList && news.map((item) =>
        <Link key={item.id} to={`/news/${item.id}`}>
          <Card {...item} />
        </Link>
      )}
    </div>
  )
}

export default NewsList;
