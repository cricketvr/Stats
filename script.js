const players = [
  {
    name: "Kandhar",
    matches: 2,
    balls: 60,
    runs: 100,
    fifties: 1,
    hundreds: 0,
    highest: 76,
    wins: 1
  },
  {
    name: "HimalyanMonsta",
    matches: 2,
    balls: 60,
    runs: 157,
    fifties: 2,
    hundreds: 0,
    highest: 83,
    wins: 1
  },
  {
    name: "Santa Ji",
    matches: 0,
    balls: 0,
    runs: 0,
    fifties: 0,
    hundreds: 0,
    highest: 0,
    wins: 0
  },
  {
    name: "Vishal",
    matches: 0,
    balls: 0,
    runs: 0,
    fifties: 0,
    hundreds: 0,
    highest: 0,
    wins: 0
  }
];

// PERFORMANCE SCORE (Ranking Logic)
players.forEach(p=>{
  p.strike = p.balls ? ((p.runs/p.balls)*100).toFixed(2) : 0;
  p.score = p.runs + (p.wins*20) + (p.fifties*10);
});

// SORT BY PERFORMANCE
players.sort((a,b)=> b.score - a.score);

// RENDER
let html = "";

players.forEach((p,i)=>{

  let medal = ["🥇","🥈","🥉","🏅"][i] || "🏅";

  html += `
  <div class="card">
    <div class="rank">${medal} Rank ${i+1}</div>
    <h2>${p.name}</h2>

    Matches: ${p.matches}<br>
    Balls: ${p.balls}<br>
    Runs: ${p.runs}<br>
    50s: ${p.fifties}<br>
    100s: ${p.hundreds}<br>
    Highest: ${p.highest}<br>
    Wins: ${p.wins}<br>
    Strike Rate: ${p.strike}
  </div>
  `;
});

document.getElementById("players").innerHTML = html;
