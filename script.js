const $=s=>document.querySelector(s);
const scenes=[...document.querySelectorAll(".scene")];
const photos=[
["img/aradhya1.webp","A little pink moment"],
["img/aradhya2.webp","A beautiful close-up"],
["img/aradhya3.webp","A playful memory"],
["img/aradhya4.webp","A candid moment"],
["img/aradhya5.webp","A soft little smile"],
["img/aradhya6.webp","A sweet companion"],
["img/aradhya7.webp","A purple day"],
["img/aradhya8.webp","A fun filter moment"],
["img/aradhya9.webp","A lovely little memory"],
["img/aradhya10.webp","One more smile"],
["https://raw.githubusercontent.com/vedant313/happy-birthday-master/main/img/lydia2.png","Last year’s birthday memory"]
]
let current=0, timeline;
const gallery=$("#gallery");
photos.forEach((p,i)=>{const b=document.createElement("button");b.className="gallery-item"+(i===photos.length-1?" old-memory":"");b.innerHTML=`<img src="${p[0]}" alt="Aradhya photo ${i+1}" loading="eager"><span>${p[1]}</span>`;const im=b.querySelector("img");im.onerror=()=>{if(i===photos.length-1){im.src="img/aradhya1.webp";b.querySelector("span").textContent="A favourite memory";}else{im.src="img/aradhya"+(i+1)+".webp";}};b.addEventListener("click",()=>showPhoto(i));gallery.appendChild(b)});
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
 .from(".wa-phone",{scale:.88,y:25,opacity:0,duration:.8,ease:"back.out(1.5)"})
 .from(".wa-bubble",{opacity:0,y:12,stagger:.28,duration:.45})
 .from(".wa-compose",{opacity:0,y:10,duration:.3})
 .to(".wa-send",{scale:1.12,duration:.2,yoyo:true,repeat:1},"+=.8")
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
 .call(startBirthdaySong)
 .from(".portrait-frame",{opacity:0,scale:.65,rotation:-5,duration:1,ease:"back.out(1.5)"})
 .from(".wish-hbd",{opacity:0,y:25,duration:.8},"-=.2")
 .from(".wish p",{opacity:0,y:15,duration:.7},"-=.3")
 .to(".six",{autoAlpha:0,duration:.7},"+=3.2")
 .set(scenes[5],{autoAlpha:1})
 .call(makeBalloons)
 .call(fireworksBurst)
 .to({}, {duration:.75})
 .call(fireworksBurst)
 .to({}, {duration:.75})
 .call(fireworksBurst)
 .to({}, {duration:.75})
 .call(fireworksBurst)
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
let songStarted=false;
async function startBirthdaySong(){
 const song=$("#birthdaySong");
 if(!song || songStarted)return;
 song.volume=.8;
 try{await song.play();songStarted=true;$("#musicText").textContent="Birthday music ♪";}
 catch(e){$("#musicText").textContent="Tap for birthday music";}
}
function fireworksBurst(){
 const canvas=$("#fireworks"),ctx=canvas.getContext("2d");
 const dpr=Math.min(devicePixelRatio||1,2);
 canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;
 canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";
 ctx.setTransform(dpr,0,0,dpr,0,0);
 let particles=[];
 for(let b=0;b<13;b++){
  const x=innerWidth*(.12+Math.random()*.76),y=innerHeight*(.12+Math.random()*.48);
  const hue=[325,340,285,42,15][b%5];
  for(let j=0;j<82;j++){const a=Math.PI*2*j/65,sp=1.5+Math.random()*4;
   particles.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:70+Math.random()*45,hue,size:1+Math.random()*2.4});
  }
 }
 let frame=0;
 function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.vx*=.992;p.vy*=.992;p.life--;
   ctx.globalAlpha=Math.max(0,p.life/85);ctx.fillStyle=`hsl(${p.hue},95%,${65+Math.random()*20}%)`;
   ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();
  });
  ctx.globalAlpha=1;particles=particles.filter(p=>p.life>0);
  if(particles.length&&frame++<280)requestAnimationFrame(draw);else ctx.clearRect(0,0,innerWidth,innerHeight);
 }
 draw();
}
function makeBalloons(){const box=$("#balloons");box.innerHTML="";const colors=["#e98ab7","#d8a2dc","#f2c5d9","#b58acb","#f2b4a0","#d77ca9"];for(let i=0;i<34;i++){const b=document.createElement("i");b.className="balloon";b.style.left=(Math.random()*96)+"%";b.style.setProperty("--c",colors[i%colors.length]);b.style.setProperty("--d",(8+Math.random()*8)+"s");b.style.setProperty("--delay",(-Math.random()*12)+"s");b.style.transform=`scale(${.65+Math.random()*.65})`;box.appendChild(b)}}
$("#replay").addEventListener("click",()=>{if(timeline)timeline.restart()});
$("#again").addEventListener("click",()=>{if(timeline)timeline.restart();});
$("#send").addEventListener("click",()=>{const b=$("#chat");b.style.outline="2px solid #d88ab2";b.style.outlineOffset="3px";gsap.fromTo(b,{scale:.97},{scale:1,duration:.35,ease:"back.out(2)",onComplete:()=>{b.style.outline="none"}});});

let audioCtx=null,playing=false,loop=null,note=0;
const melody=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46,523.25,587.33,659.25,523.25,440,523.25,587.33,659.25];
function tone(f){const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type="sine";o.frequency.value=f;g.gain.setValueAtTime(.0001,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.075,audioCtx.currentTime+.04);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.38);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.4)}
$("#musicBtn").addEventListener("click",async()=>{
 const song=$("#birthdaySong");
 if(song && !song.paused){song.pause();$("#musicText").textContent="Play birthday music";}
 else if(song){try{await song.play();songStarted=true;$("#musicText").textContent="Pause birthday music";}
 catch(e){$("#musicText").textContent="Music unavailable";}}
});
let photoIndex=0;function showPhoto(i){photoIndex=(i+photos.length)%photos.length;$("#viewerImg").src=photos[photoIndex][0];$("#viewer").classList.add("open")}
$("#viewerClose").onclick=()=>$("#viewer").classList.remove("open");$("#prev").onclick=()=>showPhoto(photoIndex-1);$("#next").onclick=()=>showPhoto(photoIndex+1);
$("#viewer").addEventListener("click",e=>{if(e.target.id==="viewer")$("#viewer").classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#viewer").classList.remove("open");if($("#viewer").classList.contains("open")&&e.key==="ArrowRight")showPhoto(photoIndex+1);if($("#viewer").classList.contains("open")&&e.key==="ArrowLeft")showPhoto(photoIndex-1)});
buildTimeline();
