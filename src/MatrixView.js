import React, { Component } from 'react'
import MatrixStock from './MatrixStock'
import './css/MatrixView.css'

let lastRender = (new Date()).getTime()

class MatrixView extends Component {

  constructor(props){
    super(props)
    this.state = MatrixStock.subscribe(this,'setState')
  }


  componentWillUnmount(){
    MatrixStock.unsubscribe(this,'onReceiveData');
  }

  shouldComponentUpdate(){
    return this.props.position === this.props.current || this.state.lastTransition - lastRender < 0
  }

  render() {
    lastRender = (new Date()).getTime()
    var classPosition = getClassPosition('shadow scale',this.props.current,this.props.position)

    return <div className={classPosition}>{this.props.children}</div>
  }
}



function getClassPosition(defaultClass,current,position){
  let c = splitToPos(current)
  let p = splitToPos(position)
  let className = [defaultClass?defaultClass:'','matrix-view']

  if(current === position){
    className.push('matrix-current')
  }else{
    if(c.x < p.x) className.push('matrix-right')
    if(c.x > p.x) className.push('matrix-left')
    if(c.y < p.y) className.push('matrix-bottom')
    if(c.y > p.y) className.push('matrix-top')
  }
  return className.join(' ')
}

function splitToPos(pos){
  return pos.split('').reduce((res,splitted,i)=>{
    res[(i===0)?'x':'y'] = parseInt(splitted,10)
    return res
  },{})
}


export default MatrixView
