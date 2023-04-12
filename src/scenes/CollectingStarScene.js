import Phaser from "phaser";

export default class CollectingStarScene extends Phaser.Scene {
  constructor() {
    super("collecting-star-scene");
  }

  init(){
    this.platform = undefined
    this.player = undefined
    this.star = undefined
    this.cursor = undefined
    this.bomb = undefined
    this.scoreText = undefined
    this.score = 0
  }

  preload() {
    this.load.image('ground', 'images/platform.png')
    this.load.image('star', 'images/star.png')
    this.load.image('bomb', 'images/bomb.png')
    this.load.image('sky', 'images/sky.png')

    // load the player
    this.load.spritesheet('dude', 'images/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create() {
    this.add.image(400, 300, 'sky')

    // create platform
    this.platform = this.physics.add.staticGroup()
    this.platform.create(600, 400, 'ground')
    this.platform.create(50, 250, 'ground')
    this.platform.create(750, 220, 'ground')

    this.platform.create(400, 568, 'ground').setScale(2).refreshBody()

    // create player
    this.player = this.physics.add.sprite(100, 450, 'dude')
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, this.platform)

    // create star
    this.star = this.physics.add.group({
      key: 'star',
      repeat: 10,
      setXY: { x: 50, y: 0, stepX: 70 }
    })

    // create bomb
    this.bomb = this.physics.add.group({
      key: 'bomb',
      repeat: 5,
      setXY: { x: 30, y: 0, stepX: 120 }
    })

    this.physics.add.collider(this.star, this.platform)
    this.physics.add.collider(this.bomb, this.platform)

    // create cursor
    this.cursor = this.input.keyboard.createCursorKeys()

    // create left animation
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    // create right animation
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    // create idle animation
    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    })

    // create collect star
    this.physics.add.overlap(this.player, this.star, this.collectStar, null, this)

    // create score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px'})

    // create overlap bomb
    this.physics.add.overlap(this.player, this.bomb, this.gameOver, null, this)


  }

  update() {
    if (this.cursor.left.isDown){
      this.player.setVelocity(-200, 200)
      this.player.anims.play('left', true)
    }
    else if (this.cursor.right.isDown){
      this.player.setVelocity(200, 200)
      this.player.anims.play('right', true)
    }
    else if (this.cursor.up.isDown){
      this.player.setVelocity(0, -200)
      this.player.anims.play('turn', true)
    }
    else {
      this.player.setVelocity(0, 0)
      this.player.anims.play('turn', true)
    }

    // win condition
    if(this.score >= 100){
      this.physics.pause()
      this.add.text(300, 300, 'You Win!', { fontSize: '48px' })
    }

  }

  collectStar(player, star){
    star.destroy()
    this.score += 10
    this.scoreText.setText('Score: ' + this.score)
  }

  gameOver(player, bomb){
    bomb.destroy()
    this.physics.pause()
    this.add.text(300, 300, 'Game Over', { fontSize: '48px' })
  }
}