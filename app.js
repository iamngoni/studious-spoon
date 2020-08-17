var panes = [
  {
    name: "Banana",
    id: 1,
    isRevealed: false
  },
  {
    name: "Mango",
    id: 2,
    isRevealed: false
  },
  {
    name: "PawPaw",
    id: 3,
    isRevealed: false
  },
  {
    name: "Grape",
    id: 4,
    isRevealed: false
  },
  {
    name: "Banana",
    id: 1,
    isRevealed: false
  },
  {
    name: "Mango",
    id: 2,
    isRevealed: false
  },
  {
    name: "PawPaw",
    id: 3,
    isRevealed: false
  },
  {
    name: "Grape",
    id: 4,
    isRevealed: false
  }
]

var panesApp = new Vue({
  el: "#vue-app",
  data: {
    tiles: panes.sort(() => Math.random() - 0.5),
    isOneSelected: {
      value: false,
      id: null,
      index: null
    },
  },
  methods:{
    revealTile: function (index){
      this.tiles[index].isRevealed = this.tiles[index].isRevealed ? false : true
      if(this.isOneSelected.value){
        if(this.isOneSelected.index != index)
          if (this.isOneSelected.id == this.tiles[index].id) {
            alert("Hurray")
            this.tiles = this.tiles.filter(tile => tile.id != this.isOneSelected.id)
            this.isOneSelected.value = false
            this.isOneSelected.id = null
            this.isOneSelected.index = null
          }else{
            alert("Messed up memory")
            this.tiles[index].isRevealed = this.tiles[index].isRevealed ? false : true
            this.tiles[this.isOneSelected.index].isRevealed = false
            this.isOneSelected.value = false
            this.isOneSelected.id = null
            this.isOneSelected.index = null
          }
        }else{
          alert("You selected the same tile")
          this.tiles[index].isRevealed = this.tiles[index].isRevealed ? false : true
          this.isOneSelected.value = false
          this.isOneSelected.id = null
          this.isOneSelected.index = null
        }
      }else{
        this.isOneSelected.value = true
        this.isOneSelected.index = index
        this.isOneSelected.id = this.tiles[index].id
      }
    }
  }
})