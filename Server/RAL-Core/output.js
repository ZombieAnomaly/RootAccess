class Firewall{
    Constructor() {
        x=3; 
        this.h=5 
    }; 
    Test() {
        y=5; 
        print(y+h+x) 
    }; 
    Init() {
        print("hi"); 
        print(x+h) 
    } 
}; 
class Test{
    Constructor() {
        a=0; 
        (a==0 !== false ? a=1 : undefined) 
    } 
}





this.text = `
class Firewall::

    func constructor():
        RootAccess.CPU.Threads("Main").Inject(this);
    :end

::end

class Cracker::
    
    func constructor():
        a = 0;
        if(a==0){
            a=1;
        }
    :end

::end

f = Firewall();
`;

//this.compile(this.text);