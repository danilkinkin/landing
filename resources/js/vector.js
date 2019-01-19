function Vector(paths){
	this.time = function(t){
		var delata = 0;
		t = t<0? 0 : (t>1? 1 : t);

		for(var i=0; i<paths.length; i++){
			if(paths[i].start > t) delata = 0;
			if(paths[i].start <= t && paths[i].end >= t) delata = interpolation((t-paths[i].start)/paths[i].duration);
			if(paths[i].end < t) delata = 1;
			paths[i].path.style.strokeDashoffset = (paths[i].direction+paths[i].shift)*paths[i].length*(1-delata*paths[i].end);
		}

		return this;
	}

	this.transition = function(callback){
		interpolation = callback;
		return this;
	}

	var interpolation = t => t;

	for(var i=0; i<paths.length; i++){
		paths[i] = {
			length: paths[i].path.getTotalLength(),
			path: paths[i].path,
			start: paths[i].start,
			end: paths[i].end,
			duration: paths[i].end - paths[i].start,
			direction: paths[i].reverse? 1 : -1,
			shift: paths[i].shift? paths[i].shift : 0,
		}

		paths[i].path.style.strokeDasharray = paths[i].length;
		paths[i].path.style.strokeDashoffset = paths[i].length*(paths[i].direction+paths[i].shift);
	}

	return this;
}