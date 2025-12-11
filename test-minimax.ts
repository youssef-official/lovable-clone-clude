import { generateCodeWithMiniMax } from "./generateWithMiniMax";
import * as fs from 'fs';
import * as path from 'path';

async function testMiniMaxCodeGeneration() {
  console.log("Testing MiniMax M2 API by generating a Tic-Tac-Toe game...\n");
  
  const prompt = `Create a simple Tic-Tac-Toe game in a single HTML file with:
  - Complete game logic in JavaScript
  - Player vs Player gameplay
  - Nice CSS styling with a modern look
  - Win detection and game reset functionality
  - Display current player turn
  - Highlight winning combination
  
  Output the complete, self-contained HTML code.`;
  
  const result = await generateCodeWithMiniMax(prompt);
  
  if (result.success && result.code) {
    const outputFilePath = path.join(process.cwd(), 'tictactoe_minimax.html');
    fs.writeFileSync(outputFilePath, result.code);
    
    console.log("\n✅ Code generation completed successfully!");
    console.log(`Code saved to: ${outputFilePath}`);
    console.log("First 10 lines of generated code:");
    console.log("----------------------------------");
    console.log(result.code.split('\\n').slice(0, 10).join('\\n'));
    console.log("----------------------------------");
    
  } else {
    console.error("\n❌ Code generation failed:", result.error);
  }
}

// Run the test
testMiniMaxCodeGeneration().catch(console.error);
