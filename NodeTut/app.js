//import the node modules
var events = require('events');
var util = require('util');

// make a new constructor that creates a new local variable
// It's named whatever string you pass into the argument.
var Person = function(name){
    this.name = name;
};

util.inherits(Person, events.EventEmitter);

var james = new Person('james');
var mary = new Person('mary');
var ryu = new Person('ryu');

var people = [james, mary, ryu];

people.forEach(function(person){
    person.on('speak', function(mssg){
        console.log(person.name + ' said: ' + mssg);
    });
});

james.emit('speak', 'hey dudes');
ryu.emit('speak', 'I want a curry');