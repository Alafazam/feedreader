fs = require('fs');

var StringData;
// Async
// fs.readFile('./input.txt', 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   StringData = data.split('\n');
//   var inputN = StringData.shift();
//   StringData.sort((a,b) => { return a.length-b.length});
// });



// Sync
StringData = fs.readFileSync('./input.txt', 'utf8').split('\n');
var inputN = StringData.shift();

StringData.sort((a,b) => { return a.length-b.length});
console.log(StringData);