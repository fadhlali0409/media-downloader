let trades = [];

function addTrade() {
  const pair = document.getElementById("pair").value;
  const type = document.getElementById("type").value;
  const entry = document.getElementById("entry").value;
  const tp = document.getElementById("tp").value;
  const sl = document.getElementById("sl").value;

  if (!entry || !tp || !sl) {
    alert("املأ جميع الحقول");
    return;
  }

  const trade = {
    pair,
    type,
    entry,
    tp,
    sl,
    time: new Date().toLocaleString()
  };

  trades.push(trade);
  renderTrades();
}

function renderTrades() {
  const container = document.getElementById("trades");
  container.innerHTML = "";

  trades.forEach((t, index) => {
    container.innerHTML += `
      <div class="trade">
        <b>${t.pair} - ${t.type}</b><br>
        دخول: ${t.entry} <br>
        TP: ${t.tp} | SL: ${t.sl}<br>
        🕒 ${t.time}
        <button onclick="deleteTrade(${index})">حذف</button>
      </div>
    `;
  });
}

function deleteTrade(index) {
  trades.splice(index, 1);
  renderTrades();
}
