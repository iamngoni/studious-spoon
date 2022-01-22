var panes = [
    {
        name: "🍌",
        id: 1,
        isRevealed: false
    },
    {
        name: "🍑",
        id: 2,
        isRevealed: false
    },
    {
        name: "🍉",
        id: 3,
        isRevealed: false
    },
    {
        name: "🍇",
        id: 4,
        isRevealed: false
    },
    {
        name: "🎁",
        id: 5,
        isRevealed: false
    },
    {
        name: "🍅",
        id: 6,
        isRevealed: false
    },
    {
        name: "🥑",
        id: 7,
        isRevealed: false
    },
    {
        name: "🍓",
        id: 8,
        isRevealed: false
    },
    {
        name: "🍌",
        id: 1,
        isRevealed: false
    },
    {
        name: "🍑",
        id: 2,
        isRevealed: false
    },
    {
        name: "🍉",
        id: 3,
        isRevealed: false
    },
    {
        name: "🍇",
        id: 4,
        isRevealed: false
    },
    {
        name: "🎁",
        id: 5,
        isRevealed: false
    },
    {
        name: "🍅",
        id: 6,
        isRevealed: false
    },
    {
        name: "🥑",
        id: 7,
        isRevealed: false
    },
    {
        name: "🍓",
        id: 8,
        isRevealed: false
    }
]

var panesApp = new Vue({
  el: "#vue-app",
  mounted: function(){
    alert("Hello 👋. This app will require you to enter a username to save your score and nothing else😁")
    this.username += prompt("Choose your username")
    $.ajax({
      type: 'GET',
      url: 'https://www.iamngoni.co.zw/memory/get'
    }).done((response) => {
      this.halloffame = response
    }).fail((response) => {
      console.log(response)
    })
  },
  data: {
    tiles: panes.sort(() => Math.random() - 0.5),
    username: '',
    isOneSelected: {
      value: false,
      id: null,
      index: null
    },
    touch: 0,
    score: 0,
    halloffame: [],
    hasEnded: false
  },
  methods:{
    revealTile: function (index){
      this.touch++
      if(this.isOneSelected.value){
        this.tiles[index].isRevealed = true
        if(this.isOneSelected.index != index){
          if (this.isOneSelected.id == this.tiles[index].id) {
            setTimeout(() => {
              this.score++
              this.tiles = this.tiles.filter(tile => tile.id != this.isOneSelected.id)
              this.isOneSelected.value = false
              this.isOneSelected.id = null
              this.isOneSelected.index = null
            }, 500)
          }else{
            setTimeout(() => {
              this.tiles[index].isRevealed = this.tiles[index].isRevealed ? false : true
              this.tiles[this.isOneSelected.index].isRevealed = false
              this.isOneSelected.value = false
              this.isOneSelected.id = null
              this.isOneSelected.index = null
            }, 1000)
          }
        }else{
          alert("You selected the same tile🤦🤦")
          this.tiles[index].isRevealed = false
          this.isOneSelected.value = false
          this.isOneSelected.id = null
          this.isOneSelected.index = null
        }
      }else{
        this.tiles[index].isRevealed = true
        this.isOneSelected.value = true
        this.isOneSelected.index = index
        this.isOneSelected.id = this.tiles[index].id
      }
    },
    reloadPage: function(){
      location.reload()
    }
  },
  computed: {
    attempts: function(){
      return Math.floor(this.touch / 2)
    },
    overalScore: function(){
      var value = (this.score / this.attempts) * 100
      if (isNaN(value)) {
        return 0
      }
      return Math.floor(value)
    }
  },
  watch: {
    tiles: function(value){
      if(value.length < 1){
        alert("Thank you for trying out 😁")
        this.hasEnded = true
        $.ajax({
          type: 'POST',
          url: "https://www.iamngoni.co.zw/memory/save",
          data: {username: this.username, score: this.overalScore}
        }).done((response) => {
          this.halloffame = response
        }).fail((response) => {
          console.log(response)
        })
      }
    }
  }
})
