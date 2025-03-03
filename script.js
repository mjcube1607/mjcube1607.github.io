document.addEventListener("DOMContentLoaded", function () {
    const mediumUsername = "mjcube1999"; // Your Medium username
    const rssFeedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;

    fetch(rssFeedUrl)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data); // Debugging: Check if data is received

            if (data.status === "ok") {
                const postsContainer = document.getElementById("medium-posts");

                // Check if posts exist
                if (!data.items || data.items.length === 0) {
                    console.error("No posts found in the API response.");
                    return;
                }

                data.items.slice(0, 5).forEach(item => {
                    const card = document.createElement("div");
                    card.className = "card";

                    card.innerHTML = `
                        <h2>${item.title}</h2>
                        <p>${new Date(item.pubDate).toDateString()}</p>
                        <a href="${item.link}" target="_blank">Read More</a>
                    `;

                    postsContainer.appendChild(card);
                });
            } else {
                console.error("API response status not OK:", data);
            }
        })
        .catch(error => console.error("Error fetching Medium posts:", error));
        
    // Load header
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header-container").innerHTML = data);

    // Load footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-container").innerHTML = data);
});

document.getElementById("dark-mode-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

document.body.classList.add("fade-page");
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/fetch-projects")
        .then(response => response.json())
        .then(data => {
            if (data.projects) {
                const container = document.getElementById("project-list");
                container.innerHTML = ""; // Clear old data

                data.projects.forEach(project => {
                    const projectItem = document.createElement("div");
                    projectItem.classList.add("project");
                    projectItem.innerHTML = `
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    `;
                    container.appendChild(projectItem);
                });
            }
        })
        .catch(error => console.error("Error fetching projects:", error));
});
async function fetchGitHubContributions() {
    const username = "marianbme"; // Replace with your GitHub username
    const url = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await fetch(url);
        const repos = await response.json();

        const contributionsContainer = document.getElementById("github-contributions");
        contributionsContainer.innerHTML = ""; // Clear previous content

        repos.forEach(repo => {
            const repoItem = document.createElement("div");
            repoItem.classList.add("repo");

            repoItem.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || "No description available"}</p>
                <p>⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count}</p>
            `;

            contributionsContainer.appendChild(repoItem);
        });
    } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchGitHubContributions);