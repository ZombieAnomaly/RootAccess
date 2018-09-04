var globalVars = [];
var globalClasses = [];

function make_js(exp) {
    return js(exp);

    function js(exp, t) {
        if(!exp){return}
        switch (exp.type) {
          case "FALSE"  : return;
          case "num"    :
          case "str"    :
          case "bool"   : return js_atom   (exp);
          case "var"    : if(t){return js_var(exp, t)} return js_var(exp);
          case "binary" : return js_binary (exp);
          case "assign" : return js_assign (exp, t);
          case "func"   : return js_func   (exp);
          case "class"  : return js_class  (exp);
          case "if"     : return js_if     (exp);
          case "prog"   : return js_prog   (exp, t);
          case "call"   : return js_call   (exp, t);
          default:
            throw new Error("Dunno how to make_js for " + JSON.stringify(exp));
        }
    }

    function js_atom(exp) {
        return JSON.stringify(exp.value);
    }

    function make_var(name, t) {
        //console.log(t, name);
        if(t=="this."){return "this."+name}
        if(t=="func" || t=="var"){return "var "+name}
        return name;
    }
    function js_var(exp, t) {
        return make_var(exp.value, t);
    }
    function js_binary(exp, t) {
        //console.log(exp,t);
        if(t=="var" && exp.operator == "=")
            return "" + js(exp.left, t) + exp.operator + js(exp.right) + ";";
        if(exp.operator == ".")
            return "" + js(exp.left, t) + exp.operator + js(exp.right, "dot") + "";
        return "" + js(exp.left, t) + exp.operator + js(exp.right, t) + "";
    }
    function js_assign(exp, t) {
        //console.log("assign", exp, t);
        return js_binary(exp, t);
    }
    function js_func(exp) {
        var code = "";
        var con = null;
        if (exp.name)
            code += make_var(exp.name);
        if(exp.name == "constructor"){con = "this."}else{con = "func"}
        code += "(" + exp.vars.map(make_var).join(", ") + ") {";
        code += "" + js(exp.body, con) + " }";
        return code;
    }

    function js_class(exp) {
        var code = "class ";
        //console.log(exp);
        if (exp.name.value)
            code += make_var(exp.name.value);
        if(!globalClasses.includes(exp.name.value))
            globalClasses.push(exp.name.value)
        //code += "(" + exp.vars.map(make_var).join(", ") + ") {";
        code += "{" + js(exp.body, "class") + " }";
        return code;
    }

    function js_if(exp) {
        return "("
            +      js(exp.cond) + " !== false"
            +      " ? " + js(exp.then, "if")
            +      " : " + js(exp.else || {type:'FALSE'}, "if")
            +  ")";
    }
    function js_prog(exp, t) {
        //console.log("prog",exp, t);
        if(t == "this.")
            return "" + exp.prog.map((x) => {return js(x, "this.")}).join("; ") + "";
        if(t == "func")
            return "" + exp.prog.map((x) => {return js(x,"func")}).join("; ") + "";
        if(exp.type != "func" && exp.type !="class")
            return "" + exp.prog.map((x) => {return js(x, "var")}).join(" ") + "";
        return "" + exp.prog.map((x) => {return js(x)}).join(" ") + "";
    }
    function js_call(exp, t) {
        //console.log(exp, globalClasses, t);
        if(globalClasses.includes(exp.func.value) && t != "dot")
            return "new " + js(exp.func) + "(" + exp.args.map(js).join(", ") + ")";
        return js(exp.func) + "(" + exp.args.map(js).join(", ") + ")";
    }


}

export default make_js;