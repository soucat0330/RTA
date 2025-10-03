async function get_diff() {
  const diff_url = "https://kenkoooo.com/atcoder/resources/problem-models.json";
  try {
    const res = await fetch(diff_url);
    return await res.json();
  } catch (e) {
    console.error(e);
    return {};
  }
}

function set_digits(int) {
  return String(int).padStart(2, "0");
}

function format_date(date) {
  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;

  const days = Math.floor(date / day);
  date %= day;

  const hours = set_digits(Math.floor(date / hour));
  date %= hour;

  const minutes = set_digits(Math.floor(date / min));
  date %= min;

  const seconds = set_digits(Math.floor(date / sec));

  return `${days}d ${hours}:${minutes}:${seconds}`;
}

function unix_to_date(unix) {
  const date = new Date(unix * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = set_digits(date.getHours());
  const minutes = set_digits(date.getMinutes());
  const seconds = set_digits(date.getSeconds());
  return `${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function add_td(table, td) {
  const tr = document.createElement("tr");
  tr.appendChild(td);
  table.appendChild(tr);
}

function create_info(text, value) {
  const div = document.createElement("div");
  div.classList.add("text-center", "col-6", "col-md-3");
  const d_text = document.createElement("h6");
  d_text.innerText = text;
  const d_value = document.createElement("div");
  d_value.innerText = value;
  d_value.classList.add("fs-4");
  div.append(d_text, d_value);
  return div;
}
const start = new Date(2025, 9, 4, 9, 0, 0);

window.addEventListener("load", async () => {
  const url = "https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=Shymohn&from_second=1759536000";
  const data = await get_diff();
  const table = document.getElementById("table");

  fetch(url).then((res) => {
    return res.json();
  }).then((result) => {
    let cnt = 1;
    let diffcnt = 0;
    let wacnt = 0;
    let tlecnt = 0;
    let temp_time = start;
    result.forEach((sub) => {
      if (sub["result"] == "AC") {
        const tr = document.createElement("tr");

        const num = document.createElement("td");
        num.innerText = cnt;

        const name = document.createElement("td");
        name.innerText = sub["problem_id"];

        const diff_td = document.createElement("td");
        let diff;
        if (data[sub["problem_id"]]) diff = data[sub["problem_id"]]["difficulty"];
        else diff = 0;
        diff_td.innerText = diff;

        const ac_time = document.createElement("td");
        const ac_unix = Number(sub["epoch_second"]);
        ac_time.innerText = unix_to_date(ac_unix);

        const past_time = document.createElement("td");
        past_time.innerText = format_date(new Date(ac_unix * 1000) - start);

        if (diff >= 400) {
          diffcnt += diff;

          tr.append(num, name, diff_td, ac_time, past_time);

          table.appendChild(tr);

          if (cnt % 10 == 0) {
            const lap = document.createElement("td");
            lap.innerText = `${cnt - 10}~${cnt}問のラップタイム:${format_date(new Date(ac_unix * 1000) - temp_time)}`;
            lap.colSpan = 5;
            lap.classList.add("fw-medium", "fs-5");
            temp_time = new Date(ac_unix * 1000);
            add_td(table, lap);
          }
          cnt++;
        }
      } else if (sub["result"] == "WA") wacnt++;
      else if (sub["result"] == "TLE") tlecnt++;
    });
    const info = document.getElementById("info");

    const diff_sum = create_info("diff合計", diffcnt);
    const wa_td = create_info("WA数", wacnt);
    const tle_td = create_info("TLE数", tlecnt);
    const last = create_info("のこり問題数", 35 - cnt + 1);
    info.append(diff_sum, wa_td, tle_td, last);
  }).catch((e) => {
    console.log(e) //エラー
  });

  setInterval(() => {
    const now = new Date();
    let diff = now - start;

    document.getElementById("timer").innerText = format_date(diff);
  }, 100);
});
