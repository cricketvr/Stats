// 🔥 Firebase config (yaha apna paste karna hai)
const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  databaseURL: "PASTE_HERE",
  projectId: "PASTE_HERE"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let data = {};

const playersList = ["Kandharbaby","HimalyanMonsta","Vishal","SantaJi"];

// ✅ FIRST TIME DATA CREATE
db.ref("players").once("value", snap => {
  if (!snap.exists()) {
    db.ref("players").set({
      Kandharbaby: { matches: 0, runs: 0, balls: 0, fifties: 0, hundreds: 0, wins: 0 },
      HimalyanMonsta: { matches: 0, runs: 0, balls: 0, fifties: 0, hundreds: 0, wins: 0 },
      Vishal: { matches: 0, runs: 0, balls: 0, fifties: 0, hundreds: 0, wins: 0 },
      SantaJi: { matches: 0, runs: 0, balls: 0, fifties: 0, hundreds: 0, wins: 0 }
    });
  }
});

// 🔄 REALTIME LOAD
db.ref("players").on("value", snap => {
  data = snap.val() || {};
  render();
});

// 🎨 RENDER
function render() {
  let html = "";

  playersList.forEach(p => {
    let d = data[p] || {};

    let avg = d.matches ? (d.runs / d.matches).toFixed(2) : 0;
    let sr = d.balls ? ((d.runs / d.balls) * 100).toFixed(2) : 0;

    html += `
      <div class="card">
        <h2>${p}</h2>
        <p>Matches: ${d.matches || 0}</p>
        <p>Runs: ${d.runs || 0}</p>
        <p>Balls: ${d.balls || 0}</p>
        <p>Average: ${avg}</p>
        <p>Strike Rate: ${sr}</p>
        <p>50s: ${d.fifties || 0}</p>
        <p>100s: ${d.hundreds || 0}</p>
        <p>Wins: ${d.wins || 0}</p>
      </div>
    `;
  });

  document.getElementById("players").innerHTML = html;
}
