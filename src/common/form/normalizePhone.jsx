// A function to format text to look like a phone number
const normalizePhone = (input) => {
  let _input

  // Strip all characters from the input except digits
  _input = input.replace(/\D/g,'')

  // Trim the remaining input to ten characters, to preserve phone number format
  _input = _input.substring(0,11)

  // Based upon the length of the string, we add formatting as necessary
  var size = _input.length
  
  if(size < 11){
          _input = '('+_input.substring(0,2)+') '+_input.substring(2,6)+' - '+_input.substring(6,10)
  }else{
          _input = '('+_input.substring(0,2)+') '+_input.substring(2,7)+' - '+_input.substring(7,11)
  }
  
  return _input 
}

export default normalizePhone