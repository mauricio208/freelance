// The following code require jQuery 1.4+ (http://code.jquery.com/jquery-1.12.0.min.js) and transit.js (http://ricostacruz.com/jquery.transit/jquery.transit.min.js)
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Logic for transition menu
function loadTransitionInMenu(obj) {
		obj.find(".transition").each(function() {
			mt=$("<div class='menu_transition'></div>");
			mt.append($(this).clone());
			params=$("<div class='transition_group_span_input'></div>");
			param=$(this).html().split("(")[1].split(")")[0].split(",");
			param=param.slice(1);
			for (var i = param.length - 1; i >= 0; i--) {
				p=param[i].split("=");
				input=$("<input class='transition_input' type='number' />");
				input.val(p[1]);
				params.append("<span class='transition_span_input'>"+p[0]+"</span>").append(input);
			}
			mt.append(params);
			obj.find(".menu_transitions").append(mt)
		});
	}
	// function updateTransition(obj)
	$(document).mouseup(function (e)
	{
	    var containers = $(".menu_manage_transitions");
	    containers.each(function(){
	    	container=$(this);
		    if (!container.is(e.target) 
		        && container.has(e.target).length === 0) 
		    {
		        container.hide();
		    }

	    });
	    
	});

	$(".component").on("click",function (){
		menu=$(this).find(".menu_manage_transitions");
		if ( menu.length == 0) {
			$(this).append("<div class='menu_manage_transitions' ><button class='add-animation-transit'>Add animation</button><div class='menu_transitions'></div></div>");
		}else{
			menu.find(".menu_transitions").html("");
		};
		menu.show();
		loadTransitionInMenu($(this));
	});
	$("#add-animation-transit").on("",function() {
		
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