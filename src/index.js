import React from 'react'
import ReactDOM from 'react-dom'
import ReactMatrix from './ReactMatrix'
import FakeView from './FakeView'
import MatrixStock from './MatrixStock'

import './css/index.css'

window.addEventListener('keydown',onKeyDown.bind(this))
window.debug = function(d){
  let className = 'app'+((d === true)?' debug':'')
  document.getElementById('root').className = className
}
window.debug(true)

const matrix = [
  [null,FakeView,null],
  [null,FakeView,FakeView],
  [FakeView,FakeView,null]
]

ReactDOM.render(
  <ReactMatrix views={matrix} x={1} y={0}/>,
  document.getElementById('root')
);

function onKeyDown(event){
  let keycode = [37,38,39,40]
  if(keycode.indexOf(event.keyCode) !== -1) MatrixStock.action('goTo')((event.keyCode === 37)?'left':
                                                                       (event.keyCode === 38)?'top':
                                                                       (event.keyCode === 39)?'right':'bottom')
  return false;
}
