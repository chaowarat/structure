import React from 'react'
import Example from '../Example'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { addTodo } from 'Redux/actions'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'

const clickFn = jest.fn()
const initialState = { todos: [] }
const middlewares = [thunk];
const mockStore = configureStore(middlewares)
let store, container, wrapper

describe('example component test suite', function () {
  beforeEach(() => {
    store = mockStore(initialState)
    container = shallow(<Example store={store} onSaveFinish={clickFn} />)
    wrapper = mount(<Provider store={store}><Example onSaveFinish={clickFn} /></Provider>)
    global.sessionStorage = jest.fn()
    global.sessionStorage.setItem = jest.fn()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render the connected component', () => {
    expect(container.length).toEqual(1)
  })

  it('renders with props without crashing', () => {
    shallow(<Example store={store} name="chaow" />)
  })

  it('should have "Example Component" inside body html', () => {
    const body = wrapper.find('.example-body')
    expect(body.text()).toBe('Example Component')
  })

  it('should have button with Save text', () => {
    const button = wrapper.find('button')
    expect(button).toHaveLength(1)
    expect(button.text()).toBe('Save')
  })

  it('should have "Hello!" as initial state pf "pre"', function () {
    const instance = wrapper.find(Example).childAt(0).instance()
    expect(instance.state.pre).toBe('Hello!')
  })

  it('should matches the initialState', () => {
    expect(container.prop('todos')).toEqual(initialState.todos)
  })

  it('should action and type matches to store', () => {
    const action = addTodo("job1")
    const expectedAction = [{ type: 'ADD_TODO', data: "job1" }]
    store.dispatch(action)
    const actions = store.getActions()
    expect(actions.type).toEqual(expectedAction.type)
    expect(actions).toEqual(expectedAction)
  })

  it('button click should call onSaveFinish property', () => {
    expect(clickFn).not.toHaveBeenCalled()
    wrapper.find('button').simulate('click')
    expect(clickFn).toHaveBeenCalled()
  })

  it('button click should call onSaveFinish (call directly instant)', () => {
    const instance = wrapper.find(Example).childAt(0).instance()
    instance.onSaveClick()
    expect(clickFn).toHaveBeenCalled()
  })
})
