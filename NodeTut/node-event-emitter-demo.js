//Tutorial #9 - Node Event Emitter
//https://www.youtube.com/watch?v=NtrnaTKqFPQ

//import the node modules
var events = require('events');
var util = require('util');

// make a new constructor that creates a new local variable
// Local variable 'name' is now whatever string you pass into the argument.
var Person = function(name){
    this.name = name;
};

// allows Person to take on the EventEmitter method from events module

//util.inherits(Person, events.EventEmitter);

//(NB) ES 6 says it's discouraged, instead using "extends" - see below

Person extends EventEmitter;

//each is now an instance of the Person constructor;
var james = new Person('james');
var mary = new Person('mary');
var ryu = new Person('ryu');

//each is stored in an array
var people = [james, mary, ryu];

//forEach is an array function that iterates each item in the array.

people.forEach(function(person){
//person.on waits for 'speak' event, then runs the function it receives (just a string)
    person.on('speak', function(mssg){
        console.log(person.name + ' said: ' + mssg);
    });
});

//Emit events 'speak' from James and Ryu and pass the string to the receiving function.
james.emit('speak', 'hey dudes');
ryu.emit('speak', 'I want a curry');