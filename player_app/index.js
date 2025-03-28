const socket = io("http://localhost:5050", { path: "/rea-time" });

const divEsperaScreen = document.getElementById("screen-espera");
const divRegistro = document.getElementById("registro");
const divAsignaRol = document.getElementById("asignaRol").style.display = "none";
const divMensajeDia = document.getElementById("mensajeDia").style.display = "none";
const divMensajeNoche = document.getElementById("mensajeNoche").style.display = "none"; 
const inputNombreDeUsuario = document.getElementById("nombreDeUsuario");

let idPlayer ;
let rolPlayer;
let namePlayer;

const btn = document.getElementById("registro-usuario").addEventListener("click", enviarJugador);


function enviarJugador() {
  
    fetch("http://localhost:5050/join-game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: inputNombreDeUsuario.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
  
        idPlayer = data.player.id;
        username = data.player.name;
        playerRole = data.player.rol;
        const players = data.numberOfPlayers;
  
        divRegistro.style.display = "flex"; 
  
      
        inputNombreDeUsuario.innerHTML = namePlayer;
        divAsignaRol.innerHTML = `Tú eres ${rolPlayer}`;
  
        inputNombreDeUsuario.style.display = "none";
        btn.style.display = "none";
  
        if (players === 4) {
          startGame();
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  function startGame() {
    console.log("llegaste a StartGame!");
  
    fetch("http://localhost:5051/start-game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: "The Game Starts!",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => console.error("Error:", error));
  }
   



socket.on("notificar-dia", (data) => {
  
});

socket.on("notificar-noche", (data) => {
  
});
