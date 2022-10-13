import React from 'react';
import './App.css';
import Box from './Components/Box';
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
function App() {

  // STATE//
  const initial = 30
  const [roll, setroll] = React.useState(Generate())
  const [tenzies, settenzies] = React.useState(false)
  const [counter, setCounter] = React.useState(initial)
  const [NumofRolls, setNumOFRolls] = React.useState(0)

  // timer////
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => {
      clearInterval(timer)
    }
      ;
  }, [counter]);
  // /////


  //WINNING GAME ////
  React.useEffect(() => {
    const CheckallHeld = roll.every(die => die.isHeld)
    const CheckAllmatched = roll[0].value
    const CheckAll = roll.every(die => die.value === CheckAllmatched)
    if (CheckallHeld && CheckAll) {
      settenzies(true)
    }
  }, [roll])
  //////////////////


  // RETURNING random number
  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  ///////////////////////// 


  // GENERATING array //////
  function Generate() {
    const a = []
    for (let i = 0; i < 10; i++) {
      a.push(generateNewDice())
    }
    // //
    return a;
  }
  //////////////////////////


  // Rendering dice components////
  const mapping = roll.map((num) => {
    return <Box
      key={num.id}
      value={num.value}
      isHeld={num.isHeld}
      holdDice={() => holdDice(num.id)}
    />
  })
  ////////////////////////////////////


  // ROLL numbers button///////////

  function rollNum() {
    if (counter > 0 && !tenzies) {
      setroll(oldDice => oldDice.map(die => {
        return die.isHeld ? die :
          generateNewDice()

      }))
      track()
    }
    else {
      settenzies(false)
      setroll(Generate())
      setInterval(setCounter(initial))
      setNumOFRolls(0)
    }

  }
  //////////////////////////////////


  // MATCHING numbers/////////////////
  function holdDice(id) {
    setroll(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }
  ///////////////////////////////////////

  // NO OF ROLLS///
  function track() {
    setNumOFRolls(prev => prev + 1)
  }
  // /////////////
  return (
    <div className="App">
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      {(counter == 0 && !tenzies) && <p className='over'>Oops,you run out of time</p>}
      <p className='instructions'>Roll until all dice are the same. Click each die to <br></br> freeze it at its current value between rolls.</p>
      <div className='trackbox'>
        <h3 className='time'>Time Left : {counter}</h3>
        <h3 className='time'>No Of Rolls : {NumofRolls}</h3>
      </div>
      <div className='NumberBox'>
        {mapping}
      </div>
      <button onClick={rollNum}>
        {counter == 0 || tenzies ? "Reset" : "Roll"}
      </button>
    </div>
  );
}

export default App;
