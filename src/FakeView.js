import React, { Component } from 'react'

class FakeView extends Component {
  constructor(props){
    super(props)
    this.state = {
      num : 0
    }

    setInterval(()=>
      this.setState({
        num : this.state.num+1
      })
    ,1000)
  }

  shouldComponentUpdate(){
    return this.props.shouldRender//this.props.position === this.props.current || this.state.lastTransition - lastRender < 0
  }

  render() {
    return (
      <div className="fake-view">
        Hi! i am a fake view | {this.state.num}
      </div>
    );
  }
}

export default FakeView;
