const get = require("http").get
async function stress() {
try {
  
  console.log("Start")
  let i = 0;
  while(i <= 100000) {
    get("http://localhost:3000/")
    console.log("After get")
    await new Promise(r => setTimeout(r, 1));
    console.log("After promise")
    i++
  }
  console.log("End")
} catch (error) {
  stress()
} 
}

stress()