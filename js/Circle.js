//默认要求外层的dom元素是正方形
;(function(){
	function Circle(selector,setting){
	
		var direction = {
			"right"  : 0,
			"left"   : Math.PI,
			"top"    : -Math.PI/2,
			"bottom" : Math.PI/2
		}
		
		var defaultsetting={
			maxX:88,			    //默认的百分比的进度 88%
			frontColor:"#ff0000",   // 前景色 默认是红色 
			backgroundColor:"#999", // 背景色 默认是红色
			fontsize:20,			//默认字的大小
			startDirection:"top",  //从3点方向开始，顺时针
			linewidth:10,			//线条的粗细
		}
		if(setting){
			for(var p in defaultsetting){
				if(setting[p] != undefined){
					defaultsetting[p] = setting[p];
				}
			}
		}
		
		var circle;
		if(typeof selector == "string"){
			circle = document.querySelector(selector);
		}
		else{	//传入就是一个dom对象
			circle = selector;
		}
		
		var w = circle.offsetWidth;
		var o = { x: w/2 , y : w/2 , r: w/2-defaultsetting.linewidth} ; // 圆心坐标
		
		
		var can = document.createElement("canvas");
		
		can.setAttribute("width",w+"px");
		can.setAttribute("height",w+"px");
		//can.style.height="200px";
		
		circle.appendChild(can);
		
		var ctx = can.getContext("2d");
		var x = 0; //当前的百分比值
		var maxX = defaultsetting.maxX;
		var y = 0; //弧度
		
		//策略模式
		var startPoint = direction [ defaultsetting.startDirection ] || 0;
	
	
		var timer = setInterval(function(){
			x++;
			if(x >= maxX){
				clearInterval(timer)
			}
			y = startPoint +  2*Math.PI * x / 100
	
			ctx.clearRect(0,0,w,w);
			
			ctx.lineWidth = defaultsetting.linewidth;			//线条粗细
			ctx.beginPath();
			ctx.strokeStyle= defaultsetting.frontColor;  //前景色线条颜色
			ctx.arc(o.x,o.y,o.r,startPoint,y);    //前景色
			ctx.stroke();
			
			ctx.beginPath();
			ctx.strokeStyle= defaultsetting.backgroundColor;    //背景色 线条颜色
			ctx.arc(o.x,o.y,o.r,y,2*Math.PI+startPoint);   //背景色
			ctx.stroke();
			
			ctx.textAlign="center";
			ctx.textBaseline = "middle";
			ctx.font=defaultsetting.fontsize +"px 微软雅黑";
			ctx.fillText(x+"%",o.x,o.x);
			
		},1000/25)
	}	
	
	window.Circle = Circle;

})();
