/*
grab an element from the dom

assign:
- var (og way to do it, original flavor AVOID)
- let (variables that can be reassigned)
- const (variables that cant be reassigned)
*/
// get the first button
//btn.onclick = function()   // make the button interactive by adding a Event Listener

console.log("JavaScript Started");
const btn = document.querySelector("button");

btn.onclick = () => {
    alert("not much actually")
}
