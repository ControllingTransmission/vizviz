
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
		var geometry = new THREE.CylinderGeometry( 30, 30, 80, 3, 3 );
		
		var material = new THREE.MeshLambertMaterial( 
			{
				color: new THREE.Color().setRGB(0,0,0), 
				wireframe: false, 
				wireframeLinewidth: 1,
				opacity: 1,
				transparent: true
			} );

	    this._object = new THREE.Mesh(geometry, material);
	},

/*
	update: function() 
	{	
		Thing.update.apply(this)		
	}
	*/
})

