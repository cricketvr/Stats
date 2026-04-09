// ⚠️ APNA FIREBASE CONFIG YAHAN PASTE KAR
const firebaseConfig = {
  apiKey: "PASTE",
  authDomain: "PASTE",
  databaseURL: "PASTE",
  projectId: "PASTE"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const playersList = ["Kandharbaby","HimalyanMonsta","Vishal","SantaJi"];

// FIRST TIME DATA
db.ref("players").once("value", snap => {
  if (!snap.exists()) {
    db.ref("players").set({
      Kandharbaby: { matches: 0, runs: 0 },
      HimalyanMonsta: { matches: 0, runs: 0 },
      Vishal: { matches: 0, runs: 0 },
      SantaJi: { matches: 0, runs: 0 }
    });
  }
});

// LOAD DATA
db.ref("players").on("value", snap => {
  const data = snap.val() || {};
  let html = "";

  playersList.forEach(p => {
    let d = data[p] || {};
    html += `<p>${p} - Runs: ${d.runs || 0}</p>`;
  });

  document.getElementById("players").innerHTML = html;
});

// ADMIN
function showLogin() {
  document.getElementById("loginBox").style.display = "block";
}

function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (u === "metacricket" && p === "sabkhelo") {
    alert("Login Success ✅");
  } else {
    alert("Wrong ❌");
  }
}
