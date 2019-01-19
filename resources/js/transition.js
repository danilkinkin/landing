(function(){
	var machine = {
		quadratic: {
			ease: function(t, power){
				return t*t*(3-2*t);
			},
			easeIn: function(t, power){
				return t*t;
			},
			easeOut: function(t, power){
				return -t*(t-2);
			}
		},	
		cubic: {
			ease: function(t, power){
				if (t < 0.5) return 4*t*t*t;
				return 4*(t-1)*(t-1)*(t-1)+1;
			},
			easeIn: function(t, power){
				return t*t*t;
			},
			easeOut: function(t, power){
				return (t-1)*(t-1)*(t-1)+1;
			}			
		},
		quartic: {
			ease: function(t, power){
				if (t < 0.5) return 8*t*t*t*t;
				return -8*(t-1)*(t-1)*(t-1)*(t-1)+1;
			},
			easeIn: function(t, power){
				return t*t*t*t;
			},
			easeOut: function(t, power){
				return -(t-1)*(t-1)*(t-1)*(t-1)+1;
			}			
		},
		quintic: {
			ease: function(t, power){
				if (t < 0.5) return 16*t*t*t*t*t;
				return 16*(t-1)*(t-1)*(t-1)*(t-1)*(t-1)+1;
			},
			easeIn: function(t, power){
				return t*t*t*t*t;
			},
			easeOut: function(t, power){
				return (t-1)*(t-1)*(t-1)*(t-1)*(t-1)+1;
			}		
		}
	}

	window.Transition = machine;
})()