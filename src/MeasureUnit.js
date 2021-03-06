define([
	"skylark-langx-objects",
	"./measures"
],function(objects,measures) {

	var MeasureUnit = ["em", "ex", "px", "pt", "pc", "cm", "mm", "in"];

	objects.mixin(MeasureUnit,{
		"em" : 0, 
		"ex" : 1, 
		"px" : 2, 
		"pt" : 3, 
		"pc" : 4, 
		"cm" : 5, 
		"mm" : 6, 
		"in" : 7
	});

	return measures.MeasureUnit = MeasureUnit;

});
