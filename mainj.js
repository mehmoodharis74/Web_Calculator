//--------------------------chcking default dark mode
let chckdark=window.matchMedia("(prefers-color-scheme: dark)");
let mydark=false;
if(chckdark.matches){
    darkmode();
    mydark=true;
}
else{
    lightmode();
    mydark=false;
}
//to enable dark mode features
function darkmode(){
    document.getElementById("body").style.backgroundColor = "black";
    document.getElementById("author").style.color = "white";
    document.getElementById("moon").style.fill = "black";
    document.getElementById("dark_mode").style.backgroundColor = "yellow";
    document.getElementById("dark_mode").style.borderColor = "black";

}
//to enable light mode features
function lightmode(){
    document.getElementById("body").style.backgroundColor = "white";
    document.getElementById("author").style.color = "Black";
    document.getElementById("moon").style.fill = "white";
    document.getElementById("dark_mode").style.backgroundColor = "black";
   // document.getElementById("dark_mode").style.borderColor = "white";
 

}
//to toggle dark mode/light mode
function en_dark_mode(){
    if(mydark){
        lightmode();
        mydark=false;
    }
    else{
        darkmode();         
        mydark=true;
    }
}
//-------------------------fx-convertor effect--------------
// const main_screen=document.querySelector('[data-fx_conv]');
// const calc_butt=document.querySelector('[data-calc_butt]');
// const buttons_to_hide=document.getElementsByClassName("scientific_butt_class");
// let chck_cal_type='normal';
// function fx_conv(){
//     if(chck_cal_type=='normal'){
//         main_screen.style.maxWidth='42rem';
//         calc_butt.style.gridTemplateColumns='repeat(8, minmax(0, 1fr))';
//         for(let i=0;i<buttons_to_hide.length;i++)
//         buttons_to_hide[i].style.display='block';
        
        
//         document.getElementById("fx").innerHTML="N";
//         chck_cal_type='scientific';
//     }
//     else{
//         for(let i=0;i<buttons_to_hide.length;i++)
//         buttons_to_hide[i].style.display='none';
//         calc_butt.style.gridTemplateColumns='repeat(4, minmax(0, 1fr))';
//         main_screen.style.maxWidth='24rem';       
//         document.getElementById("fx").innerHTML="fx";
//         chck_cal_type='normal';
//     }
// }
//----------------------------------------------------------------

//data structure to maintain the list of numbers entered by the user
class Stack{
    constructor(){
        this.items = [];
    }
    push(item){
        this.items.push(item);
    }
    pop(){
        if(this.isEmpty()){
            return "Underflow Exception";
        }
        return this.items.pop();
    }
    peek(){
        return this.items[this.items.length-1];
    }
    isEmpty(){
        return this.items.length == 0;
    }
    size(){
        return this.items.length;
    }
    clear(){
        this.items = [];
    }
}

//class to perform all calcutor functionalities
class calculator{
    
