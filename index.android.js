'use strict';
 
var React = require('react');
var ReactNative = require('react-native');
var formatTime = require('minutes-seconds-milliseconds');
 
var {
  Alert,
  AppRegistry,
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} = ReactNative;
 
var sample = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>

          <View style={styles.timerWrapper}> 
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>

          <View style={styles.bottomWrapper}> 
            {this.startStopButton()}
            {this.lapButton()}
          </View> 

        </View> 

        <View style={styles.footer}>
          {this.laps()}
        </View>
        
      </View>
    );
  },
  laps: function() {
    return this.state.laps.map(function(time, index) {
      return(
        <View style={styles.lap} key={index}>
          <Text style={styles.lapText}>
            Lap #{index +1}
          </Text>
          <Text style={styles.lapText}>
            {formatTime(time)}
          </Text>
        </View>
      );
    });
  },
  startStopButton: function() {
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return(
      <TouchableHighlight 
        underlayColor={'grey'}
        onPress={this.handleStartPress}
        style={[styles.button, style]}
        >
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
    );
  },
  lapButton: function() {
    return(
      <TouchableHighlight 
        style={styles.button}
        underlayColor={'grey'}
        onPress={this.handleLapPress}>
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
    );
  },
  handleLapPress: function() {
    var lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  },
  handleStartPress: function() {
    console.log('start was pressed');
    if(this.state.running) {
      clearInterval(this.interval);
      this.setState({
        running: false
      });
      return;
    }

    this.setState({
      startTime: new Date()
    });

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 50)
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomWrapper: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});
 
AppRegistry.registerComponent('sample', () => sample);