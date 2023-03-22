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
// This function takes a callback function which returns times in milliseconds.
// These times represent alarm times in the future; `timer` sets alarms and 
// plays an alarm when the specified time is reached.
const timer = function(userInputSanitizer) {

  // Call `userInputSanitizer` to sanitize data and return alarm times in 
  // milliseconds.
  const alarmTimesArray = userInputSanitizer();
  // console.log(`timer() function: ${alarmTimesArray}`);


  // Check if there are any alarms in the array. If not, issue notice and exit
  // the application.
  if (alarmTimesArray.length === 0) {
    
    console.log("No valid integers were entered! No alarms were set!");

  // If valid times are available, set alarms.
  } else {

    // Iterate over the alarms...
    for (const alarm of alarmTimesArray) {
      
      // ... and set alarm times:
      setTimeout(() => {

        // System beeps don't work on my system, so here is a visual alarm:
        console.log(`This is the ${alarm} millisecond alarm!`);

      }, alarm);

    }

  }

};



// USER INPUT SANITIZER
// 
// This predicate function takes input from the command line and filters it 
// for positive integers. It converts them into milliseconds and returns it to 
// the caller.
const userInputSanitizer = function() {

  // Call the command line and extract all the input, minus Node's 
  // interjections.
  const rawInput = process.argv.splice(2);

  // Tries to convert the raw input into Numbers. Non-numbers are filtered out. 
  // (Can also be done with parseInt`).
  const numberArray = rawInput.filter(e => Number(e));

  // Converts the Numbers into Integers by truncating floating-point values:
  const integerArray = numberArray.map(e => Math.trunc(e));

  // Filters out Integers smaller than 0.
  const naturalNumberArray = integerArray.filter(e => e > 0);

  // Denominate the Natural Numbers in milliseconds:
  const timesArray = naturalNumberArray.map(e => e * 1000);


  return timesArray;
}



// DRIVER CODE:
timer(userInputSanitizer);