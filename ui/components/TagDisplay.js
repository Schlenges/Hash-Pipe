import { create } from './helper.js'

const TagDisplay = () => { 
  const container = create('tag-display')
  const state = {
    tags: []
  }

  const setState = (key, value) => {
    state[key] = value
    render()
  }

  const template = () => `
    <textarea></textarea>
  `
  const render = () => { container.innerHTML = template() }

  render()

  return container.innerHTML
}

export default TagDisplay()