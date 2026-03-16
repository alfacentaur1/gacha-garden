export default function triggerRainEffect(fieldId) {
    const media = new Audio('../media/rain.mp3');
    const svg = document.getElementById(`rain-svg-${fieldId}`);
    if (!svg) return;

    const NS = "http://www.w3.org/2000/svg";
    svg.innerHTML = ""; 
    const raindropCount = 40;
    media.play();

    for (let i = 0; i < raindropCount; i++) {
        //raindrop
        const line = document.createElementNS(NS, "line");
        const x = Math.random() * 100;
        const delay = Math.random() * 2; 
        const dur = 0.5 + Math.random() * 0.2;
        line.setAttribute("x1", `${x}%`);
        line.setAttribute("x2", `${x}%`);
        line.setAttribute("y1", "-10");
        line.setAttribute("y2", "-30");
        line.setAttribute("stroke", "lightblue");
        line.setAttribute("stroke-width", "2");
        line.setAttribute("stroke-linecap", "round");
        line.style.opacity = Math.random() * 0.7 + 0.3;
        
        //animation
        const anim = document.createElementNS(NS, "animateTransform");
        anim.setAttribute("attributeName", "transform");
        anim.setAttribute("type", "translate");
        anim.setAttribute("from", "0 0");
        anim.setAttribute("to", "50 470"); 
        anim.setAttribute("dur", `${dur}s`);
        anim.setAttribute("begin", `${delay}s`);
        anim.setAttribute("repeatCount", "indefinite");
        anim.setAttribute("fill", "remove");
        

        line.appendChild(anim);
        svg.appendChild(line);
    }
    //after 1.2 seconds, stop the sound and clear the raindrops
    setTimeout(() => {
        media.pause();
        media.currentTime = 0;
        svg.innerHTML = "";
    }, 1200);

}