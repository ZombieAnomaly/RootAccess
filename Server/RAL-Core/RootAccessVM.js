import InputStream from './RAL-InputStream';
import Lexer from './RAL-Lexer';
import Parser from './RAL-Parser';
import make_js from './RAL-CompilerJS'
import Environment from './RAL-Env';
import Evaluate from './RAL-Eval';

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

        //console.log( UglifyJS.parse(this.code).print_to_string({ beautify: true }) );
        // this.globalEnv = new Environment();
        // this.globalEnv.def("print", function(txt){
        //     console.log(txt);
        // })
        // this.globalEnv.def("libs", this.Lexer.libs)
        // this.globalEnv.def("Find", function(x){
        //     console.log('finding',x);
        //     return {value:"Find"};
        // })
        // this.globalEnv.def("Killprocess", function(x){
        //     console.log('Killing Process...', x);
        //     return {value:"Killprocess"};
        // })
        // Evaluate(this.ast,this.globalEnv);
        // console.log(this.globalEnv);
        // var n = this.Lexer.next();
        // var arr = [];
        // while(n != null){
        //     arr.push(n);
        //     n = this.Lexer.next();
        // }
        // console.log(arr);

    lex(string){
        // let str = string.slice();
        // let tokens = str.split(/:|;/).map(s => s.trim()).filter(s => s.length > 0);
        // console.log(tokens);
    }
    
}

function print(text){
    console.log(text);
}

export default RootAccessVM;