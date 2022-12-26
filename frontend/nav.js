const container = document.getElementById("home");

async function getPlayerData() {
    const response = await fetch("/api/data");
    const data = await response.json();
    container.innerHTML = data;
}
