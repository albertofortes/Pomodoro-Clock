import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faSync } from '@fortawesome/free-solid-svg-icons'

const Controls = (props) => (
  <div className="controls-wrapper">
    <div className="time-control">
      <span className="label" id="break-label">Break Length:</span>
      <span id="break-length" className="digit">{props.breakLength}</span>
      <div className="more-less">
        <button id="break-increment" value="+" data-stage="break" onClick={props.timeLenght}>+</button>
        <button id="break-decrement" value="-" data-stage="break" onClick={props.timeLenght}>-</button>
      </div>
    </div>

    <div className="time-control">
      <span className="label" id="session-label">Session Length:</span>
      <span id="session-length" className="digit">{props.sesionLength}</span>
      <div className="more-less">
        <button id="session-increment" value="+" data-stage="session" onClick={props.timeLenght}>+</button>
        <button id="session-decrement" value="-" data-stage="session" onClick={props.timeLenght}>-</button>
      </div>
    </div>

    <div className="btns">
      <button onClick={props.countDown}><FontAwesomeIcon icon={props.status ? faPause : faPlay} /></button>
      <button onClick={props.reset}><FontAwesomeIcon icon={faSync} /></button>
    </div>
  </div>
)

export default Controls;