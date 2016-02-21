// The following code require jQuery 1.4+ (http://code.jquery.com/jquery-1.12.0.min.js) and transit.js (http://ricostacruz.com/jquery.transit/jquery.transit.min.js)
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Logic for transition menu
	function loadTransitionInMenu(obj) {
		obj.find(".transition").each(function() {
			mt=$("<div class='menu_transition'><button class='update-animation-transit'>update animation</button></div>");
			t=$(this).clone();
			t.prop("class","transition_to_update");
			mt.append(t);
			params=$("<div class='transition_group_span_input'></div>");
			param=$(this).html().split("(")[1].split(")")[0].split(",");
			param=param.slice(1);
			for (var i = param.length - 1; i >= 0; i--) {
				p=param[i].split("=");
				input=$("<input class='transition_input' type='number' name='"+p[0]+"' />");
				input.val(p[1]);
				span=$("<span class='transition_span_input'>"+p[0]+"</span>").append(input);
				params.append(span);
			}
			mt.append(params);
			obj.find(".menu_transitions").append(mt)
		});
	}
	function updateTransitionInMenu(obj){
		t=obj.find(".transition_to_update");
		function_name=t.html().split("(")[0];
		params="";
		obj.find(".transition_input").each(function(){
			params=","+$(this).attr("name")+"="+$(this).val()+params;
		})
		updated_function=function_name+"(obj"+params+")";
		t.html(updated_function);
	};

	function updateTransitionToComponent(obj){
		scripts=obj.find("script");
		if (scripts.length > 0){
			scripts.each(function(){
				$(this).prop("class","transition");
			});
			t=obj.parent().find(".transitions")
			t.html("");
			t.append(scripts);
		}
	};
	$(document).mouseup(function (e)
	{
	    var containers = $(".menu_manage_transitions");
	    containers.each(function(){
	    	container=$(this);
		    if (!container.is(e.target) 
		        && container.has(e.target).length === 0) 
		    {
		        container.hide();
		        updateTransitionToComponent(container);
		    }

	    });
	    
	});

	$(".component").on("click",function (){
		menu=$(this).find(".menu_manage_transitions");
		if ( menu.length == 0) {
			$(this).append("<div class='menu_manage_transitions'><button class='add-animation-transit'>Add animation</button><div class='menu_transitions'></div></div>");
		}else{
			menu.find(".menu_transitions").html("");
		};
		menu.show();
		loadTransitionInMenu($(this));
	}).on('click','.menu_manage_transitions',function(e) {
        e.stopPropagation();
    }).on('click',".update-animation-transit",function() {
		updateTransitionInMenu($(this).parent());
	});

	$(".add-animation-transit").on("click",function() {
		
	});
	


// Simple transition functions
function runMyTransitions(obj) {
	$(".component").find("script.transit").each(functon(){
		eval(this.html());
	});
};

function runAllTransitions() {
	$(".component").each(function(){
		runMyTransitions(this);
	});
};


function moveRight(obj,start,duration,px) {
    if (px>=1) {
        setTimeout( ($(obj).transition({ x:px,duration:duration})) , start*1000)
    }
};
function moveLeft(obj,start,duration,px) {
    if (px<0) {
        setTimeout( ($(obj).transition({ x:px,duration:duration})) , start*1000)
    }
};