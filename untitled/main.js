const TimestampBird = []
const TimestampClick = []

function ShowImage() {
    TimestampBird.push(new Date().valueOf())
    const img = document.createElement("img")
    img.src = "bird.png"
    img.classList.add("picture")
    document.addEventListener("click",()=>{
        TimestampClick.push(new Date().valueOf())
    })
    const block = document.querySelector(".container")
    block.append(img)
    setTimeout(() => {
        block.textContent = ""
    }, "100")
}
let counter = 0
function Clicker() {

    let a = setInterval(() => {
        counter++
        ShowImage()
        TimestampClick.push()
        console.log(counter)

        if (counter == 10) {
            clearInterval(a)
        }
    }, 5000)


}
const makeUniq = (arr) => {
    return arr.filter((el, id) => arr.indexOf(el) === id);
}

Clicker()
