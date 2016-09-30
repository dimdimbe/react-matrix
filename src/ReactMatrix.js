import React, { Component } from 'react'
import MatrixView from './MatrixView'
import MatrixStock from './MatrixStock'

//animations
import './css/scale.css'

class ReactMatrix extends Component {

    componentWillMount(){
      this.state = MatrixStock.subscribe(this,'setState')

      if(!(typeof this.state.x === 'number' && typeof this.state.y === 'number')){
        MatrixStock.action('init')({
          x : this.props.x,
          y : this.props.y,
          from : null
        })
      }

      MatrixStock.setViews(this.props.views)
    }

    componentWillUnmount(){
      MatrixStock.unsubscribe(this,'setState');
    }

    render(){
      let views = this.props.views.reduce(transformToMatrixComponent.bind(this),[])
      return <div>{views}</div>
    }

  }

  function transformToMatrixComponent(tab, row,y){
    row.forEach((elem,x)=>{
      if(elem) {
        let props = {
          position : x+''+y,
          current : this.state.x+''+this.state.y,
          key: x+''+y
        }
        tab.push( React.createElement(MatrixView,props,React.createElement(elem,null,null)))
      }
    })

    return tab
  }

export default ReactMatrix;
