const fs = require('fs');
const path = 'C:/Users/user/Desktop/hospital/frontend/src/pages/RadiologyWorkspace.jsx';

let content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log('Total lines:', lines.length);

// Find line 428 (return ()
const returnLine428 = 427; // 0-indexed

// Find line 1648 (const [aerLicenses)
const aerLicensesLine = 1647; // 0-indexed

// Extract the misplaced block (lines 1648-1739, 0-indexed 1647-1738)
const misplacedBlock = lines.slice(aerLicensesLine, aerLicensesLine + 92);
console.log('Misplaced block lines:', misplacedBlock.length);
console.log('First line of block:', misplacedBlock[0]);
console.log('Last line of block:', misplacedBlock[misplacedBlock.length - 1]);

// Remove the misplaced block from its current location
lines.splice(aerLicensesLine, misplacedBlock.length);

// Insert the block BEFORE line 428 (return ()
lines.splice(returnLine428, 0, ...misplacedBlock, '');

// Write back
fs.writeFileSync(path, lines.join('\n'));

// Verify
const newContent = fs.readFileSync(path, 'utf8');
const newLines = newContent.split('\n');
console.log('New total lines:', newLines.length);
console.log('Line 428 now:', newLines[427]);
console.log('Line 429 now:', newLines[428]);
console.log('Line 430 now:', newLines[429]);

// Check aerLicenses location
for (let i = 0; i < newLines.length; i++) {
  if (newLines[i].includes('const [aerLicenses')) {
    console.log('aerLicenses now at line:', i+1);
    break;
  }
}
