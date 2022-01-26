if (!Object.is) {
    Object.is = function ObjectIs(arg1, arg2) { 
      function isNan(value){
        return Number.isNaN(value)
      }
    
      function negCero(value){
        return value === 0 && 1/value === -Infinity
      }
      
      if (isNan(arg1) && isNan(arg2)){
        return true
      }
      else if(negCero(arg1) && negCero(arg2)){
        return true
      }
      else if(isNan(arg1) || isNan(arg2) || negCero(arg1) || negCero(arg2)){
        return false
      }
      else if (arg1 === arg2){
        return true
      }
    else return false
    }
  }
  
  
  console.log(Object.is(42,42) === true);
  console.log(Object.is("foo","foo") === true);
  console.log(Object.is(false,false) === true);
  console.log(Object.is(null,null) === true);
  console.log(Object.is(undefined,undefined) === true);
  console.log(Object.is(NaN,NaN) === true);
  console.log(Object.is(-0,-0) === true);
  console.log(Object.is(0,0) === true);
  
  console.log(Object.is(-0,0) === false);
  console.log(Object.is(0,-0) === false);
  console.log(Object.is(0,NaN) === false);
  console.log(Object.is(NaN,0) === false);
  console.log(Object.is(42,"42") === false);
  console.log(Object.is("42",42) === false);
  console.log(Object.is("foo","bar") === false);
  console.log(Object.is(false,true) === false);
  console.log(Object.is(null,undefined) === false);
  console.log(Object.is(undefined,null) === false);  