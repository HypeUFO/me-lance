import React, { Component } from 'react';

import Stopwatch from './timer.component';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from './time-tracker.actions'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TimeTrackerModal from './time-tracker-modal.component';

const options = {
  container: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 5,
    width: 150,
    height: '100%',
    display: 'inline-block',
    color: '#076',
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    marginLeft: 7,
  }
};

class TimeTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      totalDuration: 90000,
      stopwatchReset: false,
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true})
    this.props.handleClearStartTime(this.props.userId);
  }

  startTimer() {
    let startTime = new Date().getTime();
    this.props.handleSaveStartTime(startTime, true, this.props.userId)

  }

  stopTimer() {
    let stopTime = new Date().getTime();
    this.props.handleSaveTimerStop(stopTime, false, this.props.userId);
    this.props.handleTimeModal();
  }

  render() {
    return (
      <div id={this.props.id} style={this.props.style} className="col-xs-12">
        <h4 style={{display: "inline-block", color: this.props.textColor, marginRight: 5}} >Timetracker</h4>
        <Stopwatch msecs start={this.props.user.timerRunning}
          startTime={this.props.user.timerStart}
          reset={this.state.stopwatchReset}
          options={options}/>
          {!this.props.user.timerRunning ?
        <RaisedButton label="Start" buttonStyle={{height: 30, lineHeight: '30px'}} style={{margin: '0px 1px'}} onTouchTap={this.startTimer} /> :
        <RaisedButton label="Stop" buttonStyle={{height: 30, lineHeight: '30px'}} style={{margin: '0px 1px'}} onTouchTap={this.stopTimer} />
          }
        <RaisedButton label="Reset" buttonStyle={{height: 30, lineHeight: '30px'}} style={{margin: '0px 1px'}} onTouchTap={this.resetStopwatch} />
        <TimeTrackerModal formId={this.props.formId} />
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        timerStart: state.timeTrackerReducer.timerStart,
        timerStop: state.timeTrackerReducer.timerStop,
        userId: state.loginReducer.user.userId,
        user: state.loginReducer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleTimerStart: actions.handleTimerStart,
        handleTimerStop: actions.handleTimerStop,
        handleTimeModal: actions.handleTimeModal,
        handleSaveStartTime: actions.handleSaveStartTime,
        handleSaveTimerStop: actions.handleSaveTimerStop,
        handleClearStartTime: actions.handleClearStartTime,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTracker);