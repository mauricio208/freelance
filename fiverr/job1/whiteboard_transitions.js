// The following code require jQuery 1.4+ (http://code.jquery.com/jquery-1.12.0.min.js) and transit.js (http://ricostacruz.com/jquery.transit/jquery.transit.min.js)
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Simple transition functions

function runAnimations(transit_info) {
	var transit_info=JSON.parse(transit_info);
	$.each(transit_info,function(k,v){
		if (k=="mR") {
			moveRight(v);
		}
	})
}

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
