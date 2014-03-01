
Groups = Proto.clone().newSlots({
	protoType: "Groups",
	groups: [],
}).setSlots({
	
	add: function(g)
	{
		this.groups().push(g)
	},
	
	groupWithKey: function(k)
	{
		for (var i = 0; i < this.groups().length; i ++)
		{
			var g = this.groups()[i]
			if (g.key() == k)
			{
				return g
			}
		}
		return null
	}
})




// ----------------------

WaveGroup = Group.clone().newSlots({
	protoType: "WaveGroup",
	items: null,
	spacing: 500,
	itemXScale: 1,
	itemYScale: 1,
	max: 5,
	orientation: "x",
	key: "1"
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		this.addSquares()
		console.log("add sq")
	},
	
	addRowAtY: function(y, inverted)
	{
		var xoffset = 0
		var h = Math.sqrt(3)/2.0
		var side = 2*1/h
		
		if (inverted)
		{
			xoffset = .5
		}
		var xmax = this._max*10
		for (var x = -xmax; x < xmax; x ++)
		{
			var s = Prism.clone()
			s._object.scale.x = 1
			s._object.scale.y = 1
			s._object.position.x = (x + xoffset) + y/2
			s._object.position.y = y*.869 - inverted*h/3
		
			//if (invert)
			{
			 	s._object.rotation.z = Math.PI * (inverted) - Math.PI/2
			}
			s.setGroupX(x)
			s.setGroupY(y)
		
			// var r = Math.random()
			// s.setColor(new THREE.Color().setRGB(r,r,r))
			var c = Palettes.current().foregroundColors();
			var cc = c[Math.floor(Math.random()*c.length)];
			// console.log(Colors.hex2hsv(cc));
			var chsv = Colors.hex2hsv(cc);
			var crgb = Colors.hex2rgb(cc);

			var crand = Math.random()
			crgb.R = crgb.R + Math.floor(100*crand)
			crgb.R = (crgb.R>=255 ? 255 : crgb.R)
			crgb.G = crgb.G + Math.floor(100*crand)
			crgb.G = (crgb.G>=255 ? 255 : crgb.G)
			crgb.B = crgb.B + Math.floor(100*crand)
			crgb.B = (crgb.B>=255 ? 255 : crgb.B)
			// crgb.G += 50
			// crgb.G = crgb.G - crgb.G%255
			// crgb.B += 50
			// crgb.B = crgb.B - crgb.B%255


			cc = Colors.rgb2hex(crgb.R, crgb.G, crgb.B);

			console.log(cc)
			s.setColor(new THREE.Color(cc))
			this.addItem(s)	
		}	
	},
	
	addSquares: function()
	{
		var ymax = this._max-1
		
		for (var y = -ymax; y < ymax+1; y ++)
		{
			var invert = Math.abs(y) % 2 == 0
			var xoffset = (Math.abs(y) % 2)*.5
			
			this.addRowAtY(y, 0)
			this.addRowAtY(y, 1)
		}
	}
})

Groups.add(WaveGroup) // for 0 key
Groups.add(WaveGroup)
