const $=s=>document.querySelector(s);
const scenes=[...document.querySelectorAll(".scene")];
const photos=[
["img/aradhya1.webp","A little pink moment"],["img/aradhya2.webp","A beautiful close-up"],
["img/aradhya3.webp","A playful memory"],["img/aradhya4.webp","A candid moment"],
["img/aradhya5.webp","A soft little smile"],["img/aradhya6.webp","A sweet companion"],
["img/aradhya7.webp","A purple day"],["img/aradhya8.webp","A fun filter moment"]
];
let current=0, timeline;
const gallery=$("#gallery");
photos.forEach((p,i)=>{const b=document.createElement("button");b.className="gallery-item";b.innerHTML=`<img src="${p[0]}" alt="Aradhya photo ${i+1}" loading="lazy"><span>${p[1]}</span>`;b.addEventListener("click",()=>showPhoto(i));gallery.appendChild(b)});
function showScene(i){gsap.set(scenes,{autoAlpha:0});gsap.set(scenes[i],{autoAlpha:1});}
function buildTimeline(){
 if(timeline)timeline.kill();
 gsap.set(scenes,{autoAlpha:0});
 timeline=gsap.timeline();
 timeline.set(scenes[0],{autoAlpha:1})
 .from(".one h1",{y:35,opacity:0,duration:1.1,ease:"power3.out"})
 .from(".two",{y:18,opacity:0,duration:.7},"-=.35")
 .to(".one",{autoAlpha:0,y:-25,duration:.8},"+=2.4")
 .set(scenes[1],{autoAlpha:1})
 .from(".three p",{scale:.65,opacity:0,duration:1,ease:"back.out(1.7)"})
 .to(".three",{autoAlpha:0,duration:.7},"+=2.2")
 .set(scenes[2],{autoAlpha:1})
 .from(".text-box",{scale:.75,opacity:0,duration:.8,ease:"back.out(1.5)"})
 .from(".chat",{opacity:0,y:15,duration:.5})
 .from(".fake-btn",{scale:0,opacity:0,duration:.35})
 .to(".fake-btn",{backgroundColor:"#f8c4dd",duration:.3},"+=1.2")
 .to(".four",{autoAlpha:0,y:-35,duration:.7},"+=.6")
 .set(scenes[3],{autoAlpha:1})
 .from(".idea-1",{opacity:0,y:25,duration:.7})
 .to(".idea-1",{opacity:0,y:-20,duration:.5},"+=1.6")
 .from(".idea-2",{opacity:0,y:25,duration:.7})
 .to(".idea-2",{opacity:0,y:-20,duration:.5},"+=1.5")
 .from(".idea-3",{opacity:0,y:25,duration:.7})
 .from(".idea-3 strong",{scale:0,rotation:-12,duration:.6,ease:"back.out(2)"})
 .to(".idea-3",{opacity:0,y:-20,duration:.5},"+=1.8")
 .from(".idea-4",{opacity:0,y:20,duration:.6})
 .to(".idea-4",{opacity:0,duration:.45},"+=1.2")
 .from(".idea-5",{opacity:0,scale:.6,rotation:-5,duration:.8,ease:"back.out(1.6)"})
 .to(".idea-5",{opacity:0,scale:.7,duration:.5},"+=1.8")
 .from(".idea-6 span",{opacity:0,scale:2.5,rotation:12,stagger:.25,duration:.8,ease:"elastic.out(1,.5)"})
 .to(".idea-6",{opacity:0,scale:.6,duration:.6},"+=1.5")
 .set(scenes[4],{autoAlpha:1})
 .from(".portrait-frame",{opacity:0,scale:.65,rotation:-5,duration:1,ease:"back.out(1.5)"})
 .from(".wish-hbd",{opacity:0,y:25,duration:.8},"-=.2")
 .from(".wish p",{opacity:0,y:15,duration:.7},"-=.3")
 .to(".six",{autoAlpha:0,duration:.7},"+=3.2")
 .set(scenes[5],{autoAlpha:1})
 .call(makeBalloons)
 .from(".party-note",{opacity:0,scale:.7,duration:.8})
 .to(".seven",{autoAlpha:0,duration:.7},"+=3.5")
 .set(scenes[6],{autoAlpha:1})
 .from(".big-heart",{scale:.2,opacity:0,duration:1,ease:"elastic.out(1,.4)"})
 .from(".confetti-word",{opacity:0,y:15,duration:.6},"-=.2")
 .to(".eight",{autoAlpha:0,duration:.7},"+=2.7")
 .set(scenes[7],{autoAlpha:1})
 .from(".nine p",{opacity:0,y:25,duration:.9})
 .from(".nine button",{opacity:0,y:15,duration:.5})
 .from(".last-smile",{opacity:0,duration:.5})
 .to(".nine",{autoAlpha:0,duration:.7},"+=4")
 .set(scenes[8],{autoAlpha:1})
 .from(".gallery-label,.ten h2",{opacity:0,y:20,stagger:.15,duration:.7})
 .from(".gallery-item",{opacity:0,y:30,scale:.94,stagger:.09,duration:.5,ease:"power2.out"});
}
function makeBalloons(){const box=$("#balloons");box.innerHTML="";const colors=["#e98ab7","#d8a2dc","#f2c5d9","#b58acb","#f2b4a0","#d77ca9"];for(let i=0;i<22;i++){const b=document.createElement("i");b.className="balloon";b.style.left=(Math.random()*96)+"%";b.style.setProperty("--c",colors[i%colors.length]);b.style.setProperty("--d",(8+Math.random()*8)+"s");b.style.setProperty("--delay",(-Math.random()*12)+"s");b.style.transform=`scale(${.65+Math.random()*.65})`;box.appendChild(b)}}
$("#replay").addEventListener("click",()=>{if(timeline)timeline.restart()});
$("#again").addEventListener("click",()=>{if(timeline)timeline.restart();});
$("#send").addEventListener("click",()=>{gsap.to(".chat",{color:"#f5a8cc",scale:1.02,yoyo:true,repeat:1,duration:.2})});

let audioCtx=null,playing=false,loop=null,note=0;
const melody=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46,523.25,587.33,659.25,523.25,440,523.25,587.33,659.25];
function tone(f){const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type="sine";o.frequency.value=f;g.gain.setValueAtTime(.0001,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.075,audioCtx.currentTime+.04);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.38);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.4)}
$("#musicBtn").addEventListener("click",async()=>{if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();await audioCtx.resume();if(playing){clearInterval(loop);playing=false;$("#musicText").textContent="Tap for music"}else{playing=true;$("#musicText").textContent="Pause music";tone(melody[note++%melody.length]);loop=setInterval(()=>tone(melody[note++%melody.length]),430)}});
let photoIndex=0;function showPhoto(i){photoIndex=(i+photos.length)%photos.length;$("#viewerImg").src=photos[photoIndex][0];$("#viewer").classList.add("open")}
$("#viewerClose").onclick=()=>$("#viewer").classList.remove("open");$("#prev").onclick=()=>showPhoto(photoIndex-1);$("#next").onclick=()=>showPhoto(photoIndex+1);
$("#viewer").addEventListener("click",e=>{if(e.target.id==="viewer")$("#viewer").classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#viewer").classList.remove("open");if($("#viewer").classList.contains("open")&&e.key==="ArrowRight")showPhoto(photoIndex+1);if($("#viewer").classList.contains("open")&&e.key==="ArrowLeft")showPhoto(photoIndex-1)});
buildTimeline();
