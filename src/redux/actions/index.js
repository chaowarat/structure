export const login = credential => {
  return { type: 'LOGIN', credential }
}

export const addTodo = data => {
  return { type: 'ADD_TODO', data }
}