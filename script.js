document.addEventListener("DOMContentLoaded", function () {
    const mediumUsername = "mjcube1999"; // Replace with your Medium username
    const rssFeedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;

    fetch(rssFeedUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === "ok") {
                const postsContainer = document.getElementById("medium-posts");
                data.items.slice(0, 5).forEach(item => {
                    const card = document.createElement("div");
                    card.className = "card";

                    card.innerHTML = `
                        <h2>${item.title}</h2>
                        <p>${item.pubDate.split(" ")[0]}</p>
                        <a href="${item.link}" target="_blank">Read More</a>
                    `;

                    postsContainer.appendChild(card);
                });
            }
        })
        .catch(error => console.error("Error fetching Medium posts:", error));
});