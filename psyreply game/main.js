const TimestampClick = []
let bird = false;
// bird on screen
function ShowImage() {

    bird = true;
    const birdTime = Date.now();
    const img = document.createElement("img")
    img.src = "bird.png"

    img.classList.add("picture")
    document.addEventListener("click",()=>{
        const el = document.querySelector('.container_click')
        el.style.display = 'flex'
        setTimeout( () => {el.style.display = 'none'},1000)

        //TODO: ONE TIME IN A BIRD
        if (bird) {

            bird = false;
            const clickTime = Date.now();
            console.log(clickTime, birdTime);
            TimestampClick.push(clickTime - birdTime)
        }
    })
    const block = document.querySelector(".container")
    block.append(img)
    setTimeout(() => {
        block.textContent = ""
    }, 100)
}
//counter time
let counter = 0
function Clicker() {
    return new Promise(((resolve, reject) => {
        let a = setInterval(() => {
            counter++
            ShowImage()
            console.log(counter)

            if (counter == 10) {
                clearInterval(a)
                setTimeout(() => {
                    resolve({TimestampClick})
                }, 1000);
            }
        }, 3000)
    }));



}
document.querySelector('.main_after_test').style.display = "none"
document.querySelector(".container").style.display = "none"
document.querySelector("#wrapper").style.display = "none"
document.querySelector(".graf").style.display = "none"

document.querySelector("#submit").onclick = function(){
    document.querySelector(".container").style.display = "flex"
    document.querySelector("#mainpage").style.display = "none"
    document.querySelector(".mainbody").style.display = "none"

    Clicker()
        .then(
            data => {
                //TODO: POST req

                const goodData = data.TimestampClick.map((el, key) => {
                    return el - 3000 * key;
                })
                var meaning = Math.floor((goodData.map(i => x += i, x = 0).reverse()[0])/goodData.length);
                console.log(goodData)
                console.log(meaning)
                axios.post("https://hook.eu1.make.com/od2wlwkp3peiuwzphod9h4u4ninu3dp4", {
                   result: meaning,
                }).then(res => {
                   console.log(res)
                }).catch(err => {
                   console.error(err)
                })
            }
            )
}









