const players = [
  {
    name: "Kandhar",
    matches: 2,
    balls: 60,
    runs: 100,
    fifties: 1,
    hundreds: 0,
    best: "76 (30)",
    highest: 76,
    wins: 1,
    fastest50: "30 balls",
    fastest100: "-"
  },
  {
    name: "HimalyanMonsta",
    matches: 2,
    balls: 60,
    runs: 157,
    fifties: 2,
    hundreds: 0,
    best: "83 (30)",
    highest: 83,
    wins: 1,
    fastest50: "22 balls",
    fastest100: "-"
  },
  {
    name: "Santa Ji",
    matches: 0,
    balls: 0,
    runs: 0,
    fifties: 0,
    hundreds: 0,
    best: "-",
    highest: 0,
    wins: 0,
    fastest50: "-",
    fastest100: "-"
  },
  {
    name: "V- Chach",
    matches: 0,
    balls: 0,
    runs: 0,
    fifties: 0,
    hundreds: 0,
    best: "-",
    highest: 0,
    wins: 0,
    fastest50: "-",
    fastest100: "-"
  }
];

// CALCULATIONS
players.forEach(p=>{
  p.strike = p.balls ? ((p.runs/p.balls)*100).toFixed(2) : 0;
  p.score = p.runs + (p.wins*25) + (p.fifties*15);
});

// SORT
players.sort((a,b)=> b.score - a.score);

// RENDER
let html = "";

players.forEach((p,i)=>{
  let medal = ["🥇","🥈","🥉","🏅"][i];

  html += `
  <div class="card">
    <div class="rank">${medal} Rank ${i+1}</div>
    <h2>${p.name}</h2>

    <div class="stats">
      <p>🎮 Matches: ${p.matches}</p>
      <p>🏏 Runs: ${p.runs}</p>
      <p>⚡ Balls: ${p.balls}</p>
      <p>🔥 Strike Rate: ${p.strike}</p>
      <p>🎯 Best Score: ${p.best}</p>
      <p>📈 Highest: ${p.highest}</p>
      <p>💥 50s: ${p.fifties}</p>
      <p>💯 100s: ${p.hundreds}</p>
      <p>🚀 Fastest 50: ${p.fastest50}</p>
      <p>👑 Fastest 100: ${p.fastest100}</p>
      <p>🏆 Wins: ${p.wins}</p>
    </div>
  </div>
  `;
});

document.getElementById("players").innerHTML = html;

// CHART
const ctx = document.getElementById("chart");

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: players.map(p=>p.name),
    datasets: [{
      label: 'Runs',
      data: players.map(p=>p.runs)
    }]
  },
  options: {
    plugins:{legend:{display:false}}
  }
});
