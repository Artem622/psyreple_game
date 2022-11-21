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
        }, 5000)
    }));


// }
// //delete
// const makeUniq = (arr) => {
//     return arr.filter((el, id) => arr.indexOf(el) === id);
}

Clicker()
    .then(
        data => {
            //TODO: Show graphic
            const goodData = data.TimestampClick.map((el, key) => {
                return el - 5000 * key;
            })
            console.log(goodData);
                // window.open("/home/artemk/WebstormProjects/untitled1/index.html")
                //TODO:  условие на адекватность
                const el = document.querySelector('#wrapper')
                el.style.display = 'block'
            new Chart(document.getElementById("line-chart"), {
                type: 'line',
                data: {
                    labels: [1,2,3,4,5,6,7],
                    datasets: [{
                        data: [goodData[3],goodData[4],goodData[5],goodData[6],goodData[7],goodData[8],goodData[9]],
                        label: "время реакции в милисекундах",
                        borderColor: "#c1a20c",
                        fill: false
                    }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Твои лучшие попытки',

                    }
                }
            });

// Themes begin

// Themes end

// Create chart instance

        }
    )