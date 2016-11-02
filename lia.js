$(function(){
	var add=$('.add');
	var ul=$('.todolist');
	var input=$('.header input');
	
	//存储todos数据
	var todos=[];
	//记录触摸的起始位置
	var starPos;
	if(localStorage.todos){
		todos=JSON.parse(localStorage.todos);
		//渲染
		render();
	}
	function render(){
		ul.empty();
		for (var i=0;i<todos.length;i++){
			var c=(todos[i].state)? "done":"";
			$('<li class="'+c+'"><div class="content">'+todos[i].name+'</div><div class="delete">×</div></li>').appendTo(".todolist")
			};
		}
	
	add.on("touchend",function(){
		var v=input.val();
		if(!v){
			return;
		}
		var todo={name:v,state:0};
		todos.push(todo);
		localStorage.ss=JSON.stringify(todos);
		render();
		input.val("");
	});
	
	$('.todolist').on('touchstart','li',function(e){
		starpos=e.originalEvent.changedTouches[0].clientX;
//		console.log(pos);
	});
	$('.todolist').on('touchend','li',function(e){
		var n=e.originalEvent.changedTouches[0].clientX;
		if(n-starpos>=50){
			todos[$(this).index()].state=1;
			$(this).addClass("done");
			localStorage.ss=JSON.stringify(todos);
		}
		if(n-starpos<-50){
			todos[$(this).index()].state=0;
			$(this).removeClass("done");
			localStorage.ss=JSON.stringify(todos);
		}
	});
})

