/**
 * Extract REAL_STUDENTS from prototype HTML and write seed JSON.
 * Run: npx ts-node scripts/extract-students.ts
 */
import * as fs from 'fs';
import * as path from 'path';

const htmlPath = path.join(__dirname, '../../DASHBO~3.HTM');
const outPath = path.join(__dirname, '../prisma/seed-data.json');

const html = fs.readFileSync(htmlPath, 'utf8');
const match = html.match(/const REAL_STUDENTS = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('REAL_STUDENTS not found in HTML');
  process.exit(1);
}

const students = JSON.parse(match[1]);
fs.writeFileSync(outPath, JSON.stringify(students, null, 0));
console.log(`Extracted ${students.length} students to ${outPath}`);
