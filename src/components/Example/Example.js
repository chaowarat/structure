import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Example.css'
import { builder } from './stringBuilder'
// import { addTodo } from 'Redux/actions'

class Example extends Component {
  state = {
    pre: 'Hello!'
  }

  onSaveClick = () => {
    /* don't do like this 
    const data = { fullText: this.state.pre + ' ' + this.props.name }
    */

    /* Might pass "this" as param instead */
    const { name } = this.props
    const { pre } = this.state
    const data = builder(pre, name)

    /* don't expect this will fails */
    /* don't test the others package or library */
    sessionStorage.setItem('fullText', JSON.stringify(data))

    /* calling outside function may use mock fn to test */
    this.props.onSaveFinish && this.props.onSaveFinish()

 //   this.props.addTodo && this.props.addTodo(data)
  }

  render() {
    const { name } = this.props
    const { pre } = this.state
    return (
      <div className="example-container">
        <div className="example-body">Example Component</div>
        <div className="example-name">{pre + ' ' + name}</div>
        <button onClick={this.onSaveClick}>Save</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos
})

const mapDispatchToProps = (dispatch) => ({
  addTodo: () => dispatch(addTodo)
})

export default connect(mapStateToProps, mapDispatchToProps)(Example)
