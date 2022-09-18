
const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname);

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}


function executeC(filepath) {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath);

  return new Promise(function(resolve, reject) {
    try{
    childProcess.exec(`gcc ${filepath} -o ${jobId}  && cd ${outPath} && ${jobId}   `, function(error, standardOutput, standardError) {
      if (error) {
        console.log("error>>>>>>>>>>>>>>>>>",error)
        reject();
    
        return;
      }
    
      if (standardError) {
        console.log("standError",standardError)
        reject(standardError);
    
        return;
      }
    console.log("stroutput>>>>>>>>>>>>>>>",standardOutput)
      resolve(standardOutput);
    })}catch(error){
      console.log("errrrrooorrr>>>>>>>>>>>>>>>>")
    }
  })
}

module.exports = {
  executeC,
};