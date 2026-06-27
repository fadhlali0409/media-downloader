async function downloadVideo() {
    const url = document.getElementById("url").value;
    const status = document.getElementById("status");

    status.innerText = "جاري التحميل...";

    const res = await fetch("/download", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (data.success) {
        status.innerHTML = "تم التحميل ✔️: " + data.file;
    } else {
        status.innerHTML = "خطأ: " + data.error;
    }
}
