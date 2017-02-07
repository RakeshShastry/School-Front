import React from 'react';

export default(props) => {
  return(
    <div className="box">
      <div className={props.css} data-id={props.id} onClick={props.click}>{props.text}</div>
    </div>
  );
};