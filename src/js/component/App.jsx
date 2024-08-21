import React, { useEffect, useState } from "react";
import SimpleCounter from "./SimpleCounter.jsx";
import calculateSeconds from "../time.js";
import { StopButton, ResumeButton, ResetButton } from "./Buttons.jsx";


function App() {
    const [counter, setCounter] = useState(0);
    const [countingUp, setCountingUp] = useState(true);
    const [startNumber, setStartNumber] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setCounter(prevCounter => {
                    if (countingUp) {
                        return prevCounter + 1;
                    } else {
                        if (prevCounter > 0) {
                            return prevCounter - 1;
                        } else {
                            setIsRunning(false);
                            alert("Time's up!");
                            // Change direction to counting up
                            setCountingUp(true);
                            return 0;
                        }
                    }
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, countingUp]);


    const handleInputChange = (event) => {
        setStartNumber(Number(event.target.value)); 
    };

    const startCountdown = () => {
        setCounter(startNumber); 
        setCountingUp(false); 
        setIsRunning(true);
    };

    const toggleCountingDirection = () => {
        if (!isRunning) {
            setCountingUp(prev => !prev);
            setIsRunning(true);
        } else {
            setCountingUp(prev => !prev);
        }
    };

    const handleStop = () => setIsRunning(false);

    const handleResume = () => {
        if (!isRunning && counter === 0 && !countingUp) {
            // If the counter is zero and not counting up, reset it to zero and start counting up
            setCounter(0);
            setCountingUp(true);
        }
        setIsRunning(true);
    };

    const handleReset = () => {
        setCounter(0);
        setIsRunning(false);
    };


    return (
        <>
            <SimpleCounter
                hundredThousandsDigit={calculateSeconds(counter, 100000)}
                tenThousandsDigit={calculateSeconds(counter, 10000)}
                thousandsDigit={calculateSeconds(counter, 1000)}
                hundredsDigit={calculateSeconds(counter, 100)}
                tensDigit={calculateSeconds(counter, 10)}
                onesDigit={calculateSeconds(counter, 1)}
            />
            <div className="button-container d-flex justify-content-between">
                <div className="countdown-timer-div">
                    <input type="number" value={startNumber} onChange={handleInputChange} />
                    <button onClick={startCountdown}>Start Countdown Timer</button>
                </div>
                <div className="center-buttons">
                    <ResumeButton onResume={handleResume} />
                    <StopButton onStop={handleStop} />
                    <ResetButton onReset={handleReset} />
                </div>    
                <button onClick={toggleCountingDirection}>
                    {countingUp ? "Switch to Count Down" : "Switch to Count Up"}
                </button>
            </div>
        </>
    );
}


export default App;