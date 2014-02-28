
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

SquaresGroup = Group.clone().newSlots({
	protoType: "SquaresGroup",
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
	
	addSquares: function()
	{
		var xmax = this._max
		var ymax = this._max
		var h = Math.sqrt(3)/2.0
		
		for (var x = -xmax; x < xmax; x ++)
		{
			for (var y = -ymax; y < ymax; y ++)
			{
				var xoffset = (Math.abs(y) % 2)*.5
				var s = Square.clone()
				s._object.scale.x = .99
				s._object.scale.y = .99
				s._object.position.x = x + xoffset
				s._object.position.y = y*h
				
				s.setGroupX(x)
				s.setGroupY(y)
				
				var r = Math.random()
				s.setColor(new THREE.Color().setRGB(r,r,r))
				//s.setMover("x", XInterleveMover.clone())
				//s.setMover("r", RandXMover.clone())
				this.addItem(s)
			}
		}
	}
})

Groups.add(SquaresGroup) // for 0 key
Groups.add(SquaresGroup)
