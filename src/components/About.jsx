import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a = useContext (noteContext);

  useEffect(()=>{
    a.update();
  }, [])

  return (
    <div>
      This is About {a.state.name} ans he is in class {a.state.class}
    </div>
  )
}

export default About;
