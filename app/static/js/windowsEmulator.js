const startContainer = document.querySelector("#w11-start-section");
const startBtn = document.querySelector("#windows-div");

const widgetContainer = document.querySelector("#widget-section");
const widgetBtn = document.querySelector("#widget-div");
const sweatControlBtn = document.querySelector("#sweatControl-div");

const spegniContainer = document.querySelector("#spegni-section");
const spegniBtn = document.querySelector(".spegni-pc-start-section");
const spegniGif = document.querySelector(".spegni-gif");

const paddingContainer = document.querySelector(".padding-start");
const searchBtn = document.querySelector("#search-div");

const searchContainer = document.querySelector("#search-content");
const footerStartContainer = document.querySelector("#footer-start-section");

const windowsTab = document.querySelector(".windows-tab");

const topPartTab = document.querySelector(".topnavbar-tab");

const closeBtn = document.querySelector("#closeField");
const MaxBtn = document.querySelector("#maxField");
const minBtn = document.querySelector("#minField");

const heightTab = document.querySelector(".coming-soon-tab");

const appIcon = document.querySelectorAll(".app-icon");
const nomeTab = document.querySelector(".nome-tab");
const tabImage = document.querySelector("#tab-image");
const scGeneralContainer = document.querySelector(".sc-general-container");

const nav = document.querySelector("nav");
const iconNav = document.querySelector("#first-container");

const systemInformation = document.querySelector("#sistema-info");
const dateInformation = document.querySelector("#sistema-data");
const notifContainer = document.querySelector("#notification-section");
const sysInfoContainer = document.querySelector("#systemInfo-section");

const accuDiv = document.querySelector("#accuDiv");
const accuInline = document.querySelector("#accuInline");

let vh = window.innerHeight / 100;
let vw = window.innerWidth / 100;

let isTopBarClicked = false;

const div = document.querySelector("#div");

let firstPositionX;
let firstPositionY;

let lastPositionX;
let lastPositionY;

function checkBatteryStatus() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            let batteryLevel = Math.round(battery.level * 100);

            var iconClass;
            if (batteryLevel >= 75) {
                iconClass = 'fa-battery-full';
            } else if (batteryLevel >= 50) {
                iconClass = 'fa-battery-three-quarters';
            } else if (batteryLevel >= 25) {
                iconClass = 'fa-battery-half';
            } else if (batteryLevel > 0) {
                iconClass = 'fa-battery-quarter';
            } else {
                iconClass = 'fa-battery-empty';
            }
            var batteryIcon = document.querySelector('#accuIcon');
            batteryIcon.setAttribute('data-icon', iconClass);

            var chargingStatus = battery.charging ? 'Lädt' : 'Entlädt';
            if (battery.charging === false) {
                if (battery.dischargingTime === Infinity) {
                    var dischargingTime = 26000;
                } else {
                    var dischargingTime = battery.dischargingTime;
                }
                var hours = Math.floor(dischargingTime / 3600);
                var minutes = Math.floor((dischargingTime % 3600) / 60);
                var timeRemaining = hours + 'h ' + minutes + 'min';
                accuDiv.title = 'Akkustand: ' + batteryLevel + '% verbleibend (' + timeRemaining + ')';
                accuInline.innerHTML = 'Akkustand: ' + batteryLevel + '% verbleibend<br>(' + timeRemaining + ')';
            } else {
                accuDiv.title = 'Akkustand: ' + batteryLevel + '% (' + chargingStatus + ')';
                accuInline.innerText = 'Akkustand: ' + batteryLevel + '% (' + chargingStatus + ')';
            }
        });
    }
}
if ('getBattery' in navigator) {} else {
    console.log('Die Battery Status API wird in diesem Browser nicht unterstützt.');
}
setInterval(checkBatteryStatus, 1000);

// from bottom to top WINDOWS START animation
startBtn.addEventListener("click", function () {
  searchContainer.style.display = "none";
  paddingContainer.style.display = "grid";
  footerStartContainer.style.display = "flex";
  openOneWinCloseOther();
});

// from bottom to top WINDOWS START animation
widgetBtn.addEventListener("click", function () {
  if (startContainer.classList.contains("on-visible-start")) {
    startContainer.classList.toggle("on-visible-start");
    widgetContainer.classList.toggle("on-visible-widget");
  } else {
    widgetContainer.classList.toggle("on-visible-widget");
  }
});

