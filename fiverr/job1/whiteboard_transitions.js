// The following code require jQuery 1.4+ (http://code.jquery.com/jquery-1.12.0.min.js) and transit.js (http://ricostacruz.com/jquery.transit/jquery.transit.min.js)
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Logic for transition menu
url="";
ext=".png";
	function createInputsInMenu(contenedor,transition_element) {
		param=transition_element.split("(")[1].split(")")[0].split(",");
		param=param.slice(1);
		for (var i = param.length - 1; i >= 0; i--) {
				p=param[i].split("=");
				input=$("<input class='transition_input' type='number' name='"+p[0]+"' />");
				input.val(p[1]);
				span=$("<span class='transition_span_input'>"+p[0]+"</span>").append(input);
				contenedor.append(span);
			}
	}


	function loadTransitionInMenu(obj) {
		obj.find(".transition").each(function() {
			mt=$("<div class='menu_transition'><button type='button' class='modify_button'><img src='"+url+$(this).html().split("(")[0]+ext+"'alt='"+$(this).html().split("(")[0]+"'></button></div>");
			t=$(this).clone();
			t.prop("class","transition_to_update");
			mt.append(t);
			update_button=$("<button type='button' class='update-animation-transit' hidden>update animation</button><button type='button' class='remove-animation-transit' hidden>remove animation</button>");
			params=$("<div class='transition_group_span_input' hidden></div>");
			createInputsInMenu(params,$(this).html());
			mt.append(params);
			mt.append(update_button);
			obj.find(".menu_transitions").append(mt)
		});
	};
	function updateTransitionInMenu(obj,erase){
		if(erase){
			obj.remove();
		}else{
			t=obj.find(".transition_to_update");
			function_name=t.html().split("(")[0];
			params="";
			obj.find(".transition_input").each(function(){
				params=","+$(this).attr("name")+"="+$(this).val()+params;
			})
			updated_function=function_name+"(obj"+params+")";
			t.html(updated_function);
		}

		updateTransitionToComponent(obj);

	};

	function updateTransitionToComponent(obj){
		scripts=obj.closest(".component").find(".transition_to_update");
		scripts=scripts.clone();
		if (scripts.length > 0){
			scripts.each(function(){
				$(this).prop("class","transition");
			});
			t=obj.closest(".component").find(".transitions")
			t.html(scripts);
		}
	};
	function addTransitionToComponent(obj) {

		component=obj.closest(".component");

		t=obj.parent();
		function_name=obj.prop("name").split("(")[0];
		params="";
		t.find(".transition_input").each(function(){
			params=","+$(this).attr("name")+"="+$(this).val()+params;
		})
		func=function_name+"(obj"+params+")";
		span=$("<span class='transition' hidden>");
		span.html(func);
		component.find(".transitions").append(span);
		t.hide();

	};
	$(document).ready(function(){
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
				$(this).append("<div class='menu_manage_transitions'><button type='button' class='add-animation-transit'>Add animation</button><div class='menu_transitions' hidden></div></div>");
			}else{
				menu.find(".menu_transitions").html("");
			};
			loadTransitionInMenu($(this));
			menu.show();

		}).on('click','.menu_manage_transitions',function(e) {
	        e.stopPropagation();
	    }).on('click','.modify-animation-transit',function(e) {
	        $(this).siblings(".transitions_to_add").hide();
	    	$(this).siblings(".menu_transitions").html("");
	        loadTransitionInMenu($(this).closest(".component"));
	        $(this).siblings(".menu_transitions").toggle();
	    }).on('click',".update-animation-transit",function() {
			updateTransitionInMenu($(this).parent(),false);
		}).on('click',".remove-animation-transit",function() {
			updateTransitionInMenu($(this).parent(),true);
		}).on('click',".add-animation-transit",function() {
			$(this).siblings(".transitions_to_add").toggle();
			$(this).siblings(".menu_transitions").hide();
		}).on('click',".add_transition_button",function() {
			t=$(".param_transition_to_add");
			t.find(".input_transitions_to_add").html("");
			createInputsInMenu(t.find(".input_transitions_to_add"),$(this).prop("name"));
			t.find(".add_transition").prop("name",$(this).prop("name"));
			t.show();
		}).on('click',".modify_button",function() {
			$(this).siblings(".transition_group_span_input").toggle();
			$(this).siblings(".update-animation-transit").toggle();
			$(this).siblings(".remove-animation-transit").toggle();
		}).on('click',".add_transition",function() {
			addTransitionToComponent($(this));

		});

	});


// Transition functions
function runMyTransitions(obj) {
	obj.find(".transition").each(function(){
		eval($(this).html());
	});
};
function run_get_originals() {
	var $originals=[];
	$(".component").each(function(index){
		$originals[index]=$(this).clone();
		runMyTransitions($(this));
	})
	return $originals;
}
function runAllTransitions() {
    $(".component").each(function(){
		runMyTransitions($(this));
	});
};


function moveRight(obj,start,duration,px) {
    if (px>=1) {
        $(obj).velocity({ translateX:"+="+String(px)},{duration:duration*1000,delay:start*1000})
    }
};
function moveLeft(obj,start,duration,px) {
    if (px>=1) {
    	$(obj).velocity({ translateX:"+="+String(px*-1)},{duration:duration*1000,delay:start*1000})
    }
};
