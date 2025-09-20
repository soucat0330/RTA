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

function format_date(date) {
    const sec = 1000;
    const min = sec * 60;
    const hour = min * 60;
    const day = hour * 24;

    const days = Math.floor(date / day);
    date %= day;

    const hours = Math.floor(date / hour);
    date %= hour;

    const minutes = Math.floor(date / min);
    date %= min;

    const seconds = Math.floor(date / sec);

    return `${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;
}

const start = new Date(2025, 8, 17, 19, 46, 20);

window.addEventListener("load", async () => {
    const url = "https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=Kansu&from_second=1758105980";

    const data = await get_diff();

    const before_tr = document.createElement("tr");
    before_tr.innerHTML = `
        <td>265</td><td></td><td></td>
        <td>スタート時点</td>
        <td>0日0時間0分0秒</td>
    `;
    const table = document.getElementById("table");
    table.appendChild(before_tr);

    fetch(url).then((res) => {
        return res.json();
    }).then((result) => {
        let cnt = 1;
        let diffcnt = 0;
        let wacnt = 0;
        let tlecnt = 0;
        result.forEach((sub, i) => {
            if (sub["result"] == "AC") {
                const tr = document.createElement("tr");

                const num = document.createElement("td");
                num.innerText = 265 + cnt;

                const name = document.createElement("td");
                name.innerText = sub["problem_id"];

                const diff = document.createElement("td");
                diff.innerText = data[sub["problem_id"]]["difficulty"];
                diffcnt += data[sub["problem_id"]]["difficulty"];

                const ac_time = document.createElement("td");
                const ac_unix = Number(sub["epoch_second"]);
                const ac_date = new Date(ac_unix * 1000);
                const month = ac_date.getMonth() + 1;
                const day = ac_date.getDate();
                const hours = String(ac_date.getHours()).padStart(2, "0");
                const minutes = String(ac_date.getMinutes()).padStart(2, "0");
                const seconds = String(ac_date.getSeconds()).padStart(2, "0");
                ac_time.innerText = `${month}/${day} ${hours}:${minutes}:${seconds}`;

                const past_time = document.createElement("td");
                past_time.innerText = format_date(ac_date - start);

                tr.appendChild(num);
                tr.appendChild(name);
                tr.appendChild(diff);
                tr.appendChild(ac_time);
                tr.appendChild(past_time);

                table.appendChild(tr);
                cnt++;
            } else if (sub["result"] == "WA") wacnt++;
            else if (sub["result"] == "TLE") tlecnt++;
        });
        const diff_sum = document.createElement("td");
        diff_sum.innerText = `diff合計:${diffcnt}`;
        diff_sum.colSpan = 5;
        const wa_td = document.createElement("td");
        wa_td.innerText = wacnt;
        wa_td.colSpan = 5;
        const tle_td = document.createElement("td");
        tle_td.innerText = tlecnt;
        tle_td.colSpan = 5;

        table.appendChild(diff_sum);
        table.appendChild(wa_td);
        table.appendChild(tle_td);
    }).catch((e) => {
        console.log(e) //エラー
    });

    setInterval(() => {
        const now = new Date();
        let diff = now - start;

        document.getElementById("timer").innerText = format_date(diff);
    }, 100);
});
