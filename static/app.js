const button = document.getElementById("downloadBtn");

button.addEventListener("click", async () => {

    const url = document.getElementById("url").value.trim();

    if (!url) {
        alert("Paste a video link first.");
        return;
    }

    button.innerHTML = "Loading...";

    try {

        const response = await fetch("/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url
            })
        });

        const data = await response.json();

        if (data.success) {

            document.getElementById("result").innerHTML = `
                <div style="background:#11233d;padding:25px;border-radius:16px;margin-top:30px;">
                    <h2>${data.title}</h2>
                    <br>
                    <a href="/file/${data.file}">
                        <button style="padding:15px 30px;background:#1EA7FF;border:none;border-radius:10px;color:white;font-size:16px;cursor:pointer;">
                            Download Video
                        </button>
                    </a>
                </div>
            `;

        } else {

            alert(data.error);

        }

    } catch (e) {

        alert("Connection error.");

    }

    button.innerHTML = "Download";

});
