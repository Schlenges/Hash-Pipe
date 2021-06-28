module.exports = class Directory {
  constructor(items){
    this.items = items
  }

  generateId = (items) => Number(Object.keys(items).sort().pop()) + 1

  _equal = (item, [key, val]) => typeof item === 'object' ? key == Object.keys(item)[0] : val == item

  getId = (item) => {
    let id = null

    Object.entries(this.items).forEach((entry) => {
      if(this._equal(item, entry)){
        id = entry[0]
      }
    })

    return id
  }

  add = (item) => {
    if(this.getId(item) != null){ 
      return console.log(`An item with the name already exists.`)
    }

    let newItem = {}

    if(typeof item === 'object'){
      const id = Object.keys(item)[0]
      newItem = {id: id, val: item[id]}
    } else{
      const id = this.generateId(this.items)
      newItem = {id: id, val: item}
    }

    this.items[newItem.id] = newItem.val
    return newItem.id
  }

  removeById = (id) => { 
    delete this.items[id]
  }

  getAll = () => this.items
}