import InputStream from './RAL-InputStream';
import Lexer from './RAL-Lexer';
import Parser from './RAL-Parser';
import make_js from './RAL-CompilerJS'

class Thread{
    constructor(name){
        this.name = name;
    }
    Inject(app){
        //perform http request to server to inject app
        console.log("Injecting ", app, "into " + this.name);
    }
}
class CPU{
    constructor(){
    }

    Threads(str){
        //perform http request to get vpc thread
        console.log("Make query looking up thread " + str);
        return new Thread(str);
    }
    Inject(app){
        console.log("Inject app into"+app.constructor.name);
    }
}

class RootAccessVM {

    constructor(){
        this.connection;
        this.CPU = new CPU();
    }

    Compile(input){
        this.input = input;
        this.InputStream = InputStream(input);
        this.Lexer = Lexer(this.InputStream);
        this.ast = Parser(this.Lexer);
        console.log(this.ast);
        this.code = make_js(this.ast);
        console.log(this.code);
        var RootAccess = this;
        eval(this.code);
    }   
}

function print(text){
    console.log(text);
}

export default RootAccessVM;