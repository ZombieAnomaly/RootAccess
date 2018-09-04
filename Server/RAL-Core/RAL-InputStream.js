function InputStream(input) {
    var pos = 0, line = 1, col = 0;
    return {
        next  : next,
        peek  : peek,
        peekPrev: peekPrev,
        peekNext: peekNext,
        eof   : eof,
        croak : croak,
        info: info,
    };
    function info(){
        var str = "line: " + line + " | pos: " + pos + " | col: " + col;
        return str;
    }
    function next() {
        var ch = input.charAt(pos++);
        if (ch == "\n") line++, col = 0; else col++;
        return ch;
    }
    function peek() {
        return input.charAt(pos);
    }
    function peekNext(){
        var p = pos;
        return input.charAt(p++)
    }
    function peekPrev(){
        var p = pos;
        return input.charAt(p--)
    }
    function eof() {
        return peek() == "";
    }
    function croak(msg) {
        throw new Error(msg + " (" + line + ":" + col + ")");
    }
}

export default InputStream;