

TargetPoint = Proto.clone().newSlots({
	position: null,
	yForce: 0,
	maxYForce:.1,
	yVelocity: 0,
	yDirection: 0,
	//t: 0,
	trail: null,
	minDist: 10,
}).setSlots({
	init: function()
	{
		this.setPosition(new THREE.Vector3( 0, 0, 1 ))
		this.setTrail(Trail.clone())
		this.trail().open()
	},	
		
	camera: function()
	{
		return Visual.camera()
	},
	
	follow: function()
	{
		var camera = this.camera()
		var f = .01
		camera.position.x -= (camera.position.x - this._position.x)*f
		camera.position.y -= (camera.position.y - this._position.y)*f
		camera.position.z -= (camera.position.z - this._position.z)*f
		
		var minZ = 6
		if (camera.position.z < minZ)
		{
			camera.position.z = minZ
		}

	 	var look = new THREE.Vector3(this._position.x, 0, this._position.z)
		camera.lookAt(look)
		camera.lookAt(this._position)
		camera.rotateOnAxis( new THREE.Vector3( 0, 0, 1 ), -Math.PI/2);
		
		var end = this._position.clone()
		this.trail().setEndPoint(end)
	},
	
	step: function()
	{
		//this.move()
		this.follow()
	}
})