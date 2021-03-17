import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import Card from '../Card/Card.jsx';

const newsUrl = process.env.REACT_APP_NEWS_URL;

function NewsList() {
  const { profile, sendRequest } = useAuth();
  const [news, setNews] = useState([]);

  useEffect(() => {
    let canceled = false;

    const requestNews = async () => {
      if (!canceled) {
        setNews([]);
      }

      const result = await sendRequest(newsUrl);
      if (!canceled && result) {
        if (Array.isArray(result.data)) {
          setNews([...result.data]);
        } else {
          setNews(null);
        }
      }
    }

    if (profile) {
      requestNews();
    }

    return () => { canceled = true; };
  }, [profile, sendRequest]);

  if (!profile) {
    return null;
  }

  return (
    <div className="news-list">
      { news.map((item) =>
        <Link key={item.id} to={`/news/${item.id}`} className="card-link">
          <Card {...item} />
        </Link>
      )}
    </div>
  )
}

export default NewsList;
