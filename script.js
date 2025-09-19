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


window.addEventListener("load", async () => {
    const url = "https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=Kansu&from_second=1758105980";

    const data = await get_diff();

    fetch(url).then((res) => {
        return res.json()
    }).then((result) => {
        let cnt = 1;
        result.forEach((sub, i) => {
            if (sub["result"] == "AC") {
                const tr = document.createElement("tr");
                const num = document.createElement("td");
                num.innerText = 265 + cnt;
                const name = document.createElement("td");
                name.innerText = sub["problem_id"];
                const diff = document.createElement("td");
                diff.innerText = data[sub["problem_id"]]["difficulty"];


                tr.appendChild(num);
                tr.appendChild(name);
                tr.appendChild(diff);

                document.getElementById("table").appendChild(tr);
                cnt++;
            };
        });
    }).catch((e) => {
        console.log(e) //エラー
    });



    const start = new Date(2025, 8, 17, 19, 46, 20);
    setInterval(() => {
        const now = new Date();
        let diff = now - start;

        const sec = 1000;
        const min = sec * 60;
        const hour = min * 60;
        const day = hour * 24;

        const days = Math.floor(diff / day);
        diff %= day;

        const hours = Math.floor(diff / hour);
        diff %= hour;

        const minutes = Math.floor(diff / min);
        diff %= min;

        const seconds = Math.floor(diff / sec);

        document.getElementById("timer").innerText = `${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;
    }, 10);
});
