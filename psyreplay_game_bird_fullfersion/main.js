const TimestampClick = []
let bird = false;
// bird on screen
let uid = parseInt(localStorage.getItem('uid'))
// bird on screen
const query = window.location.href.split("?");
if (query.length > 1) {
    uid = parseInt(query[1].split('=')[1])
    localStorage.setItem('uid',uid)
    window.location = "/";
}
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
                var meaning = Math.floor((goodData.map(i => x += i, x = 0).reverse()[0])/goodData.length);
                console.log(goodData)
                console.log(meaning)
                let hr = `https://results.psyreply.com?id=${uid}`
                axios.post("https://hook.eu1.make.com/od2wlwkp3peiuwzphod9h4u4ninu3dp4", {
                    result: meaning,
                    uid: uid,
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.error(err)
                })
                console.log(goodData);

                //TODO:  условие на адекватность
                var mediana = goodData[6];
                var average = Math.floor((goodData[3] + goodData[4] + goodData[5] + goodData[6] + goodData[7] + goodData[8] + goodData[9]) /7)
                console.log(mediana);
                let flag = true;
                for (let i = 3; i < goodData.length; i += 1) {
                    if (Math.abs(goodData[i]-mediana) >=3000){
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
                if (flag == true && goodData.length >= 0){
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
