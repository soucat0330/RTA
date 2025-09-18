window.addEventListener("load", () => {
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
