function Lexer(input) {
    var current = null;
    var keywords = " if then else true false class func ";
    var keywordMethods = " constructor "

    return {
        next  : next,
        peek  : peek,
        eof   : eof,
        croak : input.croak,
        info: info,
        keywords: getKeywordMethods,
    };

    function getKeywordMethods(){
        return keywordMethods;
    }
    function info(){
        var str = input.info();
        return str;
    }
    function is_keyword(x) {
        return keywords.indexOf(" " + x + " ") >= 0;
    }
    function is_digit(ch) {
        return /[0-9]/i.test(ch);
    }
    function is_id_start(ch) {
        return /[a-z-]/i.test(ch);
    }
    function is_id(ch) {
        return is_id_start(ch);
    }
    function is_op_char(ch) {
        return "+-*/%=&|<>!.".indexOf(ch) >= 0;
    }
    function is_punc(ch) {
        return ",;(){}[]".indexOf(ch) >= 0;
    }
    function is_puncMethod(ch) {
        return ":".indexOf(ch) >= 0;
    }
    function is_puncClass(ch) {
        return "::" === ch+input.peekNext();
    }
    function is_whitespace(ch) {
        return " \t\n".indexOf(ch) >= 0;
    }
    function read_while(predicate) {
        var str = "";
        while (!input.eof() && predicate(input.peek()))
            str += input.next();
        return str;
    }
    function read_number() {
        var has_dot = false;
        var number = read_while(function(ch){
            if (ch == ".") {
                if (has_dot) return false;
                has_dot = true;
                return true;
            }
            return is_digit(ch);
        });
        return { type: "num", value: parseFloat(number) };
    }
    function read_ident() {
        var id = read_while(is_id);
        var type = "";
        var parent = "";

        //if word is keyword return early
        if(is_keyword(id)){
            type="kw"; 
            return {
                parent:  parent,
                type  : type,
                value : id
            };
        }
        
        type = "var";

        return {
            parent:  parent,
            type  : type,
            value : id
        };
    }
    function read_escaped(end) {
        var escaped = false, str = "";
        input.next();
        while (!input.eof()) {
            var ch = input.next();
            if (escaped) {
                str += ch;
                escaped = false;
            } else if (ch == "\\") {
                escaped = true;
            } else if (ch == end) {
                break;
            } else {
                str += ch;
            }
        }
        return str;
    }
    function read_string() {
        return { type: "str", value: read_escaped('"') };
    }
    function skip_comment() {
        read_while(function(ch){ return ch != "\n" });
        input.next();
    }
    function read_next() {
        read_while(is_whitespace);
        if (input.eof()) return null;
        var ch = input.peek();
        if (ch == "#") {
            skip_comment();
            return read_next();
        }
        if (ch == '"') return read_string();
        if (is_digit(ch)) return read_number();
        if (is_id_start(ch)) return read_ident();
        if (is_puncClass(ch) || is_puncMethod()){
            var punc = read_while(function(ch){return ch != " "});
            return {
                type  : "punc",
                value : punc.trim()
            };
        } 
        if (is_punc(ch)) return {
            type  : "punc",
            value : input.next()
        };

        if (is_op_char(ch)) return {
            type  : "op",
            value : read_while(is_op_char)
        };

        input.croak("Can't handle character: " + ch);
    }
    function peek() {
        return current || (current = read_next());
    }
    function next() {
        var tok = current;
        current = null;
        return tok || read_next();
    }
    function eof() {
        return peek() == null;
    }
}

export default Lexer