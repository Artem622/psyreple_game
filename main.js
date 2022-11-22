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
        }, 3000)
    }));



}

Clicker()
    .then(
        data => {
            //TODO: Show graphic
            const goodData = data.TimestampClick.map((el, key) => {
                return el - 3000 * key;
            })
            console.log(goodData);

            //TODO:  условие на адекватность
            var mediana = goodData[6];
            console.log(mediana);
            let flag = true;
            for (let i = 3; i < goodData.length; i += 1) {
                if (Math.abs(goodData[i]-mediana) >=100){
                    flag = false;
                }
            }
            const el = document.querySelector('#wrapper')
            el.style.display = 'block'

            if (flag == true){
                //TODO: grafic
                new Chart(document.getElementById("line-chart"), {
                    type: 'line',
                    data: {
                        labels: [1,2,3,4,5,6,7],
                        datasets: [{
                            data: [goodData[3],goodData[4],goodData[5],goodData[6],goodData[7],goodData[8],goodData[9]],
                            label: "время реакции в милисекундах",
                            borderColor: "#c10c8e",
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
            }
            else {
                console.log('ты ебаный даун');
            }





        }
    )