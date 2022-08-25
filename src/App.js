import DropDown from './components/DropDown'
import AskBid from './components/AskBid'
import './App.css';
import { React, useState } from 'react';

const App = () => {
  const [currTicker, setTicker] = useState("")
  return (
    <div id="App">
      <DropDown setTicker={setTicker}/>
      <AskBid ticker={currTicker}/>
    </div>
  )
}

export default App
