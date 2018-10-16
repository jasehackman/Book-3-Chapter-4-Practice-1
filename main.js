// How many total commits were made in all of Steve's events?
// How many of each event type are there? (PullRequestEvent, PushEvent, etc)
// List all Github users who submitted a pull request that was approved by Steve.
// List all repositories on which Steve had an event, and show how many events were on each one.
// Which event had the most number of commits?
// Which programming langugages were affected by Steve's events?
// What programming language was the most affected by Steve's events?




// question 1: How many total commits were made in all of Steve's events?
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



// console.log('commit', commit);
// console.log('test', test);


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

// console.log("test2", test2);
// console.log('commit', commit);
// .hasOwnProperty()


// Question 2: How many of each event type are there? (PullRequestEvent, PushEvent, etc)

// My solution
let type = []

for(let i = 0; i < githubData.length; i++){
  type.push(githubData[i].type);
}

// console.log(type);

let countobj = {
  pullRequest: 0,
  pushEvent: 0,
  deleteEvent: 0,
  issueCommentEvent: 0,
  createEvent: 0,
}

for(let i = 0; i < githubData.length; i++){
  if (githubData[i].type === "PushEvent") {
    countobj.pushEvent++
  } else if (githubData[i].type === "PullRequestEvent") {
    countobj.pullRequest++
  }  else if (githubData[i].type === "DeleteEvent") {
    countobj.deleteEvent++
  } else if (githubData[i].type === "IssueCommentEvent") {
    countobj.issueCommentEvent++
  }  else if (githubData[i].type === "CreateEvent") {
    countobj.createEvent++
  }
}

// console.log('countobj', countobj);


// David's Solution

let eventTypes = [];
let eventcounts = {
  PushEvent: 0,
  PullRequestEvent: 0,
  DeleteEvent: 0,
  IssueCommentEvent: 0,
  CreateEvent: 0, 
};

for(let i=0; i<githubData.length;i++) {
  // get unique events
  if (!eventTypes.includes(githubData[i].type)) {
      eventTypes.push(githubData[i].type)
  }
  // Access each key adds one to the value of that key
  eventcounts[githubData[i].type] += 1
}

// console.log(eventTypes);
// console.log(eventcounts);

// Question 3
// List all Github users who submitted a pull request that was approved by Steve.

let name = []
let test3 = 0
for(let i = 0; i <githubData.length; i++) {
  
  if("pull_request" in githubData[i].payload) {
    test3++
    if(githubData[i].payload.pull_request.merged_by !== null){
      if (githubData[i].payload.pull_request.merged_by.login === "stevebrownlee") {
        if(!name.includes(githubData[i].payload.pull_request.user.login)) {
          name.push(githubData[i].payload.pull_request.user.login);
        }
      }
    }
  }
}


// console.log('name', name);
// console.log("test3", test3);

// Question 4 // List all repositories on which Steve had an event, and show how many events were on each one.

let rep = [];
let count = {
  mastery: 0,
  bangazon: 0,
  setup: 0,
  store: 0,
}

const loop = githubData.forEach(element => {
  if(!rep.includes(element.repo.name)) {
    rep.push(element.repo.name);
  }
});

const otherLoop = githubData.forEach(element => {
  if(element.repo.name === "nashville-software-school/client-side-mastery") {
    count.mastery++;
  } else if (element.repo.name === "nashville-software-school/bangazon-llc"){
    count.bangazon++;
  } else if (element.repo.name === "stevebrownlee/vps-setup"){
    count.setup++;
  } else if (element.repo.name === "stevebrownlee/vps-setup"){
    count.setup++;
  }

});


// console.log(count);
// console.log(rep);

//Question 5: Which event had the most number of commits?

const commitArray = [];

githubData.forEach(thing => {
  commitArray.push(thing.id);
})

console.log(commitArray);



let commit2 = 0
let name2 = null 

for(let i = 0; i < githubData.length; i++){
  if('payload' in githubData[i]) {
    for(let pay in githubData[i].payload) {
      // console.log(pay);
      if(pay ==='commits') {
        for(let j = 0; j < githubData[j].payload.commits.length; j++) {
          if (githubData[j].payload.commits.length > commit2) {
            commit2 = githubData[j].payload.commits.length;
            name2 = githubData[j].id;
            
          
            
          }
          
          
        }
      }
    }
  }
  
}



// console.log('commit', commit);
// console.log('test', test);


for(let i = 0; i < githubData.length; i++){
  if('payload' in githubData[i]) {
    for(let pay in githubData[i].payload) {
      if(pay ==='pull_request') {
        for(let pull in githubData[i].payload.pull_request) {
          if(pull === "commits") {
            if (githubData[i].payload.pull_request.commits > commit2) {
              commit2 = githubData[i].payload.pull_request.commits;
              name2 = githubData[i].id;
              
            }
          
          }
        }
      }
    }
  }
}

console.log(name2, commit2);


// Question 6 // Which programming langugages were affected by Steve's events?

let lang = []

for(let i = 0; i < githubData.length; i++){
  if('payload' in githubData[i]) {
    for(let pay in githubData[i].payload) {
      if(pay ==='pull_request') {
        // for(let pull in githubData[i].payload.pull_request.base.repo) {
          if(!lang.includes(githubData[i].payload.pull_request.base.repo.language)) {
            lang.push(githubData[i].payload.pull_request.base.repo.language);
          }
        // }
      }
    }
  }
}


console.log("lang", lang);


// Question 7: What programming language was the most affected by Steve's events?
