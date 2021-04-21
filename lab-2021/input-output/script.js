console.log("my page is working");

function putBubblesAllOverPage()  {

  let bubbles = document.querySelectorAll(".bubble");

  bubbles.forEach(function(bubble) {
    console.log("bubble");
    let randomHorizontal = Math.floor(Math.random() * window.innerWidth);
    let randomVertical= Math.floor(Math.random() * window.innerHeight);

    console.log(randomHorizontal,  randomVertical);
    bubble.style.top = randomVertical + "px";
    bubble.style.left = randomHorizontal + "px";
  })
}

document.addEventListener('keydown',addBubble);

function addBubble(event) {
  console.log(event.key)
  if (event.key === "b") {
    let bubbleAdder =  document.createElement("div");
    bubbleAdder.classList.add("bubble")
  } else{
    console.log("user pressed i dont care")
  }

}

putBubblesAllOverPage();
