
function Environment(parent) {
    this.vars = Object.create(parent ? parent.vars : null);
    this.parent = parent;
}
Environment.prototype = {
    extend: function() {
        return new Environment(this);
    },
    lookup: function(name) {
        var scope = this;
        while (scope) {
            if (Object.prototype.hasOwnProperty.call(scope.vars, name)){
                console.log(scope,name)
                return scope;
            }else if(Object.prototype.hasOwnProperty.call(scope.vars, "libs")){
                console.log("lookup", scope, name, scope.vars.libs());
                if(" " +name+ " " in scope.vars.libs()){return scope}
                else{
                    for(var key in scope.vars.libs()){
                        console.log("lookup 2", scope, name, scope.vars.libs()[key][0]);
                        if(" " +name+ " " in scope.vars.libs()[key][0] ){
                            return scope;
                        }
                    }
                }
            }
            scope = scope.parent;
        }
    },
    get: function(name) {
        //console.log(name, this);
        if (name in this.vars)
            return this.vars[name];
        throw new Error("Undefined variable: " + name);
    },
    set: function(name, value) {
        var scope = this.lookup(name);
        //console.log("setting",scope, value, name);
        if (!scope && this.parent)
            throw new Error("Undefined variable " + name);
       
        return (scope || this).vars[name] = value;
    },
    def: function(name, value) {
        return this.vars[name] = value;
    }
};

export default Environment;