// turn off computer
spegniBtn.addEventListener("click", function () {
  spegniContainer.classList.toggle("pc-off");
  setTimeout(function () {
    spegniContainer.style.cursor = "none";
    spegniGif.style.opacity = 0;
    window.close();
  }, 7000);
});

spegniContainer.addEventListener("click", function () {
  spegniContainer.classList.toggle("pc-off");
  spegniContainer.style.cursor = "default";

});

// SEARCH function in beta
searchBtn.addEventListener("click", function () {
  paddingContainer.style.display = "none";
  footerStartContainer.style.display = "none";
  searchContainer.style.display = "grid";
  openOneWinCloseOther();
});

// windows moving tab
topPartTab.addEventListener("mousedown", function () {
  isTopBarClicked = true;
  console.log("mousedown");
  document.onmousemove = function (e) {
    var x = e.clientX;
    var y = e.clientY;
    var MaxWidth = document.documentElement.scrollWidth;
    var MaxX = MaxWidth - windowsTab.offsetWidth;

    if (x <= 0) {
      leftTab();
    } else if (y <= 0) {
      topTab();
    } else if (x >= MaxX) {
      rightTab();
    } else {
      windowsTab.style.transitionDuration = "0s";
      windowsTab.style.left = x + "px";
      windowsTab.style.top = y + "px";
      if (windowsTab.offsetHeight > 90 * vh) {
        windowsTab.style.height = "70vh";
      }
      windowsTab.style.removeProperty("transform");
    }
  };
});

// non mouve più la tab, quando non è necessario
document.addEventListener("mouseup", function () {
  document.onmousemove = null;
});

for (let i = 0; i < appIcon.length; i++) {
    scGeneralContainer.style.display = "none";
    tabImage.style.display = "none";
    appIcon[i].addEventListener("click", function () {
        windowsTab.style.display = "grid";
        let appName = appIcon[i].querySelector("span").textContent;
        if (appName !== 'SweatControl') {
            tabImage.style.display = "grid";
            let appImage = appIcon[i].querySelector("img").src;
            tabImage.src = appImage;
            scGeneralContainer.style.display = "none";
        } else {
            tabImage.style.display = "none";
            scGeneralContainer.style.display = "grid";

        }
        nomeTab.textContent = appName;
    });
}

sweatControlBtn.addEventListener("click", openSweatControl);
document.addEventListener("DOMContentLoaded", openSweatControl);

function openSweatControl() {
    windowsTab.style.display = "grid";
    let appName = 'SweatControl [v'+appVersion+']';
    tabImage.src = "../static/img/sweatControl-small.png";
    tabImage.style.display = "none";
    scGeneralContainer.style.display = "grid";
    nomeTab.textContent = appName;
}

// ein Symbol in der Navigation erstellen und die Registerkarte ausblenden
closeBtn.addEventListener("click", function () {
  windowsTab.style.display = "none";
});

// Erstellt ein Symbol in der Navigation und blendet die Registerkarte aus
minBtn.addEventListener("click", function () {
  windowsTab.style.display = "none";
  /*Element div mit img zu iconNav hinzufügen*/
//  let newDivNav = document.createElement("div");
//  let newImageIconNav = document.createElement("img");
//  newImageIconNav.src = tabImage.src;
//  newDivNav.appendChild(newImageIconNav);
//  iconNav.appendChild(newDivNav);
//  console.log("MINIMIZED TAB");
});

// vergrößert die Registerkarte je nach Bildschirmgröße
MaxBtn.addEventListener("click", function () {
  topTab();
});

// um Systeminfo zu öffnen
systemInformation.addEventListener("click", function () {
  sysInfoContainer.classList.toggle("sysinfo-on");
});

// um Benachrichtigungen zu öffnen
dateInformation.addEventListener("click", function () {
  notifContainer.classList.toggle("notification-on");
});

function leftTab() {
  windowsTab.style.left = 0 + "px";
  windowsTab.style.top = 0 + "px";
  windowsTab.style.removeProperty("right");
  windowsTab.style.removeProperty("transform");
  windowsTab.style.width = "50vw";
  windowsTab.style.height = "calc(100vh - var(--nav-height) - 0.225rem)";
  windowsTab.style.transitionDuration = "0.5s";
  console.log("LEFT TAB");
}

