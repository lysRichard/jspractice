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
	function startMove(obj1,json,fn){
		var flag=true;
		clearInterval(obj1.timer);
		//设置计时器
		obj1.timer=setInterval(function(){
			for(var attr in json){
			//取当前值
				var icur=0;
			if(attr=='opacity'){
				icur=Math.round(parseFloat(getStyle(obj1,attr))*100);
			}else{
				icur=parseInt(getStyle(obj1,attr));
			}
			//计算速度
			var speed=(json[attr]-icur)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			//检测停止
			if(icur!=json[attr]){
				flag=false;
			}
			if(attr=='opacity'){
					obj1.style.filter='alpha(opacity:'+(icur+speed)+')'
					obj1.style.opacity=(icur+speed)/100;
				}else{
					obj1.style[attr]=icur+speed+'px';
				}
			if(flag){
				clearInterval(obj1.timer);
				if(fn){
				fn();
				}
			}
		}//json结束
		},30);
	}
	function getStyle(obj1,attr){
		if(obj1.currentStyle){
			return obj1.currentStyle[attr];
		}else{
			return getComputedStyle(obj1,false)[attr]
		}
	}