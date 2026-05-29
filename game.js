
const c=document.getElementById('game'),x=c.getContext('2d');
c.width=innerWidth;c.height=innerHeight;
let ship=new Image(),bossImg=new Image();bossImg.src='assets/boss.png';
let player={x:innerWidth/2,y:innerHeight-120,hp:5};
let boss={x:200,y:80,w:180,h:180,hp:100,dx:4};
let bullets=[],enemy=[];let left=false,right=false,fire=false;

function pick(n){
 ship.src='assets/ship'+n+'.png';
 menu.style.display='none';loading.style.display='flex';
 setTimeout(start,2000);
}
function start(){
 loading.style.display='none';game.style.display='block';
 controls.style.display='flex';
 loop();setInterval(spawnPattern,1200);
}
function spawnPattern(){
 for(let a=0;a<360;a+=20){
   let r=a*Math.PI/180;
   enemy.push({x:boss.x+90,y:boss.y+90,dx:Math.cos(r)*3,dy:Math.sin(r)*3});
 }
}
l.ontouchstart=()=>left=true;l.ontouchend=()=>left=false;
r.ontouchstart=()=>right=true;r.ontouchend=()=>right=false;
f.ontouchstart=()=>fire=true;f.ontouchend=()=>fire=false;

setInterval(()=>{if(fire) bullets.push({x:player.x+30,y:player.y});},150);

function loop(){
 x.clearRect(0,0,c.width,c.height);

 boss.x+=boss.dx;
 if(boss.x<0||boss.x>c.width-boss.w) boss.dx*=-1;

 if(left) player.x-=7;
 if(right) player.x+=7;

 x.fillStyle='red';x.fillRect(c.width/2-150,20,boss.hp*3,20);
 x.fillStyle='white';x.fillText('Boss HP',c.width/2-20,15);

 for(let i=0;i<player.hp;i++){
   x.fillStyle='lime';x.fillRect(c.width-30-(i*25),c.height-30,20,20);
 }

 x.drawImage(bossImg,boss.x,boss.y,boss.w,boss.h);
 x.drawImage(ship,player.x,player.y,60,60);

 bullets.forEach((b,bi)=>{
   b.y-=10;x.fillStyle='cyan';x.fillRect(b.x,b.y,4,12);
   if(b.x>boss.x&&b.x<boss.x+boss.w&&b.y>boss.y&&b.y<boss.y+boss.h){
      boss.hp--; bullets.splice(bi,1);
   }
 });

 enemy.forEach((e,ei)=>{
   e.x+=e.dx;e.y+=e.dy;
   x.fillStyle='orange';x.beginPath();x.arc(e.x,e.y,8,0,7);x.fill();
   if(e.x>player.x&&e.x<player.x+60&&e.y>player.y&&e.y<player.y+60){
      player.hp--; enemy.splice(ei,1);
      if(player.hp<=0){game.style.display='none';controls.style.display='none';gameover.style.display='flex';return;}
   }
 });

 if(boss.hp<=0){
   game.style.display='none';controls.style.display='none';victory.style.display='flex';
   confetti({particleCount:400,spread:180});
   return;
 }
 requestAnimationFrame(loop);
}