function topTab() {
  windowsTab.style.left = 0 + "px";
  windowsTab.style.top = 0 + "px";
  windowsTab.style.removeProperty("right");
  windowsTab.style.removeProperty("transform");
  windowsTab.style.width = "calc(100vw - 0.2rem)";
  windowsTab.style.height = "calc(100vh - var(--nav-height) - 0.225rem)";
  windowsTab.style.transitionDuration = "0.5s";
  console.log("TOP TAB");
}

function rightTab() {
  windowsTab.style.transform = "translateX(99%)";
  windowsTab.style.left = 0 + "px";
  windowsTab.style.top = 0 + "px";
  windowsTab.style.removeProperty("right");
  windowsTab.style.width = "50vw";
  windowsTab.style.height = "calc(100vh - var(--nav-height) - 0.225rem)";
  windowsTab.style.transitionDuration = "0.5s";
  console.log("RIGHT TAB");
}

// funzione per aprire una finestra e chiuderne l'altra (se c'è)
function openOneWinCloseOther() {
  if (widgetContainer.classList.contains("on-visible-widget")) {
    widgetContainer.classList.toggle("on-visible-widget");
    startContainer.classList.toggle("on-visible-start");
  } else {
    startContainer.classList.toggle("on-visible-start");
  }
}

// crea un selezionatore provissorio a seconda della tua posizione del mouse
function dragSelectorLogic() {
  // tutta la funzione inizia dopo il mouse è cliccato
  document.addEventListener("mousedown", function (e1) {
    if (windowsTab.style.display == "grid") {
      // se la tab è visibile, allora la funzione NON è attiva
    } else {
      // se START è visibile, allora si chiude in automatico
      if (
        e1.target.closest("#w11-start-section") != startContainer &&
        startContainer.classList.contains("on-visible-start") &&
        e1.target.closest("nav") != nav
      ) {
        startContainer.classList.remove("on-visible-start");
        dragSelectorCode();
      } // se WIDGET è visibile, allora si chiude in automatico
      else if (
        e1.target.closest("#widget-section") != widgetContainer &&
        widgetContainer.classList.contains("on-visible-widget") &&
        e1.target.closest("nav") != nav
      ) {
        widgetContainer.classList.remove("on-visible-widget");
        dragSelectorCode();
      } // wenn NOTIFICATIONS sichtbar ist, wird es automatisch geschlossen
      else if (
        e1.target.closest("#systemInfo-section") != notifContainer &&
        notifContainer.classList.contains("notification-on") &&
        e1.target.closest("nav") != nav
      ) {
        notifContainer.classList.remove("notification-on");
        dragSelectorCode();
      } // Wenn Sie Drag innerhalb von START, WIDGETS oder NOTIFICATIONS verwenden, ist die Funktion NICHT aktiv.
      else if (
        e1.target.closest("#w11-start-section") == startContainer ||
        e1.target.closest("#notification-section") == notifContainer ||
        e1.target.closest("#systemInfo-section") == sysInfoContainer ||
        e1.target.closest("#widget-section") == widgetContainer
      ) {
        console.log("You can't drag the tab here!");
      } // altrimenti, la funzione è attiva
      else {
        dragSelectorCode();
      }
    }

    function dragSelectorCode() {
      // preseting del selezionatore
      div.style.display = "block";

      div.style.width = 0 + "px";
      div.style.height = 0 + "px";

      firstPositionX = e1.clientX;
      firstPositionY = e1.clientY;

      div.style.top = firstPositionY + "px";
      div.style.left = firstPositionX + "px";

      div.style.transition = "none";

      document.addEventListener("mousemove", function (e2) {
        lastPositionX = e2.clientX;
        lastPositionY = e2.clientY;

        // se la posizione X del mouse è cambiata, allora si aggiorna la posizione del selezionatore
        // ingrandisce il selezionatore
        if (firstPositionX - lastPositionX < 0) {
          div.style.width = Math.round(lastPositionX - firstPositionX) + "px";
        } // sposta il selezionatore, ma visivamente lo ingrandisce a sinistra (è un trick interressante)
        else {
          div.style.width = Math.round(firstPositionX - lastPositionX) + "px";
          div.style.left = lastPositionX + "px";
        }

        // se la posizione Y del mouse è cambiata, allora si aggiorna la posizione del selezionatore
        // ingrandisce il selezionatore
        if (firstPositionY - lastPositionY < 0) {
          div.style.height = Math.round(lastPositionY - firstPositionY) + "px";
        } // sposta il selezionatore, ma visivamente lo ingrandisce in alto (è un trick interressante)
        else {
          div.style.height = Math.round(firstPositionY - lastPositionY) + "px";
          div.style.top = lastPositionY + "px";
        }
      });

      // una volta che non si clicca più, si chiude il selezionatore
      // resettando prima con un'animazione
      // poi togliendo il selezionatore (che è un div invisibile)
      document.addEventListener("mouseup", function () {
        div.style.width = "0px";
        div.style.height = "0px";
        div.style.transition = "all 0.3s";

        // aspetta che prima finisca l'animazione poi rimuove il selezionatore
        setTimeout(function () {
          div.style.display = "none";
        }, 300);
      });
    }
  });
}

