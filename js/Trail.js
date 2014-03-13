
Trail = Group.clone().newSlots({
	segments: null,
	maxSegments: 10,
}).setSlots({
	init: function()
	{
		Thing.init.apply(this)
		this._segments = []
	},	
	
	currentSegment:function()
	{
		return this.segments().last()
	},
	
	addSegment: function()
	{
		var current = this.currentSegment()
		var seg = TrailSegment.clone()
		
		if (current)
		{
			seg.setStartPoint(current.endPoint().clone())
			seg.setEndPoint(current.endPoint().clone())
		}
		
		this.segments().push(seg)
		this.addItem(seg)
		
		/*
		if (this.segments().length > this.maxSegments())
		{
			var dead = this.segments().removeFirst()
			this.removeItem(dead)
		}
		*/
	},
	
	setEndPoint: function(end)
	{
		var current = this.currentSegment()
		if (current)
		{
			current.setEndPoint(end.clone())
			current.update()
		}
	},

})