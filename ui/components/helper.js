const create = (id, type = 'div') => {
  const element = document.createElement(type)
  element.id = id
  return element
}

export { create }