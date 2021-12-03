import Bullet from "./Bullet.js"

const canvas = document.getElementById("canvas")

const ctx = canvas.getContext("2d")

export default function Enemy(x, y, image, idX, idY) {
  this.x = x;
  this.y = y;
  this.src = image
  this.destroyed = false
  
  const id = {x: idX, y: idY}
  
  let time = Math.random() * 16;
  
  this.draw = (bullets, player, enemiesArray, delta)=>{
    for(let x = 0; x < bullets.length; x++) {
      this.destroyed = (
        bullets[x].y < this.y + 30 && 
        bullets[x].y + 9 > this.y && 
        bullets[x].x < this.x + 30 && 
        bullets[x].x + 3 > this.x
      )
      
      if(this.destroyed) {
        bullets.splice(x, 1)
        break;
      }
    }
    
    player.lifes = (this.y + 30 >= canvas.clientHeight ? 0 : player.lifes)
    
    if(Math.floor(Math.random() * 1001) > 999 && (!enemiesArray[id.x][id.y+1] || enemiesArray[id.x][id.y+1] && enemiesArray[id.x][id.y+1].destroyed) && time <= 0) {
      
      bullets.push(new Bullet(this.x + 15, this.y + 40, "white", 40, false))
      
      time = Math.random() * 16
    }
    
    ctx.drawImage(this.src, 0, 0, this.src.width, this.src.height, this.x, this.y, 30, 30)
    
    time -= delta
  }
}