const  clueGame = {}

const videoData = [
  {
      name: 'Miss Scarlet',
      present: true,
      rooms: [
          {kitchen: false},
          {ballroom: false},
          {conservatory: false},
          {'dining room': false},
          {'billiard room': false},
          {library: false}
      ]
  },
  {
      name: 'Mrs. White',
      present: false,
      rooms: [
          {kitchen: false},
          {ballroom: false},
          {conservatory: false},
          {'dining room': false},
          {'billiard room': false},
          {library: false}
      ]
  },
  {
      name: 'Reverend Green',
      present: true,
      rooms: [
          {kitchen: false},
          {ballroom: false},
          {conservatory: false},
          {'dining room': false},
          {'billiard room': false},
          {library: false}
      ]
  },
  {
      name: 'Rusty',
      present: false,
      rooms: [
          {kitchen: false},
          {ballroom: false},
          {conservatory: false},
          {'dining room': false},
          {'billiard room': false},
          {library: false}
      ]
  },
  {
      name: 'Colonel Mustard',
      present: true,
      rooms: [
          {kitchen: false},
          {ballroom: false},
          {conservatory: false},
          {'dining room': false},
          {'billiard room': false},
          {library: false}
      ]
  },
  {
      name: 'Professor Plum',
      present: true,
      rooms: [
          {kitchen: false},
          {ballroom: false},
          {conservatory: false},
          {'dining room': false},
          {'billiard room': false},
          {library: false}
      ]
  }
];



/*Exercise: Bracket notation
Create an object using bracket and dot notation that represents the characters and related data you may find in a game of Clue. 
NOTE: According to the course class, they should be added dot notation. 
*/
clueGame.characters = ["Juan", "Carson", "Emilia", "Alex", "Gloria", "Gabe"]
clueGame.weapons = ["kitchen knife", "corkscrew", "shovel", "hunter's rifle"]
clueGame.rooms = ["Kitchen", "Carson's room", "Dining room", "hunter's rifle"]
clueGame.secretCard = { character: random(clueGame.characters), weapon: random(clueGame.weapons), room: random(clueGame.rooms) }
clueGame.suspects = [{ suspect: "Emilia", color: "blue" }, { suspect: "Gabe", color: "yellow" }]

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

//-----------------------------------
/*Exercise: Destructuring 
  1.Create an object. 
  2.Extract out the weapon and location using destructuring
*/
const { weapon: murderWeapon, room: crimeScene } = clueGame.secretCard
const { character: guiltyCharacter } = clueGame.secretCard


const { suspect, color } = clueGame.suspects // Added for exercise looping

//-----------------------------------
/*Exercise: Looping 
Loop through all the properties of the suspect objects 
in the suspects array, mark them if you think they are guilty.*/

function whoTheMurderer() {
  for (suspect of clueGame.suspects) {
    if (suspect.suspect == guiltyCharacter) {
      console.log(`The murderer is ${guiltyCharacter}`)
    }
    else
      console.log(`Good luck next time, ${suspect.suspect} was not the murderer`)
  }
}

//-----------------------------------
/*Exercise :  _.each
Complete class exercise, so the function can iterate over a list of elements, passing the values to a function.

*/

createObject = function CreateSuspectObjects(name) { 
  return { 
    name: name,   
    color: name.split(' ')[1],   
    speak() {log(`my name is ${this.name}`);}
  }; 
}; 

var suspects = ['Miss Scarlet', 'Colonel Mustard', 'Mr. White'];
var suspectsList = []


var suspectsObj = {name1: 'Miss Scarlet', name2: 'Colonel Mustard', name3: 'Mr. White'} //Use to test _.each with an object List

const _ = {}

_.each = function(list, callback){
  if (list.isArray){
  for(element of list){
    suspectsList.push(callback(element))
  }}
  else for(element in list){
    suspectsList.push(callback(list[element]))
  }
}
//-----------------------------------
/*Exercise: Map
Create function to map the elements, which will produce a new array of values by mapping each value in list through a transformation function.
*/

var brakeWeapons = function(weapon){
  return `broken ${weapon}`
}

_.map = function(list, callback){
  const mapArr = []  
  if (Array.isArray(list)){
  for(element of list){
    mapArr.push(callback(element))}
  }
  else for(element in list){
    mapArr.push(callback(list[element]))
  }
  return mapArr
  }
//_.map(clueGame.weapons, brakeWeapons)

//-----------------------------------
/* Exercise: filter
Filter the video data by the people who were present on the night of the murder!
*/
var charPresent = (element) => element.present

_.filter = function(list, callback){
  let filterArr = []
for(element in list){
   if(callback(list[element])){
     filterArr.push(list[element])
   }
  }
  return filterArr
  }

//_.filter(videoData, charPresent) //uncomment to execute

//-----------------------------------
/*Exercise 7: Projecting
Filter and then map this data structure to get the names of the final suspects
*/

var presentSuspects =  element => element.name

//_.map(_.filter(videoData, charPresent),presentSuspects) //Uncomment to execute

//------------------------------------
/*Exercise: translate to ES6
var increment = function(n){ return n + 1; };
var square = function(n){ return n*n; };
var doMathSoIDontHaveTo = function(n, func){ return func(n); };
doMathSoIDontHaveTo(5, square);
doMathSoIDontHaveTo(4, increment);
*/
const increment = n => n+1
const square = n=> n*n
const doMathSoIDontHaveTo =  (n,MathOp) => MathOp(n)
//doMathSoIDontHaveTo(5,square)

//-----------------------------------
/*Exercise: Reduce
Implement Reduce function
*/
array1 = [1, 2, 3, 4]

var reduceFn = function(accumulator, el){
    return (accumulator + (el*el))
}

_.reduce = function (arr, fn, accumulator = 0){
  //var accumulator = 0
  for(element of arr){
      accumulator = fn(accumulator,element)
  }  
  return accumulator
}

//_.reduce(array1, reduceFn)



