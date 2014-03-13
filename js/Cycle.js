
Cycle = Proto.clone().newSlots({
	position: new THREE.Vector3( 0, 0, 1 ),
	yDirection: 0,
	trail: null,
}).setSlots({
	init: function()
	{
		this.setTrail(Trail.clone())
		this.trail().open()
	},
	
	move: function()
	{
		var y = this.position().y
		
		if (Math.abs(y) > 12)
		{
			this.turn()
		}

		this.position().y += this._yDirection * .17;
		
		this.trail().setEndPoint(this.position().clone())
	},

	turn: function()
	{
		if (this._yDirection == 0)
		{
			this._yDirection = 1
		}
		else
		{
			this._yDirection *= -1
		}
		
		this.trail().addSegment()
	},
		
	step: function()
	{
		this.move()
		Visual.targetPoint().setPosition(this.position())
	}
})