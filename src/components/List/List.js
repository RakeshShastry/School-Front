import React from 'react';
import Box from '../Box/Box';
import axios from 'axios';
export default(props) => {
  const items = props.items || [];
    return(
    <div className="list">
        <h2>{props.header}</h2>
        {
          items.map((item, index)=>
          <Box key={index} id={item.id} css={item.css} click={props.click} text={item.text} />)
        }
    </div>
  );
}