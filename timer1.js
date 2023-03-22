/* CHALLENGE: SIMPLE TIMER [MODULE 1, WEEK 4]
 * 
 * In this challenge, we are going to combine our prior experience with command 
 * line arguments and asynchronous programming in order to implement a simple 
 * Alarm Clock / Timer app.
 * 
 * Objective: Implement an alarm clock/timer which will beep after a specified 
 * amount of time has passed. The user can specify an unlimited number of alarms 
 * using command line arguments.
 * 
 * Example usage:
 * 
 *     node timer1.js 10 3 5 15 9 
 * 
 * This will make it beep at 3, 5, 9, 10, 15 seconds respectively.
 * 
 * A quick Google Search of "node system beep" shows that in order to make our 
 * machine perform a system sound, we can simply output the following special 
 * character to stdout.
 * 
 * process.stdout.write('\x07');
 * 
 * NOTE: Unfortunately, this doesn't seem to work on my system. If it's not 
 * working, we can switch to sending a visible character like "." to stdout.
 */



// TIMER IMPLEMENTATION
// 
// This function takes input from the command line in the form of positive 
// integers. These integers represent seconds until an alarm is to be played.
// `timer` takes these inputs and plays an alarm after x seconds have passed.
const timer = function(userInputSanitizer) {

  const times = userInputSanitizer();
  console.log(`timer() function: ${times}`);

};



// This function collects user input from the command line, sanitizes it and
// returns it to the caller.
const userInputSanitizer = function() {

  // Call the command line and extract all the input, minus Node's 
  // interjections.
  const rawInput = process.argv.splice(2);

  // Tries to convert the raw input into Numbers. Non-numbers are filtered out. 
  // (Can also be done with parseInt`).
  const NumberArray = rawInput.filter(e => Number(e));

  // Converts the Numbers into Integers by truncating Floating-point values:
  const IntegerArray = NumberArray.map(e => Math.trunc(e));

  // Filters out Integers smaller than 0.
  const NaturalNumberArray = IntegerArray.filter(e => e > 0);


  return NaturalNumberArray;
}



// DRIVER CODE:
timer(userInputSanitizer);