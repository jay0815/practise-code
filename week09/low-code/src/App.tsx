import React, { useEffect, useState } from 'react'
import './App.css'
import { Container } from './views/Container'

const App = () => {

  // const [state, setstate] = useState(0)

  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     console.log('123');
  //     setstate(new Date().valueOf());
  //   }, 500)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])
  // console.log(state);
  
  return (
    <div className="App">
      <Container />
    </div>
  )
}

export default App
