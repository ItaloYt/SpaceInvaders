const canvas = document.getElementById("canvas")

const ctx = canvas.getContext("2d")

export default function Player(x, image) {
  this.x = x;
  this.y = canvas.clientHeight - 30
  
  this.src = image
  
  this.lifes = 3;
  
  this.draw = bullets=>{
    for(let x = 0; x < bullets.length; x++) {
      const antLife = this.lifes
      
      this.lifes -= (
        bullets[x].x < this.x + 15 && 
        bullets[x].x + 3 > this.x-15 && 
        bullets[x].y < this.y + 30 && 
        bullets[x].y + 9 > this.y 
        
        ? 1 : 0
      )
      
      if(antLife != this.lifes) {
        bullets.splice(x, 1)
        break;
      }
    }
    
    if(this.lifes <= 0) { return; }
    
    ctx.drawImage(this.src, 0, 0, this.src.width, this.src.height, this.x-15, this.y, 30, 30)
  }
}