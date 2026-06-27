async function downloadVideo() {
    const url = document.getElementById("url").value;
    const status = document.getElementById("status");

    if (!url) {
        status.innerText = "⚠️ Please enter a URL";
        return;
    }

    status.innerText = "⏳ Downloading...";

    try {
        const response = await fetch("/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();

        if (data.success) {
            status.innerHTML = `✅ Download ready: ${data.title}`;
        } else {
            status.innerHTML = `❌ Error: ${data.error}`;
        }

    } catch (err) {
        status.innerText = "❌ Server error";
    }
}
