import { create } from './helper.js'
import TagDisplay from './TagDisplay.js'

const App = () => { 
  const container = create('app')
  const state = {}

  const setState = (key, value) => {
    state[key] = value
    render()
  }

  const template = () => `
    ${TagDisplay}
  `
  const render = () => { container.innerHTML = template() }

  render()

  return container
}

export default App()