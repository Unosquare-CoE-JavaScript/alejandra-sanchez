function isValidName(name) {
    return Boolean(typeof name === 'string' && name.length > 3 && name.indexOf(" ") < 0);
}

function hoursAttended(attended, length) {

    function typeOfValue(attended,length){
        typeOfValues = ["string", "number"]
        return Boolean(typeOfValues.includes(typeof attended) && typeOfValues.includes(typeof length))
    }

    function numberOrString(attended,length) {
        return Boolean(Number(attended) > 0 && Number(length) > 0)
    }

    function integerValidation(attended,length) {
        return Boolean(Number.isInteger(Number(attended)) && Number.isInteger(Number(length)))
    }

    function attLessLen(attended,length) {
        return Boolean(Number(attended) <= Number(length))
    }

    if (typeOfValue(attended, length) === true && numberOrString(attended, length) === true && integerValidation(attended, length) === true && attLessLen(attended,length)  === true){
        return true
    }
    else return false

}


// tests:
console.log(isValidName("Frank") === true);
console.log(hoursAttended(6, 10) === true);
console.log(hoursAttended(6, "10") === true);
console.log(hoursAttended("6", 10) === true);
console.log(hoursAttended("6", "10") === true);

console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName("") === false);
console.log(isValidName("  \t\n") === false);
console.log(isValidName("X") === false);
console.log(hoursAttended("", 6) === false);
console.log(hoursAttended(6, "") === false);
console.log(hoursAttended("", "") === false);
console.log(hoursAttended("foo", 6) === false);
console.log(hoursAttended(6, "foo") === false);
console.log(hoursAttended("foo", "bar") === false);
console.log(hoursAttended(null, null) === false);
console.log(hoursAttended(null, undefined) === false);
console.log(hoursAttended(undefined, null) === false);
console.log(hoursAttended(undefined, undefined) === false);
console.log(hoursAttended(false, false) === false);
console.log(hoursAttended(false, true) === false);
console.log(hoursAttended(true, false) === false);
console.log(hoursAttended(true, true) === false);
console.log(hoursAttended(10, 6) === false);
console.log(hoursAttended(10, "6") === false);
console.log(hoursAttended("10", 6) === false);
console.log(hoursAttended("10", "6") === false);
console.log(hoursAttended(6, 10.1) === false);
console.log(hoursAttended(6.1, 10) === false);
console.log(hoursAttended(6, "10.1") === false);
console.log(hoursAttended("6.1", 10) === false);
console.log(hoursAttended("6.1", "10.1") === false);
