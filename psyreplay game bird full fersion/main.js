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
                //TODO: Show graphic
                const goodData = data.TimestampClick.map((el, key) => {
                    return el - 3000 * key;
                })
                console.log(goodData);

                //TODO:  условие на адекватность
                var mediana = goodData[6];
                var average = Math.floor((goodData[3] + goodData[4] + goodData[5] + goodData[6] + goodData[7] + goodData[8] + goodData[9]) /7)
                console.log(mediana);
                let flag = true;
                for (let i = 3; i < goodData.length; i += 1) {
                    if (Math.abs(goodData[i]-mediana) >=200){
                        flag = false;
                    }
                }
                const el = document.querySelector('#wrapper')
                el.style.display = 'flex'
                document.querySelector(".container").style.display = "none";
                document.querySelector(".graf").style.display = "flex";
                document.querySelector(".container_click").style.height = "0vh" ;
                document.querySelector(".container_click").style.width = "0vh" ;
                document.getElementById("average").innerHTML = average;
                document.querySelector("#success_1").onclick = function(){
                    location.reload()
                }
                if (flag == true && goodData.length == 10){
                    //TODO: grafic
                    new Chart(document.getElementById("line-chart"), {
                        type: 'line',
                        data: {
                            labels: [1,2,3,4,5,6,7],
                            datasets: [{
                                data: [goodData[3],goodData[4],goodData[5],goodData[6],goodData[7],goodData[8],goodData[9]],
                                label: "время реакции в милисекундах",
                                borderColor: "#c10c8e",
                                fill: false,
                                backgroundColor: "#0bff76",

                            }]

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
                    document.querySelector('.main_after_test').style.display = "flex";
                    document.querySelector(".container").style.display = "none";
                    document.querySelector("#wrapper").style.display = "none";
                    document.querySelector(".graf").style.display = "none";
                    document.querySelector(".container_click").style.display = "none";
                    document.querySelector(".container_click").style.height = "0vh" ;
                    document.querySelector(".container_click").style.width = "0vh" ;
                    document.querySelector("#losetry").onclick = function(){
                        location.reload()
                    }

                }
            }
        )
}
