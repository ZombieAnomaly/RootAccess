var parentClass;

function Evaluate(exp, env, prefix="") {
    switch (exp.type) {
        case "num":
        case "str":
        case "bool":
          return exp.value;

        case "var":
            return env.get(exp.value); 
        break;

        case "lib":
            if(env.parent.vars.libs()[" "+exp.value+" "]){
                //console.log("lib: ", exp, env.parent.vars.libs(), env.parent.vars.libs()[" "+exp.value+" "]);
                return env.set(exp.value, env.parent.vars.libs()[" "+exp.value+" "]);
            }else{
                //console.log("child lib: ", exp, env.parent.vars.libs(), env.parent.vars.libs()[exp.parent.value]);
                return exp;
                //return env.set(exp.value, env.parent.vars.libs()[exp.parent]);
            } 
        break;

        case "assign":
            if (exp.left.type != "var")
                throw new Error("Cannot assign to " + JSON.stringify(exp.left));
            console.log("assigning", exp.left, Evaluate(exp.right, env))
            env.def(prefix+exp.left.value,Evaluate(exp.right, env));
            console.log(env);
            return env.set(prefix+""+exp.left.value, Evaluate(exp.right, env));  
        break;

        case "binary":
            //console.log(exp.left,exp.right);
            var test = apply_op(exp.operator,
                Evaluate(exp.left, env),
                Evaluate(exp.right, env));
            //console.log(test);
            return test;
        break;

        case "func":
            return make_func(env, exp);    
        break;
            
        case "if":
            var cond = Evaluate(exp.cond, env);
            if (cond !== false) return Evaluate(exp.then, env);
            return exp.else ? Evaluate(exp.else, env) : false;
        break;

        case "prog":
            var val = false;
            exp.prog.forEach(function(exp){ val = Evaluate(exp, env, prefix) });
            return val;
        break;

        case "call":
            console.log("calling func!", exp);
            var func = Evaluate(exp.func, env);
            return func.apply(null, exp.args.map(function(arg){
                return Evaluate(arg, env);
            }));
        break;

        case "class":
            return make_class(env,exp);
        break;

        default:
            throw new Error("I don't know how to Evaluate " + exp.type);
        
    }

}

function apply_op(op, a, b) {
    function num(x) {
        if (typeof x != "number")
            throw new Error("Expected number but got " + x);
        return x;
    }
    function div(x) {
        if (num(x) == 0)
            throw new Error("Divide by zero");
        return x;
    }
    switch (op) {
      case "+"  : return num(a) + num(b);
      case "-"  : return num(a) - num(b);
      case "*"  : return num(a) * num(b);
      case "/"  : return num(a) / div(b);
      case "%"  : return num(a) % div(b);
      case "&&" : return a !== false && b;
      case "||" : return a !== false ? a : b;
      case "<"  : return num(a) < num(b);
      case ">"  : return num(a) > num(b);
      case "<=" : return num(a) <= num(b);
      case ">=" : return num(a) >= num(b);
      case "==" : return a === b;
      case "!=" : return a !== b;
      case "." : 
       // console.log(a,b );
        if(a instanceof Array){
            //console.log(a[0][" "+b.value+" "], b.value)
            return a[0][" "+b.value+" "]; 
        }
        return a[b.value]; 
      break;
    }
    throw new Error("Can't apply operator " + op);
}

function make_class(env,exp){
    parentClass = exp.body.value;
    console.log("making class" , exp);
    function _class(){
        console.log("_class");
       var name = exp.body.value;
       var scope = env.extend();
       scope.def(name, 0 < arguments.length ? arguments[0] : false);
       return Evaluate(exp.body, scope);
    }
    return _class();
}

function make_func(env, exp) {
    console.log("making func", exp);
    exp.parent = parentClass;
    function func() {
        var names = exp.vars;
        var scope = env.extend();
        for (var i = 0; i < names.length; ++i)
            scope.def(names[i], i < arguments.length ? arguments[i] : false);
        //console.log(exp.body);
        if(exp.global)
            return Evaluate(exp.body, env, exp.parent+"-");
        else
            return Evaluate(exp.body, scope);
    }
    var f = func();
    return f;
}

export default Evaluate;