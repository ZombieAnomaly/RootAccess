var FALSE = { type: "bool", value: false };
function Parser(input) {
    var PRECEDENCE = {
        "=": 1,
        "||": 2,
        "&&": 3,
        ".":4,
        "<": 7, ">": 7, "<=": 7, ">=": 7, "==": 7, "!=": 7,
        "+": 10, "-": 10,
        "*": 20, "/": 20, "%": 20,
    };
    var parentClass;

    return parse_toplevel();

    function is_punc(ch) {
        var tok = input.peek();
        return tok && tok.type == "punc" && (!ch || tok.value == ch) && tok;
    }
    function is_kw(kw) {
        var tok = input.peek();
        return tok && tok.type == "kw" && (!kw || tok.value == kw) && tok;
    }
    function is_op(op) {
        var tok = input.peek();
        return tok && tok.type == "op" && (!op || tok.value == op) && tok;
    }
    function skip_punc(ch) {
        if (is_punc(ch)) {input.next();}
        else input.croak("Expecting punctuation: \"" + ch + "\"");
    }
    function skip_punc_Method(ch) {
        if (ch == ":"){input.next();}
        else input.croak("Expecting punctuation non: \"" + ch + "\"");
    }
    function skip_kw(kw) {
        if (is_kw(kw)) input.next();
        else input.croak("Expecting keyword: \"" + kw + "\"");
    }
    function skip_op(op) {
        if (is_op(op)) input.next();
        else input.croak("Expecting operator: \"" + op + "\"");
    }
    function unexpected() {
        if(input.peek() == null){return};
        input.croak("Unexpected token: " + JSON.stringify(input.peek()));
    }

    function maybe_binary(left, my_prec) {
        var tok = is_op();
        if (tok) {
            var his_prec = PRECEDENCE[tok.value];
            if (his_prec > my_prec) {
                input.next();
                return maybe_binary({
                    type     : tok.value == "=" ? "assign" : "binary",
                    operator : tok.value,
                    left     : left,
                    right    : maybe_binary(parse_atom(), his_prec)
                }, my_prec);
            }
        }
        return left;
    }
    function delimited(start, stop, separator, parser) {
        var a = [], first = true;
        skip_punc(start);
        while (!input.eof()) {
            if (is_punc(stop)) break;
            if (first) first = false; else skip_punc(separator);
            if (is_punc(stop)) break;
            a.push(parser());
        }
        skip_punc(stop);
        return a;
    }
    function delimitedBalanced(start, stop, parser) {
        var a = [], first = true;
        var balance = 0;
        skip_punc(start);
        balance++;
        while (!input.eof()) {
            if (is_punc(stop)){
                balance--;
            }else if(is_punc(start)){
                balance++;
            }
            if(balance == 0){break;}
            a.push(parser());
        }
        skip_punc(stop);
        return a;
    }
    function parse_call(func) {
        return {
            type: "call",
            func: func,
            args: delimited("(", ")", ",", parse_expression),
        };
    }
    function parse_varname() {
        var name = input.next();
        if (name.type != "var") input.croak("Expecting variable name");
        return name.value;
    }
    function parse_if() {
        skip_kw("if");
        var cond = parse_expression();
        //console.log(cond);
        if (!is_punc("{")) skip_kw("then");
        //console.log(input.peek());
        var then = parse_expression();
        var ret = {
            type: "if",
            cond: cond,
            then: then,
        };
        if (is_kw("else")) {
            input.next();
            ret.else = parse_expression();
        }
        return ret;
    }
    function parse_func() {
        //console.log(input.peek(), input.keywords().indexOf(" " + input.peek().value+ " "))
        var global;
        if( input.keywords().indexOf(" " + input.peek().value+ " ") != -1){global=true}else{global=false};
        //console.log(global);
        return {
            type: "func",
            name: input.peek().type == "var" ? input.next().value : null,
            global: global,
            vars: delimited("(", ")", ",", parse_varname),
            body: parse_expression()
        };
    }
    function parse_class() {
        return {
            type: "class",
            name: parse_expression(),
            body: parse_expression()
        };
    }
    function parse_bool() {
        return {
            type  : "bool",
            value : input.next().value == "true"
        };
    }
    function maybe_call(expr) {
        expr = expr();
        return is_punc("(") ? parse_call(expr) : expr;
    }
    function parse_atom() {
        return maybe_call(function(){
            //console.log(input.peek())
            if (is_punc("(")) {
                input.next();
                var exp = parse_expression();
                skip_punc(")");
                return exp;
            }
            if(is_punc(";")) {input.next(); if(input.peek()){return parse_expression()} return};
            if (is_punc("{")) return parse_prog_if();
            if (is_punc("::")) return parse_prog_class();
            if (is_punc(":")) return parse_prog();
            if (is_kw("if")) return parse_if();
            if (is_kw("true") || is_kw("false")) return parse_bool();
            if (is_kw("class")) {
                input.next();
                return parse_class();
            }
            if (is_kw("func")) {
                input.next();
                return parse_func();
            }
            var tok = input.next();
            //console.log(tok);
            if (tok.type == "var" || tok.type == "lib" || tok.type == "num" || tok.type == "str")
                return tok;
            unexpected();
        });
    }
    function parse_toplevel() {
        var prog = [];
        while (!input.eof()) {
            var pe = parse_expression();   
            if(!pe){console.log(pe);break;}
            prog.push(pe);
        }
        return { type: "prog", prog: prog };
    }
    function parse_prog() {
        var prog = delimited(":", ":end", ";", parse_expression);
        if (prog.length == 0) return FALSE;
        if (prog.length == 1) return prog[0];
        return { type: "prog", prog: prog };
    }
    function parse_prog_if() {
        var prog = delimited("{", "}", ";", parse_expression);
        if (prog.length == 0) return FALSE;
        if (prog.length == 1) return prog[0];
        return { type: "prog", prog: prog };
    }
    function parse_prog_class() {
        //console.log('prog class')
        var prog = delimitedBalanced("::", "::end", parse_expression);
        if (prog.length == 0) return FALSE;
        if (prog.length == 1) return prog[0];
        return { type: "prog", prog: prog };
    }
    function parse_expression() {
        return maybe_call(function(){
            return maybe_binary(parse_atom(), 0);
        });
    }
}
export default Parser;