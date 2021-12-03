import Player from "./Player.js"
import Enemy from "./Enemy.js"
import Bullet from "./Bullet.js"

const canvas = document.getElementById("canvas")

const ctx = canvas.getContext("2d")

const game = document.getElementById("game")

const lc = document.getElementById("lifeCounter")

const gameOver = document.getElementById("gameOver")

const restartB = document.getElementById("restart")

const assets = {
  player: document.getElementById("player"),
  enemy: document.getElementById("enemy")
}

const buttons = [document.getElementById("left"), document.getElementById("shot"), document.getElementById("right")]

const buttonsEvents = [
  e=>{
    speed = -20
  },
  e=>{
    if(bullets.length > 0 && Math.abs(bullets[bullets.length-1].y - (canvas.clientHeight - 39)) < 100) { return; }
    
    let playerBullets = 0;
    
    for(let x = 0; x < bullets.length; x++) {
      playerBullets += (bullets.player ? 1 : 0)
    }
    
    if(playerBullets >= 2) { return; }
    
    bullets.push(new Bullet(player.x-3, canvas.clientHeight - 39, "rgb(255, 0, 0)", -40, true))
  },
  e=>{
    speed = 20
  }
]

const pressed = {id: 0, pressed: false, e: undefined}

let player, enemies, bullets

let right = true

let speed = 0;

for(let x = 0; x < buttons.length; x++) {
    if(x == 1) {
      buttons[x].addEventListener("touchstart", e=>{
      
        buttonsEvents[x](e)
      })
    }
  
    buttons[x].addEventListener("touchstart", e=>{
      if(!pressed.pressed) {
        pressed.id = x
        pressed.e = e
        pressed.pressed = true
      }
    })
  
    buttons[x].addEventListener("touchend", e=>{
      if(pressed.id == x) {
        pressed.pressed = false
      }
    })
  }

const start = ()=>{
  player = new Player(canvas.clientWidth/2, assets.player)
  
  enemies = []
  
  bullets = []
  
  for (let x = 0; x < 7; x++) {
    enemies.push([])
  
    for (let y = 0; y < 4; y++) {
      enemies[x].push(new Enemy(x * 30, y * 30, assets.enemy, x, y))
    }
  }
  
  gameOver.style.display = "none"
  game.style.display = ""
  
  restartB.addEventListener("touchstart", e=>{
    start()
  })
}

start()

const update = delta=>{
  lc.innerHTML = "Lifes: " + player.lifes
  
  if(player.lifes <= 0) {
    gameOver.style.display = ""
    game.style.display = "none"
  }
  
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  
  for(let x = 0; x < buttons.length; x++) {
    if(pressed.id == x && pressed.pressed && x != 1) {
      buttonsEvents[x](pressed.e)
    }
  }
  
  for(let x = 0; x < bullets.length; x++) {
    if(bullets[x].y + 9 < 0 || bullets[x].y > canvas.clientHeight) {
      
      bullets.splice(x, 1)
      break
    }
    
    bullets[x].draw(delta)
  }
  
  speed = (!pressed.pressed ? 0 : speed)
  
  player.x += speed * delta
  
  player.draw(bullets)
  
  const antDir = right
  
  for(let x = 0; x < enemies.length; x++) {
    for(let y = 0; y < enemies[x].length; y++) {
      if(enemies[x][y].destroyed) { continue; }
      
      enemies[x][y].draw(bullets, player, enemies, delta)
      
      right = (enemies[x][y].x < 0 && !right ? true : right)
      
      for(let z = enemies.length-1; z > -1; z--) {
        right = (enemies[z][y].x + 30 > canvas.clientWidth && right ? false : right)
      }
      
      if(player.lifes <= 0) { continue; }
      
      enemies[x][y].x += (right ? 5 * (getEnemiesAmount() == 1 ? 10 : 1) : -5 * (getEnemiesAmount() == 1 ? 10 : 1)) * delta
      
      enemies[x][y].y += (antDir != right ? 10 : 0)
    }
  }
  
  setTimeout(update, 0, 1/60)
}

update(1/60)

function getEnemiesAmount() {
  let amount = 0;
  
  for(let x = 0; x < enemies.length; x++) {
    for(let y = 0; y < enemies[x].length; y++) {
      amount += (!enemies[x][y].destroyed ? 1 : 0)
    }
  }
  
  return amount
}