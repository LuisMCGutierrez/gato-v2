
let turn = false;
let winner = false;
let tie = false;
let buttons = document.querySelectorAll('button.cell')
buttons = Array.from(buttons)
let resetButton = document.getElementById('Reset')

buttons.forEach(button => {
    let obj = {
        x: Number(button.id.slice(0, 1)),
        y: Number(button.id.slice(-1))
    }
    button.coordinates = obj
    button.onclick = () => fillValidation(button)
})

resetButton.onclick = () => {
    buttons.forEach(button => {
        button.innerHTML = ""
        button.onclick = () => fillValidation(button)
    });
    winner = false
    tie = false
}

function fillValidation(button) {
    if (button.innerHTML) {
        console.log("can't fill an filled spaces")
    } else {
        fill(button)
        posibleMoves(button)
    }
}
function fill(button) {
    if (turn) {
        button.innerHTML = "x"
        turn = !turn
    } else {
        button.innerHTML = "o"
        turn = !turn
    }
}
function posibleMoves(button) {
    let row = checkRow(button)
    let col = checkCol(button)
    let diagonal1 = checkDiagonal1(button)
    let diagonal2 = checkDiagonal2(button)
    tie = checkTie()
    if (row || col || diagonal1 || diagonal2) {
        console.log(`the winner is ${button.innerHTML}`)
        buttons.forEach(button => button.onclick = () => { })
    }
    if (tie) {
        console.log(`it was a tie!`)
    }
}
function checkRow(button) {
    for (let i = 0; i <= 2; i++) {
        let buttonId = String(button.coordinates.x) + String(i)
        let buttonIterator = buttons.find(el => el.id == buttonId)
        if (buttonIterator.innerHTML) {
            if (buttonIterator.innerHTML != button.innerHTML) {
                return false
            }

        } else {
            return false
        }
    }
    return true
}
function checkCol(button) {
    for (let i = 0; i <= 2; i++) {
        let buttonId = String(i) + String(button.coordinates.y)
        let buttonIterator = buttons.find(el => el.id == buttonId)
        if (buttonIterator.innerHTML) {
            if (buttonIterator.innerHTML != button.innerHTML) {
                return false
            }

        } else {
            return false
        }
    }
    return true
}
function checkDiagonal1(button) {
    for (let i = 0; i <= 2; i++) {
        let buttonId = String(i) + String(i)
        let buttonIterator = buttons.find(el => el.id == buttonId)
        if (buttonIterator.innerHTML) {
            if (buttonIterator.innerHTML != button.innerHTML) {
                return false
            }

        } else {
            return false
        }
    }
    return true
}
function checkDiagonal2(button) {
    let x = 2
    let y = 0
    for (let i = 0; i <= 2; i++) {
        let buttonId = String(x) + String(y)
        let buttonIterator = buttons.find(el => el.id == buttonId)
        x -= 1
        y += 1
        if (buttonIterator.innerHTML) {
            if (buttonIterator.innerHTML != button.innerHTML) {
                return false
            }
        } else {
            return false
        }
    }
    return true
}
function checkTie() {
    return !buttons.some(button => button.innerHTML == "")
}