const canvas = document.getElementById("canvas")

const ctx = canvas.getContext("2d")

export default function Bullet(x, y, color, force, player) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.player = player
  
  const gravity = force
  
  this.draw = delta=>{
    ctx.fillStyle = this.color
    
    ctx.fillRect(this.x, this.y, 3, 9)
    
    this.y += gravity * delta
  }
}