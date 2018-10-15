
// question 1
let test = 0
let commit = 0

for(let i = 0; i < githubData.length; i++){
  if('payload' in githubData[i]) {
    for(let pay in githubData[i].payload) {
      // console.log(pay);
      if(pay ==='commits') {
        for(let j = 0; j < githubData[i].payload.commits.length; j++) {
          commit++;
        }
      }
    }
  }
}



console.log('commit', commit);
console.log('test', test);


let test2 = 0
for(let i = 0; i < githubData.length; i++){
  if('payload' in githubData[i]) {
    for(let pay in githubData[i].payload) {
      if(pay ==='pull_request') {
        for(let pull in githubData[i].payload.pull_request) {
          if(pull === "commits") {
            commit += githubData[i].payload.pull_request.commits;
            test2 += githubData[i].payload.pull_request.commits;
          }
        }
      }
    }
  }
}

console.log("test2", test2);
console.log('commit', commit);
// .hasOwnProperty()
