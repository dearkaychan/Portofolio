// ===== EDIT DI SINI =====
const PLAYLIST_URL = "#"; // tempel link playlist Spotify-mu
const TRACKS = [ // ganti dengan lagu-lagu favoritmu
  ["Judul Lagu 1","Artis 1"],["Judul Lagu 2","Artis 2"],["Judul Lagu 3","Artis 3"],["Judul Lagu 4","Artis 4"],["Judul Lagu 5","Artis 5"]
];
const PHOTO_SRC = ""; // opsional: isi nama file/URL foto PNG-mu
// ========================
document.getElementById('spotify').href = PLAYLIST_URL;

// typing
const words=["mahasiswa Teknologi Informasi","python learner","web enthusiast","pembangun aplikasi kecil"];
let w=0,c=0,del=false;const t=document.getElementById('type');
(function tick(){const s=words[w];t.textContent='> '+s.slice(0,c);
 if(!del&&c<s.length)c++;else if(!del){del=true;return setTimeout(tick,1300)}else if(c>0)c--;else{del=false;w=(w+1)%words.length}
 setTimeout(tick,del?35:70)})();

// reveal + skill bars
document.documentElement.classList.add('js');const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('.fill[data-w]').forEach(f=>f.style.width=f.dataset.w+'%')}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

// glow follows pointer
const glow=document.getElementById('glow'),ringEl=document.getElementById('cur');
let mx=innerWidth/2,my=innerHeight/3,gx=mx,gy=my,rx=mx,ry=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;if(e.pointerType==='mouse')ringEl.style.opacity=1},{passive:true});
document.addEventListener('pointerover',e=>ringEl.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,li,.frame,.card'))));
(function follow(){gx+=(mx-gx)*.09;gy+=(my-gy)*.09;rx+=(mx-rx)*.28;ry+=(my-ry)*.28;
 glow.style.transform=`translate3d(${gx-210}px,${gy-210}px,0)`;ringEl.style.transform=`translate3d(${rx}px,${ry}px,0)`;requestAnimationFrame(follow)})();

// dock menu: penanda bagian aktif
const links=[...document.querySelectorAll('nav li a')],dock=document.querySelector('nav ul');
const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
function setActive(i){links.forEach((a,j)=>a.classList.toggle('on',j===i));dock.style.setProperty('--i',i)}
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(secs.indexOf(e.target))}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>so.observe(s));
addEventListener('scroll',()=>{if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)setActive(secs.length-1)},{passive:true});

// photo: upload + tilt
const file=document.getElementById('file'),img=document.getElementById('photo'),ph=document.getElementById('ph'),frame=document.getElementById('frame');
function show(src){img.src=src;img.style.display='block';ph.style.display='none'}
if(PHOTO_SRC)show(PHOTO_SRC);
try{const s=localStorage.getItem('kaysan-photo');if(s)show(s)}catch(e){}
frame.addEventListener('click',()=>file.click());
file.addEventListener('change',()=>{const f=file.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{show(r.result);try{localStorage.setItem('kaysan-photo',r.result)}catch(e){}};r.readAsDataURL(f)});
frame.addEventListener('pointermove',e=>{const b=frame.getBoundingClientRect();const x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;frame.style.transform=`rotateY(${x*18}deg) rotateX(${-y*18}deg)`});
frame.addEventListener('pointerleave',()=>frame.style.transform='');

// playlist
const tl=document.getElementById('tl'),now=document.getElementById('now'),cover=document.getElementById('cover'),prog=document.getElementById('prog');
let cur=-1,timer=null,p=0;
TRACKS.forEach((tr,i)=>{const li=document.createElement('li');li.innerHTML=`<span>${i+1}. ${tr[0]}</span><small>${tr[1]}</small>`;li.onclick=()=>play(i);tl.appendChild(li)});
function play(i){
  if(cur===i){cover.classList.toggle('on');if(!cover.classList.contains('on')){clearInterval(timer)}else run();return}
  cur=i;p=0;[...tl.children].forEach((l,j)=>l.classList.toggle('act',j===i));
  now.textContent=TRACKS[i][0]+' — '+TRACKS[i][1];cover.classList.add('on');run()}
function run(){clearInterval(timer);timer=setInterval(()=>{p+=.6;prog.style.width=Math.min(p,100)+'%';if(p>=100)play((cur+1)%TRACKS.length)},100)}

// particles
const cv=document.getElementById('bg'),cx=cv.getContext('2d');let pts=[];
function size(){cv.width=innerWidth;cv.height=innerHeight;pts=Array.from({length:Math.min(60,innerWidth/18)},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3}))}
size();addEventListener('resize',size);
(function draw(){cx.clearRect(0,0,cv.width,cv.height);
 pts.forEach((a,i)=>{a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>cv.width)a.vx*=-1;if(a.y<0||a.y>cv.height)a.vy*=-1;
  cx.fillStyle='rgba(255,179,209,.6)';cx.beginPath();cx.arc(a.x,a.y,1.4,0,7);cx.fill();
  for(let j=i+1;j<pts.length;j++){const b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<120){cx.strokeStyle=`rgba(201,182,255,${.18*(1-d/120)})`;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}}});
 requestAnimationFrame(draw)})();
