const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9 // 576

let parsedCollisions
let collisionBlocks
let background
let doors

let level = 1
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: 'img/backgroundLevel1.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 805,
            y: 270
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false
        })
      ]
    },
  },
}

const player = new Player({
  collisionBlocks,
  imageSrc: 'img/king/idle.png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: 'img/king/idle.png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: 'img/king/idleLeft.png',
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: 'img/king/runRight.png',
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: 'img/king/runLeft.png',
    }, 
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false, 
      imageSrc: 'img/king/enterDoor.png',
      onComplete: () => {
        console.log('completed animation')
        gsap.to(overlay, {
          opacity: 1
        })
      },
    }
  }
})

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}

const overlay = {
  opacity: 0,
}

function animate() {
  window.requestAnimationFrame(animate)

  background.draw()
  collisionBlocks.forEach(collisionBlock => {
    collisionBlock.draw()
  })

  doors.forEach((door) => {
    door.draw()
  })

  player.handleInput(keys)
  player.draw()
  player.update()

  c.save()
  c.globalAlpha = overlay.opacity
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.restore()
}

animate()