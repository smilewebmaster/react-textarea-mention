import React, {useEffect, useState} from 'react';
import './assets/style.css';

const Mention = () => {
  const id = 'mention-' + Date.now().toString() +  Math.random().toString(36).slice(-8);

  useEffect(() => {
    
  }, []);


  return <textarea id={id} cols="30" rows="10"></textarea>
}
export default Mention;