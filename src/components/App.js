import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment } from '../actions';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <div>value: { this.props.value }</div>
        <button onClick={() => (this.props.increment(1))}>+1</button>
        <button onClick={() => (this.props.increment(3))}>+3</button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  value: state.count.value,
})

const mapDispatchToProps = dispatch => ({
  increment: (addValue) => dispatch(increment(addValue)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
