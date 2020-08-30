/**
 * skylark-langx-measures - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-langx-measures/measures',[
    "skylark-langx-ns"
], function(skylark) {
	
	var measures =  {


	};


	return skylark.attach("langx.measures",measures);
});
define('skylark-langx-measures/MeasureType',[
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

define('skylark-langx-measures/MeasureUnit',[
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

define('skylark-langx-measures/MeasureValue',[
	"skylark-langx-objects",
	"skylark-langx-klass",
	"./measures",
	"./MeasureType",
	"./MeasureUnit"
],function(objects,klass,measures,MeasureType,MeasureUnit) {

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

	MeasureValue.auto = new MeasureValue(MeasureType.auto);
	MeasureValue.mid = new MeasureValue(MeasureType.mid);
	MeasureValue.min = new MeasureValue(MeasureType.min);
	MeasureValue.max = new MeasureValue(MeasureType.max);

	return measures.MeasureValue = MeasureValue;
	
});	

define('skylark-langx-measures/main',[
    "./measures",
    "./MeasureType",
    "./MeasureUnit",
    "./MeasureValue"
], function(measures) {

	return measures;
});
define('skylark-langx-measures', ['skylark-langx-measures/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-langx-measures.js.map
