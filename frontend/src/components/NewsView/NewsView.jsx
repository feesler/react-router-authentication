import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

function NewsView() {
  const { id } = useParams();

  return (
    <></>
  );
}

NewsView.propTypes = {
};

export default NewsView;
