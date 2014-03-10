
Prism = Thing.clone().newSlots({
	protoType: "Triangle"
}).setSlots({
	init: function()
	{
		Thing.init.apply(this)
		this.setup()
	},
	
	setup: function()
	{		
		// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
		var geometry = new THREE.CylinderGeometry( .58, .58, .001, 3, 3 );

		var material = new THREE.MeshLambertMaterial( 
			{
				color: new THREE.Color().setRGB(0,0,0), 
				wireframe: false, 
				wireframeLinewidth: 1,
				opacity: 1,
				transparent: true
			} );

	    this._object = new THREE.Mesh(geometry, material);
	    this._object.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI/2 ) );
	    this._object.geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( Math.PI/2 ) );
		this._object.geometry.verticesNeedUpdate = true;
	},

/*
	update: function() 
	{	
		Thing.update.apply(this)		
	}
	*/
})

