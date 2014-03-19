

TargetPoint = Proto.clone().newSlots({
	position: null,
	yForce: 0,
	maxYForce:.1,
	yVelocity: 0,
	yDirection: 0,
	t: 0,
	trail: null,
	minDist: 10,
	followMethods: ["follow", "followTop"],
	followMethodNumber: 0,
	cameraRotCurrent: 0,
	cameraRotTarget: 0,
	minZCurrent: 10,
	minZTarget: 10,
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
	
	updateCameraRot: function()
	{
		var camera = this.camera()
		camera.lookAt(this._position)

		this._cameraRotCurrent -= (this._cameraRotCurrent - this._cameraRotTarget)*.01
		camera.rotateOnAxis( new THREE.Vector3( 0, 0, 1 ), this._cameraRotCurrent);
		
	 	//var look = new THREE.Vector3(this._position.x, 0, this._position.z)
		//camera.lookAt(look)
		
		this._minZCurrent -= (this._minZCurrent - this._minZTarget)*0.01 
		
		if (camera.position.z < this._minZCurrent )
		{
			camera.position.z = this._minZCurrent 
		}
	},

	followTop: function()
	{
		/*
		var minZ = 10
		if (this._position.z < minZ)
		{
			this._position.z = minZ
		}
		*/
		this._minZTarget = 15
		
		var camera = this.camera()
		camera.position.x -= (camera.position.x - this._position.x)*.05
		camera.position.z -= (camera.position.z - this._position.z)*0.05 


		//this._cameraRotTarget = -Math.PI/2
		this._cameraRotTarget = 0
		this.updateCameraRot()
		
		var end = this._position.clone()
		this.trail().setEndPoint(end)
	},
		
	follow: function()
	{
		/*
		var minZ = 6
		if (this._position.z < minZ)
		{
			this._position.z = minZ
		}
		*/
		this._minZTarget = 6
		
		var camera = this.camera()
		var f = .01
		camera.position.x -= (camera.position.x - this._position.x)*f
		camera.position.y -= (camera.position.y - this._position.y)*f
		camera.position.z -= (camera.position.z - this._position.z)*f 

/*
		this._minZCurrent -= (this._minZCurrent - this._minZTarget)*0.05 
		var minZ = 6
		if (camera.position.z < minZ)
		{
			camera.position.z = minZ
		}
		*/

		//camera.lookAt(this._position)
		//camera.rotateOnAxis( new THREE.Vector3( 0, 0, 1 ), (Math.PI)*Math.sin(this._t/150)*Math.sin(3 + this._t/150));
		
		this._cameraRotTarget = (Math.PI)*Math.sin(this._t/150)*Math.sin(3 + this._t/150)
		this.updateCameraRot()
		
		var end = this._position.clone()
		this.trail().setEndPoint(end)
	},
	
	step: function()
	{
		this._t ++
		this[this.followMethodName()].apply(this)
	},
	
	followMethodName: function()
	{
		return this.followMethods()[this.followMethodNumber()]
	},
	
	nextFollowStyle: function()
	{
		this._followMethodNumber = (this._followMethodNumber + 1) % this.followMethods().length		
		console.log("methodName = ", this.followMethodName())
	}
})