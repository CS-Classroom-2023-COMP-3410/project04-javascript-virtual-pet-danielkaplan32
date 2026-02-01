let petStatus = localStorage.getItem("petStatus") || "happy";
let health = parseInt(localStorage.getItem("health")) || 100;

const faceDiv = document.getElementById("face");
const statusText = document.getElementById("status");
const healthText = document.getElementById("health");

// Face moods
const faces = {
  happy: `O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O<br><br>\\________/`,
  sleepy: `~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~<br><br>o`,
  hungry: `0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o<br><br>~~~~~`
};

// Helper for jQuery effect, callback is to execute after animation finish
function animatePet(effectName, callback = null) { 
  $("#pet").effect(effectName, { times: 1 }, 500, callback);
}

function updatePet() {
  faceDiv.innerHTML = faces[petStatus];
  healthText.textContent = `Health: ${health}`;

  if (petStatus === "happy") {
    $("#pet").css("background-color", "lightgreen");
    statusText.textContent = "Mood: Happy";
  } else if (petStatus === "hungry") {
    $("#pet").css("background-color", "khaki");
    statusText.textContent = "Mood: Hungry";
  } else if (petStatus === "sleepy") {
    $("#pet").css("background-color", "lightskyblue");
    statusText.textContent = "Mood: Sleepy";
  }

  localStorage.setItem("petStatus", petStatus);
  localStorage.setItem("health", health);
}

$("#feed").click(() => {
  petStatus = "happy";
  health = Math.min(health + 15, 100);
  animatePet("highlight", updatePet);
});

$("#play").click(() => {
  petStatus = "happy";
  animatePet("bounce", updatePet);
});

$("#sleep").click(() => {
  petStatus = "sleepy";
  health = Math.min(health + 10, 100);
  animatePet("fade", updatePet);
});

// Mood progression every 10 sec
let previousMood = petStatus;

setInterval(() => {
  previousMood = petStatus;

  if (petStatus === "happy") petStatus = "hungry";
  else if (petStatus === "hungry") petStatus = "sleepy";

  if (petStatus !== "happy") health = Math.max(health - 5, 0);

  if (previousMood === "happy" && petStatus === "hungry") animatePet("shake", updatePet);
  else if (previousMood === "hungry" && petStatus === "sleepy") animatePet("pulsate", updatePet);
  else updatePet();
}, 10000);

updatePet();
