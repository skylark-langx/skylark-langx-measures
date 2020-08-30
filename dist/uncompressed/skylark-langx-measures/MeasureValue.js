define([
	"skylark-langx-types",
	"skylark-langx-objects",
	"skylark-langx-klass",
	"./measures",
	"./MeasureType",
	"./MeasureUnit"
],function(types,objects,klass,measures,MeasureType,MeasureUnit) {

	var MeasureValue = klass({
		"klassName"	:	"MeasureValue",

		"mtype" : {
			get : function(){
				return this._.mtype;
			},
			set : function(t) {
				var _ = this._;
				_.mtype = t;
				switch (t) {
					case MeasureType.auto :
						_.unit = null;
						_.value = null;
						break;
					case MeasureType.percent :
						_.unit = null;
						break;
					default :
						break;
					
				}
			}
		},

		"unit" : {
			get : function(){
				return this._.unit;
			},

			set : function(u) {
				var _ = this._;
					t = _.mtype;
				switch (t) {
					case MeasureType.unit :
						_.unit = u;
						break;
					default :
						break;
					
				}
			}
		},

		"value" : {
			get : function(){
				return this._.value;
			},
			set : function(v) {
				var _ = this._;
					t = _.mtype;
				switch (t) {
					case MeasureType.unit :
					case MeasureType.percent :
						_.value = v;
						break;
					default :
						break;
					
				}
			}
		},

		"clone"	: function(){
			var _ = this._;
			return new MeasureValue(_.mtype,_.unit,_.value);
		
		},
		
		"notEqual"	:	function(/*Measure*/m) {
			return !m || m.mtype != this.mtype || m.unit != this.unit || m.value != this.value;
		},
		
		"equal"	:	function(/*Measure*/m){
			return  !this.notEqual(m);
		},

		"toString" : function(){
			switch (this.mtype) {
				case MeasureType.auto :
				case MeasureType.min :
				case MeasureType.max :
				case MeasureType.mid :
					return this.mtype.toString();
				case MeasureType.unit :
					return this.value + MeasureUnit[this.unit];
				case MeasureType.percent :
					return this.value + "%";
					break;
				
			}
		},	
		
		"_construct"	: function(type,value,unit){
			var props = {};
			if (type != undefined) {
				props.mtype = type;
			}
			if (value != undefined) {
				props.value = value;
			}
			if (unit != undefined) {
				props.unit = unit;
			}
			this._ = props;
		}
	});


	MeasureValue.fromNumber = function(n) {
        return new MeasureValue(MeasureType.unit,n,MeasureUnit.px);
	};
	
	MeasureValue.fromString = function(s) {
		if (s=="auto"){
			return MeasureValue.auto;
		}

		if (s=="min"){
			return MeasureValue.min;
		}

		if (s=="max"){
			return MeasureValue.max;
		}

		if (s=="mid"){
			return MeasureValue.mid;
		}

		var units = MeasureUnit.map(function(item){
				//return item.getText();
				return item;
			}).concat("%"),
			type,
			value,
			unit;
        for (var i = 0; i < units.length; i++) {
            if (s.indexOf(units[i]) != -1) {
                value = parseInt(s.substring(0, s.length - units[i].length),10);
                if (units[i] == "%") {
                	type = MeasureType.percent;
                } else {
                	type = MeasureType.unit;
                	//unit = MeasureUnit.fromString(units[i]);
                	unit = MeasureUnit[units[i]];
                }
                break;
            }
        }
        return new MeasureValue(type,value,unit);
	};

	MeasureValue.fromPlain = function(o) {
		return new MeasureValue(o.mtype,o.value,o.unit);
	};

	MeasureValue.fromArray = function(a) {
		return new MeasureValue(a[0],a.length>1?a[1]:"undefined",a.length>1?a[2]:undefined);
	};

	MeasureValue.parse = function(value) {
		if (value instanceof MeasureValue) {
			return value;
		} else if (types.isString(value)) {
            value = MeasureValue.fromString(value);
        } else if (types.isArray(value)) {
            value = MeasureValue.fromArray(value);
        } else if (types.isPlainObject(value)) {
            value = MeasureValue.fromPlain(value);
        } else if (types.isNumber(value)) {
            value = MeasureValue.fromNumber(value);
        }
     };

	MeasureValue.auto = new MeasureValue(MeasureType.auto);
	MeasureValue.mid = new MeasureValue(MeasureType.mid);
	MeasureValue.min = new MeasureValue(MeasureType.min);
	MeasureValue.max = new MeasureValue(MeasureType.max);

	return measures.MeasureValue = MeasureValue;
	
});	
