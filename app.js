const playerByName = (name) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`)
    .then((res) => res.json())
    .then((players) => {
      if (players.player) {
        displayPlayer(players.player);
      } else {
        document.getElementById(
          "allPlayers"
        ).innerHTML = `<h6 class="m-auto">Please enter a valid query!</h6>`;
      }
    });
};
playerByName("k");
const search = () => {
  const name = document.getElementById("inputType").value;
  playerByName(name);
};
function handleKeyDown(event) {
  if (event.key === "Enter") {
    search();
  }
}
const displayPlayer = (players) => {
  const playerContainer = document.getElementById("allPlayers");

  playerContainer.innerHTML = "";

  let html = "";

  players.forEach((play) => {
    const playerThumb =
      play.strThumb ||
      (play.strGender === "Female"
        ? "image/female-demo.png"
        : "image/male-demo.png");
    const playerName = play.strPlayer || "Name not available";
    // const playerId = play.idPlayer || "ID not available";
    const playerNationality =
      play.strNationality || "Nationality not available";
    const playerSport = play.strSport || "Sport not available";
    const playerTeam = play.strTeam || "Team not available";
    const playerWage = play.strWage || "Wage not available";
    const playerGender = play.strGender || "Gender not available";
    const playerDescription = play.strDescriptionEN
      ? play.strDescriptionEN.slice(0, 60)
      : "Description Unavailable";
    
     const playerFb = play.strFacebook
       ? `<a href="https://${play.strFacebook}" target="_blank" class="text-decoration-none">
             <i class="fab fa-facebook-square fs-3 text-primary"></i>
           </a>`
       : `<i class="fab fa-facebook-square fs-3 text-secondary"></i>`;
     const playerTw = play.strTwitter
       ? `<a href="https://${play.strTwitter}" target="_blank" class="text-decoration-none">
             <i class="fab fa-twitter-square fs-3 text-info"></i>
           </a>`
       : `<i class="fab fa-twitter-square fs-3 text-secondary"></i>`;
     const playerInsta = play.strInstagram
       ? `<a href="https://${play.strInstagram}" target="_blank" class="text-decoration-none">
             <i class="fab fa-instagram-square fs-3 text-danger"></i>
           </a>`
       : `<i class="fab fa-instagram-square fs-3 text-secondary"></i>`;

    html += `
        <div class="player-card"">
            <img class="card-img" src="${playerThumb}" alt="${playerName}">
            <h4>Name: ${playerName}</h4>
            <h6>Nationality: ${playerNationality}</h6>
            <h6>Sport: ${playerSport}</h6>
            <h6>Team: ${playerTeam}</h6>
            <h6>Wage: ${playerWage}</h6>
            <h6>Gender: ${playerGender}</h6>
            <p>
              ${playerFb}
              ${playerTw}
              ${playerInsta}
            </p>
            <p>${playerDescription}...</p>
            <div class="card-buttons">
                <button class="card-grp-btn mb-1 border-0 text-light rounded-2 p-1 px-2" 
                        onclick="event.stopPropagation(); addToGroup('${playerName}', this)">
                    Add to Group
                </button>
                <button 
                    class="card-d-btn mb-1 border-0 rounded-2 p-1" 
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal" 
                    onclick="viewDetails(${play.idPlayer})">
                    Details
                </button>
            </div>
        </div>
        `;
  });

  playerContainer.innerHTML = html;
};
const viewDetails = (id) => {
  fetch(`https://www.thesportsdb.com//api/v1/json/3/lookupplayer.php?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const play = data.players[0];
      document.getElementById(
        "modalTitle"
      ).textContent = `Details of ${play.strPlayer}`;
      const playerThumb =
        play.strThumb ||
        (play.strGender === "Female"
          ? "image/female-demo.png"
          : "image/male-demo.png");
      const playerName = play.strPlayer || "Name not available";
      const playerId = play.idPlayer ;
      const playerNationality =
        play.strNationality || "Nationality not available";
      const playerSport = play.strSport || "Sport not available";
      const playerTeam = play.strTeam || "Team not available";
      const playerWage = play.strWage || "Wage not available";
      const playerGender = play.strGender || "Gender not available";
      const playerDescription = play.strDescriptionEN
        ? play.strDescriptionEN.slice(0, 200)
        : "Description not available";
      const playerFb = play.strFacebook
        ? `<a href="https://${play.strFacebook}" target="_blank" class="text-decoration-none">
             <i class="fab fa-facebook-square fa-lg text-primary"></i>
           </a>`
        : `<i class="fab fa-facebook-square fa-lg text-secondary"></i>`;
      const playerTw = play.strTwitter
        ? `<a href="https://${play.strTwitter}" target="_blank" class="text-decoration-none">
             <i class="fab fa-twitter-square fa-lg text-info"></i>
           </a>`
        : `<i class="fab fa-twitter-square fa-lg text-secondary"></i>`;
      const playerInsta = play.strInstagram
        ? `<a href="https://${play.strInstagram}" target="_blank" class="text-decoration-none">
             <i class="fab fa-instagram-square fa-lg text-danger"></i>
           </a>`
        : `<i class="fab fa-instagram-square fa-lg text-secondary"></i>`;

      document.getElementById(
        "modalTitle"
      ).textContent = `Details of ${playerName}`;
      
      document.getElementById("modalBody").innerHTML = `
        <img class="card-img-details mb-3" src="${playerThumb}" alt="${playerName}">
        <h6>ID: ${playerId}</h6>
        <h6>Nationality: ${playerNationality}</h6>
        <h6>Sport: ${playerSport}</h6>
        <h6>Team: ${playerTeam}</h6>
        <h6>Wage: ${playerWage}</h6>
        <h6>Gender: ${playerGender}</h6>
        <p>
          ${playerFb}
          ${playerTw}
          ${playerInsta}
        </p>
        <p>${playerDescription}...</p>
      `;
    });
};

let groupMemberCount = 0;
const addToGroup = (name, button) => {
  if (groupMemberCount >= 11) {
    alert("The group is already full.");
    return;
  }

  console.log(`Player with name ${name} added to the group.`);
  const cart = document.getElementById("myCart");
  if (groupMemberCount === 0) {
    let html = document.createElement("h6");
    html.innerHTML = "Player Name: ";
    cart.appendChild(html);
  }
  const listItem = document.createElement("li");
  listItem.textContent = name;
  cart.appendChild(listItem);
  groupMemberCount++;
  document.getElementById("memberCount").textContent = groupMemberCount;

  button.textContent = "Already Added";
  button.disabled = true;
  button.classList.add("added-btn");
};
