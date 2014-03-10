
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

WaveStrip = Group.clone().newSlots({
	protoType: "WaveStrip",
	spacing: 500,
	itemXScale: 1,
	itemYScale: 1,
	max: 5,
	orientation: "x",
	key: "1",
	waveGroup: null
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		this.addSquares()
	},
	
	setWaveGroup: function(w)
	{
		this._waveGroup = w
		
		var black = new THREE.Color("#000000")

		if (!w.block().doneRendered())
		{
			for (var y = 0; y < w.block().current()*2 + 1; y ++)
			{
				var h = y
				if (w.block().isTop())
				{
					h = this.items().length - y - 1
				}
				var triangle = this.items()[h]
				triangle.setColor(black)
			}
			
			if (w.block().isDone())
			{
				w.block().setDoneRendered(true)
			}
			
		}

	},

	addXY: function(x, y, inverted)
	{
		var h = Math.sqrt(3)/2.0
		//var side = 2/h
		
		var xoffset = 0
		if (inverted)
		{
			xoffset = .5
		}
		
		var s = Prism.clone()
		s._object.scale.x = 1
		s._object.scale.y = 1
		s._object.position.x = (x + xoffset) + y/2
		s._object.position.z = 4

		s._object.position.y = y*.869 

		if (!inverted)
		{
			s._object.position.y -= h/3
		}
		
		//s._object.position.y = y*.869 - inverted*h/3
	
		//if (inverted)
		{
		 	s._object.rotation.z = Math.PI * (1-inverted) - Math.PI/2
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

		//console.log(cc)
		s.setColor(new THREE.Color(cc))
		s.setMover(s, TriangleDropMover.clone())

		this.addItem(s)			
	},
	
	addRowAtY: function(y, inverted)
	{		
		var xmax = 1

		for (var x = 0; x < xmax; x ++)
		{
			this.addXY(x, y, 0)
			this.addXY(x, y, 1)
		}	
	},
	
	addSquares: function()
	{
		var ymax = 9
		
		for (var y = 0; y < ymax; y ++)
		{
			var invert = Math.abs(y) % 2 == 0
			
			this.addRowAtY(y, 0)
		}		
	}
})

// -------------------------------------------------

BlackBlock = Group.clone().newSlots({
	protoType: "BlackBlock",
	current: 4,
	max: 4,
	goingDown: true,
	isDone: false,
	isTop: false,
	rebirthCountdown: 0,
	doneRendered: false,
}).setSlots({
	init: function()
	{
	},
	
	reset: function()
	{
		this.setMax(Math.floor(3 + Math.random()*3))
		this._isTop = !this._isTop
		
		if (this.isTop())
		{
			this._current = 0
			this._goingDown = false
		}
		else
		{
			this._current = this.max()
			this._goingDown = true
		}
		
		this._doneRendered = false
		
		
		this._isDone = false
	},
	
	finish: function()
	{
		this._isDone = true
		this._rebirthCountdown = this._max
		if (!this._isTop)
		{
			this._rebirthCountdown = Math.floor(this._rebirthCountdown/2)
		}
		
	},
	
	update: function()
	{		
		if (!this._isDone)
		{		
			if (this._goingDown)
			{
				this._current --
				
				if (this._current == 0)
				{
					this.finish()
				}
			}
			else
			{
				this._current ++
								
				if (this._current == this._max)
				{
					if (this._isTop)
					{
						this.finish()
					}
					
					this._goingDown = true
				}
			}
		}
		
		if (this._rebirthCountdown)
		{
			this._rebirthCountdown --
			if (this._rebirthCountdown == 0)
			{
				this.reset()
			}
		}
	}
})	
	
WaveGroup = Group.clone().newSlots({
	protoType: "WaveGroup",
	spacing: 500,
	itemXScale: 1,
	itemYScale: 1,
	max: 5,
	orientation: "x",
	key: "1",
	currentX: 0,
	cachedStrips: null,
	maxStripCount: 25,
	block: BlackBlock.clone(),	
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		this.setCachedStrips([])
		this.addStrip()
		this._object.position.y -= 3.5
		
		for (var x = 0; x < this.maxStripCount(); x++)
		{
			this.addStrip()
		}
		
		Visual.camera().position.x += this.maxStripCount() - 8
		this.block().reset()
	},

	removeStrip: function()
	{
		var item = this.items().first()
		
		if (item && this.items().length > this.maxStripCount())
		{
			//this.cachedStrips().push(item)
			this.removeItem(item)
		}
	},
	
	newStrip: function()
	{
		var strip = null //this.cachedStrips().pop()
		if (strip == null)
		{
			strip = WaveStrip.clone()
		}
		return strip
	},
	
	addStrip: function()
	{
		var xmax = 1
		
		this._currentX ++
		var strip = this.newStrip()
		strip.setX(this._currentX)
		
		this.removeStrip()
		this.addItem(strip)
		return strip
	},
		
	update: function()
	{
		Group.update.apply(this)
		this._t ++
		
		var rate = 10
		
		Visual.camera().position.x += 1/rate;
		
		if (this._t % rate == 0)
		{
			var strip = this.addStrip()
			this._block.update()
			strip.setWaveGroup(this)
		}
	}
})

Groups.add(WaveGroup) // for 0 key
Groups.add(WaveGroup)
