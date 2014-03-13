

TrailSegment = Thing.clone().newSlots({
	startPoint: null,
	endPoint: null,
	width: 10
}).setSlots({
	init: function()
	{
		Thing.init.apply(this)
		this._startPoint = new THREE.Vector3( 1000, 0, 0 )
		this._endPoint   = new THREE.Vector3(-1000, 0, 0 )		
		this.setup()
	},
	
	setup: function()
	{		
		var geometry = new THREE.PlaneGeometry( 100000, 100000 );
		var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
		this._object = new THREE.Mesh( geometry, material );
		
	    this._object.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, -1) );
		this._object.geometry.verticesNeedUpdate = true;
		//this.updateGeometry()
	},
		
	updateGeometry: function()
	{
		var w = this._width
		
		// start left
		var p0 = this._object.geometry.vertices[0] 
		p0.x = this._startPoint.x
		p0.y = this._startPoint.y - w/2
		p0.z = .01
		
		// start right
		var p1 = this._object.geometry.vertices[1]
		p1.x = this._startPoint.x
		p1.y = this._startPoint.y + w/2
		p1.z = .01
		
		// end left
		var p2 = this._object.geometry.vertices[2]
		p2.x = this._endPoint.x
		p2.y = this._endPoint.y - w/2
		p2.z = .01
		
		// end right
		var p3 = this._object.geometry.vertices[3]
		p3.x = this._endPoint.x
		p3.y = this._endPoint.y + w/2
		p3.z = .01

		this._object.geometry.verticesNeedUpdate = true;
	},
})

// --------------------------------------------

Trail = Group.clone().newSlots({
	parts: [] 
}).setSlots({
	
	update: function()
	{

	},

})