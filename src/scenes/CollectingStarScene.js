import Phaser from "phaser";

export default class CollectingStarScene extends Phaser.Scene {
  constructor() {
    super("collecting-star-scene");
  }

  init(){
    this.platform = undefined
    this.player = undefined
    this.star = undefined
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

    this.physics.add.collider(this.star, this.platform)

  }

  update() {

  }
}