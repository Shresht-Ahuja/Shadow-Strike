// const gravity = 0.7;


// class Sprite {
//     constructor({ position, image, width, height, scale, framesMax = 1, offset = { x: 0, y: 0 }, c}) {
//       this.position = position;
//       this.width = width;
//       this.height = height;
//       this.image = image  
//       this.scale = scale
//       this.framesMax = framesMax
//       this.currentFrame = 0
//       this.framesElapsed = 0
//       this.framesHold = 12
//       this.offset = offset
//       this.c = c
//     }
//     draw(c) {
//         this.c.drawImage(
//           this.image,
//           this.currentFrame * (this.image.width / this.framesMax),
//           0,
//           this.image.width / this.framesMax,
//           this.image.height,
//           this.position.x, 
//           this.position.y, 
//           (this.width / this.framesMax)* this.scale,
//           this.height * this.scale
//       )
//     }

//     update() {
//       this.draw(this.c);
//       this.framesElapsed++

//   if (this.framesElapsed % this.framesHold === 0) {
//       if(this.currentFrame < this.framesMax - 1){
//         this.currentFrame ++
//       }else{
//         this.currentFrame = 0
//       }
//     }
//     }
//   }

//   class Fighter extends Sprite{
//     constructor({ position, velocity, imageSrc, scale, framesMax = 1, offset = { x: 0, y: 0 }, sprites, c}) {
//       super({
//         position,
//         imageSrc,
//         scale,
//         framesMax,
//         offset
//       })

      
//       this.velocity = velocity;
//       this.c = c;
//       this.width = 600;
//       this.height = 150;
//       this.lastKey = 0;
//       this.attackBox = {
//         position: {
//           x: this.position.x,
//           y: this.position.y
//         },
//         width: 300,
//         height: 100,
//       }
//       this.isAttacking = false
//       this.health = 100
//       this.currentFrame = 0
//       this.framesElapsed = 0
//       this.framesHold = 12
//       this.sprites = sprites

//       for (const sprite in this.sprites) {
//         sprites[sprite].image = new Image()
//         sprites[sprite].image = sprites[sprite].imageSrc
//       }
//     }

    
//     update() {
//       this.draw(this.c)

//       this.framesElapsed++

//   if (this.framesElapsed % this.framesHold === 0) {
//       if(this.currentFrame < this.framesMax - 1){
//         this.currentFrame ++
//       }else{
//         this.currentFrame = 0
//       }
//     }
      
//       // this.attackBox.position.x = this.position.x + this.attackBox.offset.x
//       // this.attackBox.position.y = this.position.y + this.attackBox.offset.y

//       this.position.y += this.velocity.y;
//       this.position.x += this.velocity.x;

//       if (this.position.y + this.height + this.velocity.y >= 1000 - 655) {
//         this.velocity.y = 0;
//         //this.position.y = 200;
//       } else {
//         this.velocity.y += gravity;
//       }
//     }
//     attack(){
//       this.isAttacking = true
//       setTimeout(() => {
//         this.isAttacking = false
//       }, 500)
//     }
//     switchSprite(sprite){
//     switch (sprite) {
//       case 'idle':
//         if (this.image !== this.sprites.idle.image) {
//           this.image = this.sprites.idle.image
//           this.framesMax = this.sprites.idle.framesMax
//           this.framesCurrent = 0
//         }
//         break
//       case 'run':
//         if (this.image !== this.sprites.run.image) {
//           this.image = this.sprites.run.image
//           this.framesMax = this.sprites.run.framesMax
//           this.framesCurrent = 0
//         }
//         break
//       case 'jump':
//         if (this.image !== this.sprites.jump.image) {
//           this.image = this.sprites.jump.image
//           this.framesMax = this.sprites.jump.framesMax
//           this.framesCurrent = 0
//         }
//         break

//       // case 'fall':
//       //   if (this.image !== this.sprites.fall.image) {
//       //     this.image = this.sprites.fall.image
//       //     this.framesMax = this.sprites.fall.framesMax
//       //     this.framesCurrent = 0
//       //   }
//       //   break
//       }
//     }
//   }

// export {Sprite, Fighter};