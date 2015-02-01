
Cycle = Proto.clone().newSlots({
	position: new THREE.Vector3( 0, 0, .01 ),
	yDirection: 0,
	trail: null,
	maxY: 8,
	minY: -8,
	boundY: 12,
	topBlockXs: [],
	bottomBlockXs: [],
}).setSlots({
	init: function()
	{
		this.setTrail(Trail.clone())
		this.trail().open()
		this.trail().addSegment()
	},
	
	x: function()
	{
		return this.position().x
	},
	
	_blockOffset: 24,
	
	willBeginTopBlock: function()
	{
		this._topBlockXs.push(this.x() + this._blockOffset - 1)
	},
	
	willBeginBottomBlock : function()
	{
		this._bottomBlockXs.push(this.x() + this._blockOffset - 5)
	},
	
	handleMaxes: function()
	{
		if (this._topBlockXs.length && this.x() > this._topBlockXs[0])
		{
			this._topBlockXs.shift()
		}
		
		if (this._bottomBlockXs.length && this.x() > this._bottomBlockXs[0])
		{
			this._bottomBlockXs.shift()
		}
	},
	
	maxY: function()
	{
		if (this._topBlockXs.length)
		{
			var x = this._topBlockXs[0]
			return (x - this.x()) 
		}
		
		return 12
	},
	
	minY: function()
	{
		if (this._bottomBlockXs.length)
		{
			var x = this._bottomBlockXs[0]
			return -(x - this.x()) 
		}
		
		return -12
	},
	
	move: function()
	{
		var y = this.position().y
		
		this.handleMaxes()

		// y bounds enforcement
		
		var m = 4
		if (y > m && this._yDirection > 0)

		if (y < -m && this._yDirection < 0)
		{
			this.turn()
		}
		
		// auto turns
		
		if (y > this.maxY() && this._yDirection > 0)
		{
			this.turn()
		}
		if (y < this.minY() && this._yDirection < 0)
		{
			this.turn()
		}
			
		this.position().y += this._yDirection * .17 * 2.64
		
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