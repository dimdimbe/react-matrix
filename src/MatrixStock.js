// AppStock.js
import React from 'react'
import Stockage from './stockage'

let Views = []

class MatrixStock extends Stockage{

  constructor(){
    super({
      options : {
        storage : 'MatrixStock'
      }
    });
  }

  init(state,newState){
    state = newState
    state.lastTransition=0
    return state
  }


  setViews(views){
    Views = views.map(y=>y.map(x=>!!x))
  }

  transformViews(views){
    return views.map((yy,y)=>
                          yy.map((xx,x)=>
                              <xx key={x+''+y} x={x} y={y}></xx>))
  }

  test(state){
    state.test++
    return state
  }

  goTo(state,direction){
    let {x,y} = state
    let views = [...Views]
    if(direction && typeof direction === 'string'){
      switch (direction) {
        case 'top':
          if(views[y-1]&&views[y-1][x]) state = to.call(this,state,0,-1)
          break;
        case 'left':
          if(views[y]&&views[y][x-1]) state = to.call(this,state,-1,0)
          break;
        case 'right':
          if(views[y]&&views[y][x+1]) state = to.call(this,state,1,0)
          break;
        case 'bottom':
          if(views[y+1]&&views[y+1][x]) state = to.call(this,state,0,1)
          break;
        default:
      }
    }else{
      state = to.call(this,state,direction.x-state.x,direction.y-state.y)
    }
    return state

    function to(state,x,y){
      state.y += y
      state.x += x
      state.lastTransition = (new Date()).getTime()
      return state
    }
  }

}

let matrixStock = new MatrixStock();
export default matrixStock;
