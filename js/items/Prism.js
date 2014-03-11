
Prism = Thing.clone().newSlots({
	protoType: "Triangle",
	defaultHeight: .001,
	objectCache: []
}).setSlots({
	init: function()
	{
		Thing.init.apply(this)
		this.setup()
	},
	
	setup: function()
	{		
		// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
		var geometry = new THREE.CylinderGeometry( .58, .58, this.defaultHeight(), 3, 3 );

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
	
	reset: function()
	{
		this.object().scale.x = 1
		this.object().scale.y = 1
		this.object().scale.z = 1
		this.setupColor()
	},
	
	setupColor: function()
	{
		var c = Palettes.current().foregroundColors();
		var cc = c[Math.floor(Math.random()*c.length)];
		var chsv = Colors.hex2hsv(cc);
		var crgb = Colors.hex2rgb(cc);

		var crand = Math.random()
		crgb.R = crgb.R + Math.floor(100*crand)
		crgb.R = (crgb.R>=255 ? 255 : crgb.R)
		crgb.G = crgb.G + Math.floor(100*crand)
		crgb.G = (crgb.G>=255 ? 255 : crgb.G)
		crgb.B = crgb.B + Math.floor(100*crand)
		crgb.B = (crgb.B>=255 ? 255 : crgb.B)
		// crgb.G += 50
		// crgb.G = crgb.G - crgb.G%255
		// crgb.B += 50
		// crgb.B = crgb.B - crgb.B%255
		
		cc = Colors.rgb2hex(crgb.R, crgb.G, crgb.B);

		//console.log(cc)
		this.setColor(new THREE.Color(cc))
	},

/*
	update: function() 
	{	
		Thing.update.apply(this)		
	}
	*/
})