// ottenere l'ora corrente
function getDate() {
  let DataAttuale = new Date();

  let giorno = DataAttuale.getDate();
  let mese = DataAttuale.getMonth() + 1; // mese parte da 0
  let anno = DataAttuale.getFullYear();

  let ora = DataAttuale.getHours();
  let minuti = DataAttuale.getMinutes();

  let orarioContainer = document.getElementById("orario-data");
  let calendarioContainer = document.getElementById("calendario-data");

  // se l'ora/minuti è meno di 10, allora si aggiunge uno 0 prima
  if (ora < 10 && minuti < 10) {
    orarioContainer.innerHTML = "0" + ora + ":" + "0" + minuti;
  } else if (ora < 10) {
    orarioContainer.innerHTML = "0" + ora + ":" + minuti;
  } else if (minuti < 10) {
    orarioContainer.innerHTML = ora + ":" + "0" + minuti;
  } else {
    orarioContainer.innerHTML = ora + ":" + minuti;
  }

  // se il giorno/mese è meno di 10, allora si aggiunge uno 0 prima
  if (giorno < 10 && mese < 10) {
    calendarioContainer.innerHTML =
      "0" + giorno + "." + "0" + mese + "." + anno;
  } else if (giorno < 10) {
    calendarioContainer.innerHTML = "0" + giorno + "." + mese + "." + anno;
  } else if (mese < 10) {
    calendarioContainer.innerHTML = giorno + "." + "0" + mese + "." + anno;
  } else {
    calendarioContainer.innerHTML = giorno + "." + mese + "." + anno;
  }

  document.getElementById("sistema-data").title =
    orarioContainer.innerHTML + "  " + calendarioContainer.innerHTML;

  // ogni minuto si aggiunge l'ora
  // 1000 = 1 secondo... 1000 * 60 = 60000... 60000 = 1 minuto
  setTimeout(function () {
    getDate();
  }, 60000); // 60 secondi
}

// le funzione chiamate sono inizializzate in queste funzioni
dragSelectorLogic();
getDate();

function DispositivoNonSupportato() {
  let AttualeWidthContainer = document.getElementById("width-attuale");
  let AttualeHeightContainer = document.getElementById("height-attuale");

  let widthSpiegazione = document.getElementById("width-spiegazione");
  let heightSpiegazione = document.getElementById("height-spiegazione");

  checkSopporto();

  window.addEventListener("resize", function () {
    checkSopporto();
  });

  function checkSopporto() {
    // se la larghezza è inferiore a 800px, allora si mostra la spiegazione
    if (window.innerWidth < 800) {
      widthSpiegazione.innerHTML =
        "Fenster zu schmal: Du benötigst <b>800px</b>" +
        "   " +
        "für die Anzeige dieser Seite";
      AttualeWidthContainer.innerHTML = window.innerWidth + "px";
      widthSpiegazione.style.color = "rgb(255, 0, 47)";
    } else {
      widthSpiegazione.innerHTML = "Deine Bildschirmbreite ist ausreichend!";
      AttualeWidthContainer.innerHTML = "";
      widthSpiegazione.style.color = "rgb(0, 255, 157)";
    }

    // se l'altezza è inferiore a 600px, allora si mostra la spiegazione
    if (window.innerHeight < 600) {
      heightSpiegazione.innerHTML =
        "Fenster zu niedrig: Du benötigst <b>600px</b>" +
        "   " +
        "für die Anzeige dieser Seite";
      AttualeHeightContainer.innerHTML = window.innerHeight + "px";
      heightSpiegazione.style.color = "rgb(255, 0, 47)";
    } else {
      heightSpiegazione.innerHTML = "Deine Bildschirmhöhe ist ausreichend!";
      AttualeHeightContainer.innerHTML = "";
      heightSpiegazione.style.color = "rgb(0, 255, 157)";
    }
  }
}

DispositivoNonSupportato();
