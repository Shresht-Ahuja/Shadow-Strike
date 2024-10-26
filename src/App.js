import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');

    // function drawImage(){

    const resizeCanvas = () => {
      canvas.width = 2200
      canvas.height = 1000
      c.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();

    const gravity = 0.7;

    class Sprite {
      constructor({ position, imageSrc, width, height, scale, framesMax = 1, offset = { x: 0, y: 0 }}) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.currentFrame = 0
        this.framesElapsed = 0
        this.framesHold = 12
        this.offset = offset
      }
      draw() {
          c.drawImage(
            this.image,
            this.currentFrame * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.width / this.framesMax)* this.scale,
            this.height * this.scale
        )
      }

      update() {
        this.draw();
        this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
        if(this.currentFrame < this.framesMax - 1){
          this.currentFrame ++
        }else{
          this.currentFrame = 0
        }
      }
      }
    }

    class Fighter extends Sprite{
      constructor({ position, velocity, imageSrc, scale, framesMax = 1, offset = { x: 0, y: 0 }, sprites}) {
        super({
          position,
          imageSrc,
          scale,
          framesMax,
          offset
        })

        
        this.velocity = velocity;
        this.width = 600;
        this.height = 150;
        this.lastKey = 0;
        this.attackBox = {
          position: {
            x: this.position.x,
            y: this.position.y
          },
          width: 300,
          height: 100,
        }
        this.isAttacking = false
        this.health = 100
        this.currentFrame = 0
        this.framesElapsed = 0
        this.framesHold = 12
        this.sprites = sprites

        for (const sprite in this.sprites) {
          sprites[sprite].image = new Image()
          sprites[sprite].image.src = sprites[sprite].imageSrc
        }
      }

      

      update() {
        this.draw()

        this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
        if(this.currentFrame < this.framesMax - 1){
          this.currentFrame ++
        }else{
          this.currentFrame = 0
        }
      }
        
        // this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        // this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 655) {
          this.velocity.y = 0;
          //this.position.y = 200;
        } else {
          this.velocity.y += gravity;
        }
      }
      attack(){
        this.isAttacking = true
        setTimeout(() => {
          this.isAttacking = false
        }, 500)
      }
      switchSprite(sprite){
      switch (sprite) {
        case 'idle':
          if (this.image !== this.sprites.idle.image) {
            this.image = this.sprites.idle.image
            this.framesMax = this.sprites.idle.framesMax
            this.framesCurrent = 0
          }
          break
        case 'run':
          if (this.image !== this.sprites.run.image) {
            this.image = this.sprites.run.image
            this.framesMax = this.sprites.run.framesMax
            this.framesCurrent = 0
          }
          break
        case 'jump':
          if (this.image !== this.sprites.jump.image) {
            this.image = this.sprites.jump.image
            this.framesMax = this.sprites.jump.framesMax
            this.framesCurrent = 0
          }
          break
  
        case 'fall':
          if (this.image !== this.sprites.fall.image) {
            this.image = this.sprites.fall.image
            this.framesMax = this.sprites.fall.framesMax
            this.framesCurrent = 0
          }
          break
        }
      }
    }

    
    
    const background = new Sprite({
      position: {
        x: 0,
        y: 0
      },
      imageSrc: './images/background.png',
      width: 2200,
      height: 1000,
      scale: 1,
    })

    const shop = new Sprite({
      position: {
        x: 1400,
        y: 235
      },
      imageSrc: './images/shop.png',
      width: 1000,
      height: 200,
      scale: 3,
      framesMax: 6
    })

    const space = (window.innerWidth - 200) / 2

    const player = new Fighter({
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      offset: { x: 0, y: 0},
      imageSrc: "./images/player1/Idle.png",
      framesMax: 8,
      scale: 7,
      offset: {
        x: 215,
        y: 170
      },
      sprites: {
        idle: {
          imageSrc: './images/player1/Idle.png',
          framesMax: 8
        },
        run: {
          imageSrc: './images/player1/Run.png',
          framesMax: 8
        },
        jump: {
          imageSrc: './images/player1/Jump.png',
          framesMax: 2
        }
      }
    });

    const enemy = new Fighter({
      position: { x: space/2 + space + player.width, y: 0 },
      velocity: { x: 0, y: 5 },
      offset: { x: -200,y: 0}
    });
  
    function rectangularCollision({rect1, rect2}){
      return(
        rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x 
        && rect1.attackBox.position.x <= rect2.position.x + rect2.width 
        && rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y
        && rect1.attackBox.position.y <= rect2.position.y + rect2.height
      )
    }

    function determineWinner({player,enemy,timerId}){
      clearTimeout(timerId)
      document.querySelector("#displayText").style.display = "flex"
      if(player.health === enemy.health){
        document.querySelector("#displayText").innerHTML = "Tie"
      }
      else if(player.health > enemy.health){
        document.querySelector("#displayText").innerHTML = "Player 1 Wins"
      }
      else if(player.health < enemy.health){
        document.querySelector("#displayText").innerHTML = "Player 2 Wins"
      }
    }

    let timer = 6
    let timerId
    function decreaseTimer(){
        if(timer >= 0){
          timer--
          timerId = setTimeout(decreaseTimer, 1000)
          document.querySelector("#timer").innerHTML = timer
        }

        if(timer === 0){ 
          document.querySelector("#timer").innerHTML = 0
          determineWinner({player,enemy,timerId})
      }
    }
    decreaseTimer()

    function animate() {
      window.requestAnimationFrame(animate);
      c.fillStyle = 'black';
      c.fillRect(0, 0, canvas.width, canvas.height);
      background.update();
      shop.update();
      player.update();
      //enemy.update();

      if (player.velocity.y < 0) {
        player.image = player.sprites.jump.image
        player.framesMax = player.sprites.jump.framesMax
      }

      //the detection for collision
      if(rectangularCollision({
        rect1: player,
        rect2: enemy
      })
        && player.isAttacking
    ){
      player.isAttacking = false
      console.log("dem ")
      enemy.health -= 5
      document.querySelector("#enemyHealth").style.width = enemy.health + '%'
    }
      if(rectangularCollision({
        rect1: enemy,
        rect2: player
      })
        && enemy.isAttacking
    ){
      enemy.isAttacking = false
      console.log("wao")
      player.health -= 5
      document.querySelector("#playerHealth").style.width = player.health + '%'
    }
    if(enemy.health <= 0 || player.health <= 0){
      determineWinner({player, enemy, timerId})
    }
  }
  
    animate();


    // window.addEventListener('resize', resizeCanvas);

    //MOVING THE PLAYER USING EVENT LISTENER

    window.addEventListener('keydown', (event) => {
      
      
      switch (event.key) {
        case 'd':
          player.velocity.x = 7;
          player.lastKey = 'd'
          player.switchSprite('run')
          break;
        case 'a':
          player.velocity.x = -7;
          player.lastKey = 'a'
          player.switchSprite('run')
          break;
          case 'w':
            player.velocity.y = -20;
            player.lastKey = 'w'
            player.switchSprite('jump')
            break;
          case ' ':
            player.attack()
            break;

        case 'ArrowRight':
          enemy.velocity.x = 10;
          enemy.lastKey = 'ArrowRight'
          break;
        case 'ArrowLeft':
          enemy.velocity.x = -10;
          enemy.lastKey = 'ArrowLeft'
          break;
          case 'ArrowUp':
            enemy.velocity.y = -20;
            enemy.lastKey = 'ArrowUp'
            break;
            case 'ArrowDown':
              enemy.attack()
              break;
        default:
      }
    });

    window.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'd':
          player.velocity.x = 0;
          player.image = player.sprites.idle.image
          break;
        case 'a':
          player.velocity.x = 0;
          player.image = player.sprites.idle.image
          break;
        case 'w':
          player.velocity.y = 0;
          break;

          case 'ArrowRight':
          enemy.velocity.x = 0;
          break;
        case 'ArrowLeft':
          enemy.velocity.x = 0;
          break;
        case 'ArrowUp':
          enemy.velocity.y = 0;
          break;
        default:
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', () => {});
      window.removeEventListener('keyup', () => {});
    };
  // }
  //   const handleResize = () => {
  //     canvas.width = window.innerWidth;
  //     canvas.height = window.innerHeight;
  //     drawImage();
  //   };
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
   }, []);

  return (
    <div className="App">
      <canvas></canvas>
    </div>
  );
}

export default App;