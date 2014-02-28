
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
		var max = this._max
		for (var x = -max; x < max; x ++)
		{
			for (var y = -max; y < max; y ++)
			{
				//if (Math.random() < .6)
				{
					var s = Square.clone()
					s._object.scale.x = .1
					s._object.scale.y = .1
					s._object.position.x = .2*x
					s._object.position.y = .2*y
					s.setGroupX(x)
					s.setGroupY(y)
					//s.setMover("x", XInterleveMover.clone())
					//s.setMover("r", RandXMover.clone())
					this.addItem(s)
				}
			}
		}
	}
})

Groups.add(SquaresGroup) // for 0 key
Groups.add(SquaresGroup)