    constructor(previous_data,main_data){
        this.previous_data=previous_data;
        this.main_data=main_data;
        this.ans=0;
        this.backscreen='';
        this.frontscreen="0";
        this.allclear();
        this.update_display();
        
    }
    //write a function to check if the character is an operand
    chck_operand(op) {
        if (op == '+' || op == '-' ||
            op == '^' || op == '*' ||
            op == '/' || op == '(' ||
            op == ')'|| op=='%') {
            return true;
        }
        else
            return false;
    }
precedency(op) {  
     if (op == '+' || op == '-') {
        return 1;
    }
    else if (op == '/' || op == '*') {
        return 2;
    }
    else if (op == '^' || op=='%') {
        return 3;
    }
    else
        return 0;
}
get isfront_screen_clear(){
    if((this.frontscreen==='0'||this.frontscreen.length===0)||
    (this.frontscreen.includes(".")&&this.frontscreen=='0')|| 
    (this.chck_operand(this.frontscreen[this.frontscreen.length-1]))||
    ((this.frontscreen[this.frontscreen.length-1])==='.')
    )return true;
    else return false;
}

//write a function to convert infinix string to prefix string
infix_to_postfix(infix){
    // infix=infix.split("").reverse().join("");
    let stack = new Stack();
    let postfix = '';
    for (let i = 0; i < infix.length; i++) {
        let c = infix[i];
        if (c == ' ') {
            continue;
        }
        else if (c == '(') {
            stack.push(c);
        }
        else if (c == ')') {
            while (stack.peek() != '(') {
                postfix += stack.pop();
            }
            stack.pop();
        } 
        else if (this.chck_operand(c)) {
            while (!stack.isEmpty() && this.precedency(stack.peek()) >= this.precedency(c)) {
                postfix += stack.pop();
            }
            stack.push(c);
        }
        else {
            postfix += c;
            if(this.chck_operand(infix[i+1])||(i+1>=infix.length))postfix += '@';
        }
    }
    while (!stack.isEmpty()) {
        postfix += stack.pop();
    }
  //  postfix=postfix.split("").reverse().join("");
  console.log(postfix);
    return postfix;
}




//write a function to evaluate the prefix string
evaluate_postfix(postfix){
    let stack=new Stack();
    let tmp_num='';
    for(let i=0;i<postfix.length;i++){
        if(postfix[i]==='@'){
            stack.push(tmp_num);
            tmp_num='';
            continue;
        }
        
        else if(this.chck_operand(postfix[i])){
            let num1=stack.pop();
            let num2=stack.pop();
            if(postfix[i]=='+'){
                stack.push(parseFloat(num2)+parseFloat(num1));
            }
            else if(postfix[i]=='-'){
                stack.push(parseFloat(num2)-parseFloat(num1));
            }
            else if(postfix[i]=='*'){
                stack.push(parseFloat(num2)*parseFloat(num1));
            }
            else if(postfix[i]=='/'){
                stack.push(parseFloat(num2)/parseFloat(num1));
            }
            else if(postfix[i]=='^'){    
                stack.push(Math.pow(parseFloat(num2),parseFloat(num1)));
            }
            else if(postfix[i]=='%'){    
                stack.push(parseFloat(num2) % parseFloat(num1));
            }
        }
        else{       
            tmp_num+=postfix[i];
         }
    }
    return stack.pop();
}
infix_string(text){
        if(text==="."){
            if(this.isfront_screen_clear)return;

            }
        //to chck not to enter more than one operator at a same time
        if((this.chck_operand(this.frontscreen[this.frontscreen.length-1])&&this.chck_operand(text))
        ) return; 
        //to chck not to enter operator at start
        if(this.chck_operand(text)&&(this.isfront_screen_clear)) return; 

        if(this.frontscreen==='0'&& text!==".") this.frontscreen="";

        if(text==="mod") text="%";

        this.frontscreen+=text;





        // if(this.main_data.offsetHeight>=160 &&this.main_data.offsetWidth>=300){
        //     //this.main_data.style.fontSize-='0.5rem';
        //     console.log("ok");
        // }
        // if(this.chck_operand(text)){
        //     this.ans=parseInt(text);
        // }
        // console.log(this.main_data.offsetWidth);
        // console.log(this.main_data.offsetHeight);

        // if(this.main_data.offsetHeight>40){
        //     this.main_data.style.fontSize='1.875rem';
        // }
        // else if(this.main_data.offsetHeight>=120){
           
        //     this.backscreen+=this.frontscreen;
        //     this.frontscreen="";
        // }
        // else if(this.main_data.offsetHeight>=240){
           
        //     this.backscreen+=this.frontscreen;
        //     this.frontscreen="";
        // }
        
        //this.tmp_num+=text;
    }
  
        
    // }
     calculation(){
        this.ans=parseFloat(this.evaluate_postfix(this.infix_to_postfix(this.frontscreen)));
     }
    allclear(){
        if(this.isfront_screen_clear){
        this.backscreen='';}
        else {
        this.backscreen="Ans="+this.ans.toString();}
        this.frontscreen='0';
        
    }
    del(){
        if(this.frontscreen.length===1){
        this.frontscreen='0';
            return;
        }
        this.frontscreen=this.frontscreen.slice(0,-1);
        
    }
    allequals(){
        //check not to press equal button without entring any value
        if(this.isfront_screen_clear) return;
        this.backscreen=this.frontscreen+"=";
        this.calculation();
        this.frontscreen=this.ans.toString();
    }
    update_display(){  
        this.previous_data.innerHTML=this.backscreen;         
        this.main_data.innerHTML=this.frontscreen;
    }
}

const data_numbers = document.querySelectorAll('[data-numbers]');
const data_operators = document.querySelectorAll('[data-operators]');
const previous_data = document.querySelector('[data-previous]');
const main_data = document.querySelector('[data-main]');
const data_equals=document.querySelector('[data-equal]');
const data_clear=document.querySelector('[data-clear]');
const data_delete=document.querySelector('[data-delete]');

const obj=new calculator(previous_data,main_data);

data_numbers.forEach(button=>{
button.addEventListener('click',()=>{
    obj.infix_string(button.innerText);
    obj.update_display();
    })
})
data_clear.addEventListener('click',function(event){obj.allclear();
    obj.update_display();})

data_delete.addEventListener('click',function(event){
    obj.del();
    obj.update_display();
   })

data_equals.addEventListener('click',function(event){
    obj.allequals();
    obj.update_display();
   })




