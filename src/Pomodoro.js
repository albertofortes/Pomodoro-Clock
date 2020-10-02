import React from 'react';
import {Helmet} from "react-helmet";
import Canvas from './components/Canvas'
import Controls from './components/Controls'
import './Pomodoro.scss';


let intervalID;

class PomodoroApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      circlePercentage: 0,
      circleSize: 300,
      stage: 'session',
      timer: 1500, // 25' * 60" () Break: 5' = 300
      timerTotal: 1500,
      timerProgressPercentual: 0,
      timerStatus: false,
      timerBreakLength: 5,
      timerSesionLength: 25
    };
    
    //this.audioBeep = React.createRef();

    this.resetCountdown = this.resetCountdown.bind(this);
    this.setTimeLenght = this.setTimeLenght.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
  }

  _percentage(total, partial) {
    var c = (parseFloat(partial)*100) / parseFloat(total);
    return parseFloat(c);
  }

  startCountdown() {
    if(!this.state.timerStatus) {
      intervalID = setInterval( () => {
        this.decrementTimer();
        this.manageCountdowns();
      }, 1000);
    } else {
      clearInterval(intervalID);
      this.setState({
        timerStatus: false
      });
    }
  }

  manageCountdowns() {
    let timer = this.state.timer;

    if(timer === 0) this.audioBeep.play();

    if( timer < 0 ) {
      clearInterval(intervalID);

      if( this.state.stage === 'session' ) {
        this.setState({
            timerStatus: false,
            stage: 'break',
            timer: this.state.timerBreakLength * 60,
            timerTotal: this.state.timerBreakLength * 60,
            circlePercentage: 0
          });
      } else {
        this.setState({
          timerStatus: false,
          stage: 'session',
          timer: this.state.timerSesionLength * 60,
          timerTotal: this.state.timerSesionLength * 60,
          circlePercentage: 0
        });
      }

      this.startCountdown();
    }
  }

  decrementTimer() {
    let percentage = this._percentage( this.state.timerTotal, this.state.timerProgressPercentual);

    this.setState({
      circlePercentage: percentage,
      timerProgressPercentual: this.state.timerProgressPercentual + 1,
      timerStatus: true,
      timer: this.state.timer - 1
    });
  }

  resetCountdown() {
    clearInterval(intervalID);

    this.setState({
      circlePercentage: 0,
      circleSize: 300,
      stage: 'session',
      timer: 1500,
      timerTotal: 1500,
      timerProgressPercentual: 0,
      timerStatus: false,
      timerBreakLength: 5,
      timerSesionLength: 25
    });

    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;

    const beepUrl = "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
          audio = new Audio(beepUrl);
    audio.play();
  }

  setTimeLenght(e) {
    const action = e.currentTarget.value,
          stage = e.currentTarget.dataset.stage;

    let duration = 0;

    if( this.state.timerStatus ) return; // is playing do nothing

    switch (stage) {
      case 'session':
        duration = this.state.timerSesionLength;

        if( action === "-" && duration !== 1 ) {
          this.setState({
            timerSesionLength: duration - 1
          });
        } else if ( action === "+" && duration !== 60 ) {
          this.setState({
            timerSesionLength: duration + 1
          });
        }

        if( this.state.stage === 'session' ) {
          if( action === "-" && duration !== 1 ) {
            this.setState({
              timer: duration * 60 - 60,
              timerTotal: duration * 60 - 60
            });
          } else if ( action === "+" && duration !== 60 ) {
            this.setState({
              timer: duration * 60 + 60,
              timerTotal: duration * 60 + 60
            });
          }
        }
        break;

      case 'break':
        duration = this.state.timerBreakLength;

        if( action === "-" && duration !== 1 ) {
          this.setState({
            timerBreakLength: duration - 1
          });
        } else if ( action === "+" && duration !== 60 ) {
          this.setState({
            timerBreakLength: duration + 1
          });
        }

        if( this.state.stage === 'break' ) {
          if( action === "-" && duration !== 1 ) {
            this.setState({
              timerBreakLength: duration - 1,
              timer: duration * 60 - 60,
              timerTotal: duration * 60 - 60
            });
          } else if ( action === "+" && duration !== 60 ) {
            this.setState({
              timerBreakLength: duration + 1,
              timer: duration * 60 + 60,
              timerTotal: duration * 60 + 60
            });
          }
         }
        break;

      default:
        console.log('ERROR: no stage.');
        break
    }
  }

  watchCountdown() {
      let minutes = Math.floor(this.state.timer / 60);
      let seconds = this.state.timer - minutes * 60;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      return minutes + ':' + seconds;
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>A React Pomodoro Clock APP</title>
          <meta name="description" content="A simple Pomodoro clock made with React by Alberto Fortes" />
        </Helmet>

        <div className="wrapper">
          <div className="pomodoro">
            <h1>React Pomodoro Clock</h1>
            <div className="timer-wrapper">
              <h2 id="timer-label" className="label">{this.state.stage}</h2>
              <div id="time-left" className="time-left"> {this.watchCountdown()}</div>
              <Canvas circlePercentage={this.state.circlePercentage} circleSize={this.state.circleSize} />
            </div>
            <div className="copyright">
              <a href="https://www.albertofortes.com" title="Freelance Front-end Javascript engineer">Alberto Fortes</a>
            </div>
            <Controls
              countDown={this.startCountdown}
              reset={this.resetCountdown}
              status={this.state.timerStatus}
              timeLenght={this.setTimeLenght}
              breakLength={this.state.timerBreakLength}
              sesionLength={this.state.timerSesionLength} />
            <audio id="beep" preload="auto" src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg" ref={(audio) => { this.audioBeep = audio; }} />
          </div>
        </div>
      </>
    );
  }
}

export default PomodoroApp;
