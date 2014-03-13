

TargetPoint = Proto.clone().newSlots({
	position: new THREE.Vector3( 0, 0, 1 ),
	yForce: 0,
	maxYForce:.1,
	yVelocity: 0,
	yDirection: 0,
	t: 0
}).setSlots({
	camera: function()
	{
		return Visual.camera()
	},
	
	follow: function()
	{
		var camera = this.camera()
		
		camera.position.x -= (camera.position.x - this._position.x)*.01
		camera.position.z -= (camera.position.z - this._position.z)*.01

	 	var look = new THREE.Vector3(this._position.x, 0, this._position.z)
		camera.lookAt(look)
		//camera.lookAt(this._position)
		camera.rotateOnAxis( new THREE.Vector3( 0, 0, 1 ), -Math.PI/2);
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
	},
		
	/*
	applyYForce: function(f)
	{
		f = f *.01
		//console.log("applyYForce ", f)
		if (this._yForce < this._maxYForce)
		{
			this._yForce += f
		}
	},
	*/
	
	move: function()
	{
		var y = this.camera().position.y
		if (Math.abs(y) > 12)
		{
			this.camera().position.y = 12*y/Math.abs(y)
			this._yDirection = this._yDirection*-1
		}
		
		this.camera().position.y += this._yDirection*.3;
/*
		this._yVelocity += this._yForce
		this.camera().position.y += this._yVelocity;
		this._yVelocity *= .8
		this._yForce *= .8
		*/
	},
	
	step: function()
	{
		this._t ++
		this.move()
		this.follow()
	}
})