//Draws / Defines Canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
c.fillRect(0,0, canvas.width, canvas.height)
const gravity = 0.3

//Fighter object
class Sprite{
    constructor({position, velocity, color, offset}){
        this.position = position
        this.velocity = velocity
        this.objHeight = 150
        this.width = 50
        this.lastKey
        this.color = color
        this.attackBox = {
            position: {
                x:this.position.x,
                y:this.position.y
            },
            offset,
            width: 100,
            height: 50,
        }
        this.isAttacking
        this.health = 100
    }
    //Draws Fighter
    draw(){
        //Fighter Draw
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.objHeight)

        //Draw attackBox
       if(this.isAttacking){
            c.fillStyle = 'gold'
            c.fillRect(this.attackBox.position.x, 
                        this.attackBox.position.y, 
                        this.attackBox.width, 
                        this.attackBox.height)
       }
        
    }
    //Updates position and velocity values on each iteration of animation call loop
    update() {
        this.draw()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.y += this.velocity.y 
        this.position.x += this.velocity.x
        //Prevents sprite object from falling below frame
        if (this.position.y + this.objHeight + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
            this.position.y = canvas.height - this.objHeight
        }else{
            this.velocity.y += gravity
        }
    }
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}



//Player object (position, velocity) vectors
const player = new Sprite({
    position:{
        x: 50,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    color: 'red'
})

//Enemy object (position, velocity) vectors
const enemy = new Sprite({
    position:{
        x: 500,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    color: 'blue'
})



//Key library
const keys = {
     a: {
        pressed: false
     },
     d: {
        pressed: false
     },
     j: {
        pressed: false
     },
     l: {
        pressed: false
     }
}
//Last key def
let lastKey

//Creates animation loop to update positions and velocities 


function rectangularColision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 

        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 

        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 

        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.objHeight
    )
}

let timer = 10
function decrementTime(){
    setTimeout(decrementTime, 1000)
    if (timer > 0){
        timer --
        document.querySelector("#timer").innerHTML = timer
    }
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width, canvas.height)
    player.update()
    enemy.update()  

    player.velocity.x = 0
    enemy.velocity.x = 0

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }

    if (keys.j.pressed && enemy.lastKey === 'j') {
        enemy.velocity.x = -5
    } else if (keys.l.pressed && enemy.lastKey === 'l') {
        enemy.velocity.x = 5
    } 

    if (rectangularColision({ rectangle1: player, rectangle2: enemy }) && player.isAttacking) {
            player.isAttacking = false
            enemy.health -= 20
            document.querySelector("#enemyHealth").style.width = enemy.health + "%"
    }

    if (rectangularColision({ rectangle1: enemy, rectangle2: player }) && enemy.isAttacking) {
            enemy.isAttacking = false
            player.health -= 20
            document.querySelector("#playerHealth").style.width = player.health + "%"
            
    }

    
}
//Function call
animate()



//Player Key listerners
window.addEventListener('keydown', (event) => {
    switch (event.key) {
    //Player keys
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
             keys.a.pressed = true
             player.lastKey = 'a'
            break
        case 'w':
             player.velocity.y = -7
            break
        case 's':
            player.attack()
        break

    //Enemy keys
        case 'l' :
            keys.l.pressed = true
            enemy.lastKey = 'l'
            break
        case 'j' :
            keys.j.pressed = true
            enemy.lastKey = 'j'
            break
        case 'i' :
            enemy.velocity.y = -7
            break
        case 'k':
            enemy.attack()
            break
        
    }
    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    //Player keys
    switch (event.key) {
        case 'd' :
            keys.d.pressed = false
            break
        case 'a' :
            keys.a.pressed = false
            break
    //Enemy keys
        case 'l' :
            keys.l.pressed = false
            break
        case 'j' :
            keys.j.pressed = false
            break
    }
    console.log(event.key)
})

//What do these mean technically?
console.log(player)
console.log(enemy)