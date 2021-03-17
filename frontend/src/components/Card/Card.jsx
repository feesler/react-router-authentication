import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const image = (props.image)
    ? <img src={props.image} className="card-img-top" alt={props.title}/>
    : null;

  const title = (props.title)
    ? <h5 className="card-title">{props.title}</h5>
    : null;

  const content = (props.content)
    ? <p className="card-text">{props.content}</p>
    : null;

  return (
    <div className="card">
      {image}
      <div className="card-body">
        {title}
        {content}
        {props.children}
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
};

Card.defaultProps = {
  title: '',
};

export default Card;

