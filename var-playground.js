var person = {
	name: 'Isaac',
	age: 25
}

function updatePerson (obj){
	// obj = {
	// 	name: 'Isaac',
	// 	age: 30
	// };
	obj.age = 30;
}

updatePerson(person);
console.log(person);

//

var myArray = [80,90]

function updateArray (arr, val){
	arr.push(val);
	debugger;
}

updateArray(myArray, 92)
console.log(myArray);