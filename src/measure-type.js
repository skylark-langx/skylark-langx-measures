define([
	"skylark-langx-objects",
	"./measures"
],function(objects,measures) {

	var MeasureType = ["auto","inherit","initial","mid","min","max","none","percent","unit"];
	
	objects.mixin(MeasureType,{
		"auto" : 0,
		"inherit" : 1,
		"initial" : 2,
		"mid" : 3,
		"min" : 4,
		"max" : 5,
		"none" : 6,
		"percent" : 7,
		"unit" : 8
	});

	return measures.MeasureType = MeasureType;

});
