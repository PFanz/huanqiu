var xSlider={createNew:function(e,t){var n={},l=null,s=0,i={layType:"h",sliderType:"single",rightStart:!1,value:50,step:1,min:0,max:100,showToolTip:"always",showScale:"always",scaleStep:10,disableArea:[-1,-1]},o=function(){if(!t)return i;for(var n in t)i[n]=t[n];e="string"==typeof e?document.getElementById(e):e,s=i.value},r=function(){l=new xDrag.createNew(e.getElementsByClassName("slider-track-e")[0],{type:i.layType,rangeX:[i.min<0?0:i.min,i.max>e.getElementsByClassName("slider-ruler")[0].offsetWidth?e.getElementsByClassName("slider-ruler")[0].offsetWidth:i.max]}),l.init()},a=function(){var t="";"multiple"==i.sliderType?t+='<div class="slider-ruler slider-multiple">':"single"==i.sliderType&&(t+='<div class="slider-ruler slider-single">'),t+='<div class="slider-line-total"></div><div class="slider-line-choose" style="width:'+i.value+'%">',t+='<div class="slider-track-s"></div>',t+='<div class="slider-track-e"></div>',t+='</div><div class="slider-tooltip"></div><div class="slider-scale"></div></div>',e.innerHTML=t};return n.init=function(){o(),a(),r()},n.onStartMove=function(e){l.onStartMove=function(){e&&e()}},n.onMove=function(t){l.onMove=function(){var n=Math.floor(e.getElementsByClassName("slider-track-e")[0].style.left.toLowerCase().replace("px","")/(e.getElementsByClassName("slider-ruler")[0].style.width?e.getElementsByClassName("slider-ruler")[0].style.width:e.getElementsByClassName("slider-ruler")[0].offsetWidth)*100);n>=s&&(i.value=n,e.getElementsByClassName("slider-line-choose")[0].style.width=n+1+"%"),t&&t()}},n.onStopMove=function(e){l.onStopMove=function(){e&&e()}},n.setValue=function(t){i.value=t,e.getElementsByClassName("slider-line-choose")[0].style.width=t+"%"},n.result=function(){return i.value},n}},xDrag={createNew:function(e,t){var n={},l={type:"all",rangeX:[-1,-1],rangeY:[-1,-1]},s=function(){if(!t)return l;for(var n in t)l[n]=t[n];e="string"==typeof e?document.getElementById(e):e},i=function(t){var s;t=a(t),t.preventDefault&&t.preventDefault(),e=s=this,"all"==l.type?(s.x=t.clientX-e.offsetLeft,s.y=t.clientY-e.offsetTop):"v"==l.type?s.y=t.clientY-e.offsetTop:"h"==l.type&&(s.x=t.clientX-e.offsetLeft),document.onmousemove=o,document.onmouseup=r,n.onStartMove()},o=function(t){t=a(t);var s,i;"all"==l.type?(i=t.clientY-e.y,l.rangeY!=[-1,-1]&&i<=l.rangeY[1]&&i>=l.rangeY[0]&&(e.style.top=i+"px"),s=t.clientX-e.x,l.rangeX!=[-1,-1]&&s<=l.rangeX[1]&&s>=l.rangeX[0]&&(e.style.left=s+"px")):"v"==l.type?(i=t.clientY-e.y,l.rangeY!=[-1,-1]&&i<=l.rangeY[1]&&i>=l.rangeY[0]&&(e.style.top=i+"px")):"h"==l.type&&(s=t.clientX-e.x,l.rangeX!=[-1,-1]&&s<=l.rangeX[1]&&s>=l.rangeX[0]&&(e.style.left=s+"px")),n.onMove()},r=function(t){t=a(t),e=document.onmousemove=document.onmouseup=null,n.onStopMove()},a=function(e){return e||(e=window.event,e.target=e.srcElement,e.layerX=e.offsetX,e.layerY=e.offsetY),e};return n.init=function(){s(),e.onmousedown=i},n.onStartMove=function(){},n.onMove=function(){},n.onStopMove=function(){},n}};