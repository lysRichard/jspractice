
window.onload=function(){
		var ali=document.getElementsByTagName('li');
		for(var i=0;i<ali.length;i++){
			ali[i].timer=null;
			ali[i].onmouseover=function(){
			startMove(this,'height',400,function(){
				startMove(this,'width',400);
			});
		}
			ali[i].onmouseout=function(){
			startMove(this,'height',50);
			}
	}
}
function startMove(obj,json,fn){
	var flag=true;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		for(var attr in json){
			var icur=0;
			if(attr=='opacity'){
				icur=Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				icur=parseInt(getStyle(obj,attr))
			}
			var speed=(json[attr]-icur)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(icur!=attr){
				flag=false;
				if(attr=='opacity'){
					obj.style.filter='alpha(opacity:'+(speed+icur)+')';
					obj.style.opacity=(icur+speed)/100;
				}else{
					obj.style[attr]=icur+speed+'px';
				}
			}
			if(flag){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
		}
	},30)

}
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,attr);
	}
}