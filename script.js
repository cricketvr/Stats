// 🔥 Firebase config paste kar yaha
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let data = {};

const playersList = ["Kandharbaby","HimalyanMonsta","Vishal","SantaJi"];

// LOAD DATA
db.ref("players").on("value", snapshot => {
  data = snapshot.val() || {};
  render();
});

// RENDER
function render() {
  let html = "";
  playersList.forEach(p => {
    let d = data[p] || {};

    let avg = d.matches ? (d.runs / d.matches).toFixed(2) : 0;
    let sr = d.balls ? ((d.runs / d.balls) * 100).toFixed(2) : 0;

    html += `
      <div class="card">
        <h2>${p}</h2>
        Matches: ${d.matches || 0}<br>
        Runs: ${d.runs || 0}<br>
        Balls: ${d.balls || 0}<br>
        Avg: ${avg}<br>
        SR: ${sr}<br>
        50s: ${d.fifties || 0}<br>
        100s: ${d.hundreds || 0}<br>
        Wins: ${d.wins || 0}<br>
      </div>
    `;
  });

  document.getElementById("players").innerHTML = html;
}

// LOGIN
function showLogin() {
  document.getElementById("loginBox").style.display = "block";
}

function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (u === "metacricket" && p === "sabkhelo") {
    document.getElementById("loginBox").style.display = "none";
    openAdmin();
  } else {
    alert("Wrong Password ❌");
  }
}

// ADMIN
function openAdmin() {
  let html = "";

  playersList.forEach(p => {
    let d = data[p] || {};

    html += `
      <h3>${p}</h3>
      <input placeholder="Matches" id="${p}_matches" value="${d.matches || 0}">
      <input placeholder="Runs" id="${p}_runs" value="${d.runs || 0}">
      <input placeholder="Balls" id="${p}_balls" value="${d.balls || 0}">
      <input placeholder="50s" id="${p}_50" value="${d.fifties || 0}">
      <input placeholder="100s" id="${p}_100" value="${d.hundreds || 0}">
      <input placeholder="Wins" id="${p}_wins" value="${d.wins || 0}">
    `;
  });

  document.getElementById("editArea").innerHTML = html;
  document.getElementById("adminPanel").style.display = "block";
}

// SAVE
function saveData() {
  let newData = {};

  playersList.forEach(p => {
    newData[p] = {
      matches: +document.getElementById(p+"_matches").value,
      runs: +document.getElementById(p+"_runs").value,
      balls: +document.getElementById(p+"_balls").value,
      fifties: +document.getElementById(p+"_50").value,
      hundreds: +document.getElementById(p+"_100").value,
      wins: +document.getElementById(p+"_wins").value
    };
  });

  db.ref("players").set(newData);
  alert("Saved ✅");
}
