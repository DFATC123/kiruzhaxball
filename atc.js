document.head.appendChild(Object.assign(document.createElement("style"), { innerHTML: "#thumb,body{touch-action:none}body{user-select:none;height:100%}@media only screen and (max-device-width:480px){body{touch-action:manipulation}}.header,.rightbar{display:none!important}.rounded{border:none;border-radius:50%}[view|=hidden]{display:none}[view|=visible]{display:flex;justify-content:center;align-items:center}[float]{position:absolute}svg{fill:#ecf0f3cc;width:30px;height:auto}#kick svg{width:50%}" }));
document.querySelector('.gameframe').contentWindow.document.head.appendChild(Object.assign(document.createElement("style"), { innerHTML: ".room-view,.roomlist-view{height:100%;margin-top:0}.game-view>.top-section,.room-view{margin-top:0}.settings-view{width:100%;max-height:none}.game-view>[data-hook=popups]{background-color:#1a212585}.disconnected-view .dialog,.disconnected-view .room-view>.container{width:450px}.create-room-view>.dialog,.room-view.create-room-view>.container{max-width:450px;width:100%}body{background:#1a2125}[data-hook=leave-btn]{background:#c13535!important}.file-btn,[data-hook=rec-btn]{display:none!important}h1{text-align:center}.room-view>.container>.header-btns{bottom:0;right:10px;top:auto}.room-view>.container{max-width:none;max-height:max-content}.room-view{position:absolute;width:100%}.roomlist-view>.dialog{max-width:max-content;max-height:max-content}.game-state-view .bar>.scoreboard{display:flex;align-items:center;margin-right:50px}.chatbox-view{position:absolute;left:15px;margin:0;top:10px;width:30%;pointer-events:none;font-size:1rem;display:contents}.chatbox-view-contents{flex-direction:column-reverse;background:0 0;pointer-events:none}.chatbox-view-contents>.input{margin-bottom:10px;pointer-events:auto}.chatbox-view-contents>.log{flex-direction:column;pointer-events:none;overflow-y:scroll;scrollbar-width:none}.settings-view .section.selected{display:flex;align-items:center}.log-contents{display:flex;flex-direction:column-reverse;text-shadow:1px 1px 5px #000000cc}.fade-out{opacity:0;transition:opacity 10s ease-out}thead tr{display:table-row!important}svg{width: 1em}.input-options{position: absolute;width: 100%;height: 100%;z-index: 20;background-color: #1a2125;}" }));

if(!localStorage.getItem('low_latency_canvas') || localStorage.getItem('low_latency_canvas') == 1){
    localStorage.setItem('low_latency_canvas',0)
    location.reload();
}

///////////////////////////////////////// CONSTANTS /////////////////////////////////////////
let gameFrame = document.querySelector('.gameframe').contentWindow;
let body;

const tips = [
    "Tip: maintain a good defensive position.",
    "Tip: communicate and coordinate with your teammates.",
    "Tip: practice your dribbling skills to outplay opponents.",
    "Tip: learn to anticipate the movements of the ball and players.",
    "Tip: don't rush when shooting; find the right moment.",
    "Tip: control your speed to maintain ball control.",
    "Tip: use rebounds off walls to surprise opponents.",
    "Tip: adapt your strategy based on team size and game mode.",
    "Tip: be patient in defense and wait for the right moment to attack.",
    "Tip: practice synchronization in passes and shots with your team.",
    "Tip: maintain a balance between offense and defense.",
    "Tip: study your opponents' playing style to anticipate their moves.",
    "Tip: avoid standing still; move constantly to be unpredictable.",
    "Tip: keep an eye on your teammates' positions to facilitate passes.",
    "Tip: be aware of the remaining time and adjust your strategy accordingly.",
    "Tip: learn to use rebounds in the corners to create opportunities.",
    "Tip: be a versatile player, capable of playing different roles in the team.",
    "Tip: avoid constantly colliding with teammates; maintain space.",
    "Tip: use the chat to quickly coordinate tactics with your team.",
    "Tip: analyze your mistakes and learn from them to improve your game.",
    "Tip: watch matches of experienced players to learn new strategies.",
    "Tip: do not underestimate the importance of a good pass; it can change the course of the game.",
    "Tip: stay calm in pressure situations; concentration is key.",
    "Tip: play regularly to improve your consistency and skills.",
    "Tip: coordinate pressing strategies with your teammates to force errors in the opposing team.",
    "Tip: be a fair player; respect is fundamental.",
    "Tip: adapt your playing style based on the number of players on the field.",
    "Tip: don't be afraid to try new tactics and adjust your approach.",
    "Tip: be aware of your own goalkeeper's position to avoid own goals.",
    "Tip: use wall rebounds to make unexpected shots.",
    "Tip: learn to read the plays of the opposing team to anticipate their movements.",
    "Tip: have fun and enjoy the game; a positive attitude enhances performance."
];

const constrolsStyleBase = `
#joystick,#kick{z-index:100;bottom:CONTROLS_MARGINvw}
.neo{
  opacity:CONTROLS_OPACITY;
  background-color:JOY_BG;
  border:2px solid JOY_BORDER;
  box-shadow:6px 6px 10px 0 #a5abb133,-5px -5px 9px 0 #a5abb133;
  color:#dedede55;font-weight:bolder;font-size:1.5rem
}
.sizer{width:CONTROLS_WIDTH%;aspect-ratio:1/1;}
#joystick{left:CONTROLS_MARGIN%;overflow:visible}
#thumb{
  width:40%;height:40%;
  background-color:THUMB_BG;
  border:2px solid THUMB_BORDER;
  box-sizing:border-box;
}
#kick{
  right:CONTROLS_MARGIN%;
  background-color:KICK_BG;
  border:2px solid KICK_BORDER;
}
#kick svg{fill:KICK_ICON;}
button.neo:active{opacity:KICK_OPACITY}
`;

const DEFAULT_COLORS = {
  joyBg:     "#c2c2c255",
  joyBorder: "#c2c2c255",
  thumbBg:   "#ecf0f3cc",
  thumbBorder:"#ecf0f3cc",
  kickBg:    "#c2c2c255",
  kickBorder:"#c2c2c255",
  kickIcon:  "#ecf0f3cc"
};

const COLOR_LABELS = {
  joyBg: "Nền Joystick",
  joyBorder: "Viền Joystick",
  thumbBg: "Nền Núm (Thumb)",
  thumbBorder: "Viền Núm",
  kickBg: "Nền Nút Đá",
  kickBorder: "Viền Nút Đá",
  kickIcon: "Icon Nút Đá"
};

const PRESET_COLORS = [
  "#c2c2c255", "#ecf0f3cc", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff",
  "#1a2125", "#ffffff", "#ff9800", "#4caf50", "#2196f3", "#e91e63", "#9c27b0", "#000000"
];

const countryFilterHandler = document.createElement('style');
const hideButtons = document.createElement('style');

hideButtons.innerHTML = "button{display:none}";
gameFrame.document.head.appendChild(hideButtons);

const controlsHandler = document.createElement('style');
const copyrightHandler = document.createElement("span");
const aboutHandler = document.createElement("div");
const inputOptionsHandler = document.createElement("div");
const config = { childList: true, subtree: true };

///////////////////////////////////////// VARIABLES /////////////////////////////////////////
let firstTime = true;
let canResetJoystick = true;
let lastMessage;
let joystick;
let kickButton;
let floatingBtn;

///////////////////////////////////////// MAIN /////////////////////////////////////////
var checkLoaderInterval = setInterval(checkLoader, 1000);

function checkLoader() {
    if (!gameFrame.document.body.querySelector(".loader-view") && gameFrame.document.body.querySelector('.choose-nickname-view')) {
        clearInterval(checkLoaderInterval);
        body = gameFrame.document.body.children[0];
        init();
    }
}

function init() {
    document.querySelector('.rightbar').remove();
    document.querySelector('.header').remove();
    document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0');

    setupCountryFilter();
    setupControls();
    setupCopyright(true);
    hideButtons.remove();

    const observer = new MutationObserver(function(mutationsList, observer) {
        try {
            updateUI();
            updatedChat();
        } catch {}
    });
    try { updateUI() } catch {}
    observer.observe(body, config);

    gameFrame.head.innerHTML += "<style>button{display: }</style>";
    aboutHandler.setAttribute('data-hook', 'about');
    aboutHandler.style.cssText = 'background: #1a2125; position: absolute; width: 100%; height: 100%; display: none; justify-content: center; flex-direction: column; align-items: center; margin: 0; z-index: 999;';
    aboutHandler.innerHTML = '<div class="dialog basic-dialog" style="max-width: 80%;"><h1>About</h1><p>Bản Mod bởi Kiruz.</p><p>Gốc được phát triển bởi Vixel Dev và Mario Carbajal (@basro).</p><div class="buttons"><button data-hook="closeabout">Close</button></div></div>';

    body.parentNode.appendChild(aboutHandler);
    if (localStorage.getItem("firstTime") === null) {
        aboutHandler.style.display = 'flex';
        localStorage.setItem("firstTime", true)
        localStorage.setItem("view_mode", 1)
        localStorage.setItem("resolution_scale", 0.75)
    }
    body.parentNode.querySelector('[data-hook="closeabout"]').addEventListener("click", function() {
        aboutHandler.style.display = 'none';
    });
}

///////////////////////////////////////// UTILS /////////////////////////////////////////
function insertAfter(e, n) { e.parentNode.insertBefore(n, e.nextSibling); }
function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function getByDataHook(dataHook) { return body.querySelector('[data-hook="' + dataHook + '"]'); }
function openHaxballURL(uri) {
    const code = uri.replace(/^https?:\/\/(www\.)?haxball\.com\/play\?c=/, "");
    if (code.length > 0) window.location.replace("https://www.haxball.com/play?c=" + code);
}
function searchRoomlist() {
    const searchValue = getByDataHook('search').value.toLowerCase();
    body.querySelectorAll('tr').forEach(row => {
        const spanName = row.querySelector('span[data-hook="name"]');
        if (spanName && !spanName.textContent.toLowerCase().includes(searchValue)) row.style.display = 'none'
        else row.removeAttribute("style");
    });
}

///////////////////////////////////////// UI /////////////////////////////////////////
function setupCountryFilter() {
    countryFilterHandler.innerHTML = "";
    countryFilterHandler.name = "stylesheet";
    gameFrame.document.head.appendChild(countryFilterHandler);
}
function setupCopyright() {
    copyrightHandler.setAttribute("data-hook", "copyright");
    copyrightHandler.setAttribute("style", "text-align:center;position:absolute;bottom:15px;width:100%; display: block; z-index: 10;");
    copyrightHandler.innerHTML = '2026 Kiruz Mod. Original game by Mario Carbajal (@basro)';
    document.body.appendChild(copyrightHandler);
}
function copyright(s) { copyrightHandler.style.display = s ? "block" : "none"; }

function updateUI() {
    if (body.querySelector('.choose-nickname-view')) {
        showControls(false); copyright(true);
    }
    if (body.querySelector('.roomlist-view')) {
        copyright(false); firstTime = true;
        if (!getByDataHook('search')) createSearchbar();
        if (!getByDataHook('url-room')) createURLButton();
        if (!getByDataHook('fil-cou')) createCountryButton();
        if (!getByDataHook('aboutbtn')) createAboutButton();
        if (getByDataHook('count')) getByDataHook('count').remove();
        showControls(false);
    } else if (body.querySelector('.create-room-view')) {
        copyright(true); showControls(false);
    } else if (body.querySelector('.settings-view')) {
        copyright(false);
        if (inputOptionsHandler.getAttribute("hidden") != null) showControls(false);
        try {
            const videoSec = getByDataHook('videosec')
            if (videoSec.children.length == 10) {
                videoSec.lastChild.remove(); videoSec.lastChild.remove(); videoSec.lastChild.remove();
            }
        } catch {}
        if (!getByDataHook('newinputbtn')) createInputButton();
        canResetJoystick = true;
    } else if (body.querySelector('.g-recaptcha-response')) {
        copyright(false); showControls(false); resetJoystick(); canResetJoystick = true;
    } else if (body.querySelector('.game-view') && !body.querySelector('.room-view')) {
        if (canResetJoystick) {
            copyright(false); showControls(true); setupGameUI(); resetJoystick(); canResetJoystick = false;
        }
    } else if (body.querySelector('.game-view') && !body.querySelector('.room-link-view')) {
        copyright(false); showControls(false);
        if (!getByDataHook('store')) createStoreButton();
        setupGameUI(); resetJoystick(); canResetJoystick = true;
    } else if (body.querySelector('.room-link-view')) {
        showControls(false);
        if (!getByDataHook('share')) createShareButton();
        canResetJoystick = true;
    }
}

function createInputButton() {
    var el = getByDataHook('inputbtn');
    if (!el) return;
    var elClone = el.cloneNode(true);
    elClone.setAttribute("data-hook", "newinputbtn")
    elClone.addEventListener("click", function() {
        showControls(true); inputOptionsHandler.removeAttribute("hidden"); resetJoystick();
    });
    el.parentNode.replaceChild(elClone, el);
}
function createShareButton() {
    let share = document.createElement("button");
    share.setAttribute("data-hook", "share");
    share.innerHTML = 'Share';
    insertAfter(getByDataHook('copy'), share);
    share.addEventListener("click", function() { console.log("SHARE_MESSAGE🎮⚽️ Join my Haxball Mobile room by copying and pasting the following link: " + getByDataHook('link').value) });
}
function createStoreButton() {
    let store = document.createElement("button");
    store.setAttribute("data-hook", "store");
    store.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 407 407" fill="white" style="height:0.85em; width: auto"><path d="M402 84 323 5c-3-3-7-5-12-5H17C8 0 0 8 0 17v373c0 9 8 17 17 17h373c9 0 17-8 17-17V96c0-4-2-9-5-12zm-101 80H67V39h234v125z"></path><path d="M214 148h43c3 0 6-2 6-6V60c0-4-3-6-6-6h-43c-3 0-6 2-6 6v82c0 4 3 6 6 6z"></path></svg> Store';
    insertAfter(getByDataHook('rec-btn'), store);
    store.addEventListener("click", function() { prefabMessage("/store") });
}
function createSearchbar() {
    const inputContainer = document.createElement("div");
    inputContainer.className = "label-input";
    inputContainer.style.backgroundColor = "transparent";
    inputContainer.innerHTML = '<label>Search a room:</label><input data-hook="search" type="text">';
    const dialog = body.querySelector("div.dialog");
    const secondParagraph = dialog.querySelector("p:nth-child(2)");
    insertAfter(secondParagraph, inputContainer);
    secondParagraph.innerHTML = pickRandom(tips);
    inputContainer.querySelector('input').addEventListener("input", searchRoomlist);
}
function createURLButton() {
    let button = document.createElement("button");
    button.setAttribute("data-hook", "url-room");
    button.innerHTML = '<i class="icon-link"></i><div>URL Room</div>';
    button.addEventListener("click", function() {
        if (!body.querySelector('[data-hook="input-url"]')) {
            let urlForm = document.createElement("form");
            urlForm.action = "javascript:void(0);";
            urlForm.innerHTML = '<div class="label-input" style="background-color: transparent"><label>URL:</label><input data-hook="input-url" type="url"></div>';
            insertAfter(body.querySelector("div.dialog > p:nth-child(2)"), urlForm)
            getByDataHook('search').parentNode.style.display = "none";
            getByDataHook('input-url').focus();
            getByDataHook('input-url').addEventListener('blur', function() {
                getByDataHook('search').parentNode.style.display = "flex"; urlForm.remove()
            })
            urlForm.addEventListener('submit', function() { openHaxballURL(getByDataHook('input-url').value) })
        }
    });
    insertAfter(getByDataHook('join'), button)
}
function createAboutButton() {
    let button = document.createElement("button");
    button.setAttribute("data-hook", "aboutbtn");
    button.innerHTML = '<i class="icon-attention"></i><div>About us</div>';
    button.addEventListener("click", function() { aboutHandler.style.display = 'flex'; });
    insertAfter(body.querySelector(".buttons .spacer"), button)
}
function filterCountries(button) {
    const geoData = localStorage.getItem('geo_override') || localStorage.getItem('geo');
    if (geoData) {
        const code = JSON.parse(geoData)['code'];
        const iconClass = button.lastChild.getAttribute("class");
        if (iconClass === "icon-cancel") {
            button.lastChild.setAttribute("class", "icon-ok");
            countryFilterHandler.innerHTML = ""
        } else {
            button.lastChild.setAttribute("class", "icon-cancel");
            countryFilterHandler.innerHTML = "tr:not(:has(div.f-" + code + ")){display: none;}";
        }
        getByDataHook('listscroll').scrollTop = 0;
    }
}
function createCountryButton() {
    let button = document.createElement("span");
    button.setAttribute("class", "bool");
    button.setAttribute("data-hook", "fil-cou");
    button.innerHTML = 'Show other countries <i class="icon-ok"></i>';
    countryFilterHandler.innerHTML = "";
    button.addEventListener("click", function() { filterCountries(button) });
    body.querySelector('.filters').prepend(button);
}
function setupGameUI() {
    const chat = body.querySelector('.chatbox-view');
    if (!getByDataHook('chat-toggle')) {
        const button = document.createElement("button");
        button.setAttribute("data-hook", "chat-toggle");
        button.setAttribute("style", "display: flex; justify-content: center; align-items: center;");
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="white" d="M5.8 12.2V6H2C.9 6 0 6.9 0 8v6c0 1.1.9 2 2 2h1v3l3-3h5c1.1 0 2-.9 2-2v-1.82a.943.943 0 0 1-.2.021h-7zM18 1H9c-1.1 0-2 .9-2 2v8h7l3 3v-3h1c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2"/></svg>';
        button.addEventListener("click", chatToggle);
        body.querySelector('.sound-button-container').parentNode.prepend(button);
    }
    if (firstTime) {
        body.querySelector('.drag').remove();
        body.querySelector('.stats-view-container').style.cssText = "display: none;";
        getByDataHook('log-contents').firstChild.remove();
        getByDataHook('menu').innerHTML = '<i class="icon-menu"></i>';
        const inputStyle = chat.querySelector('.input').style;
        inputStyle.display = 'none';
        chat.querySelector('input').addEventListener('blur', function() { inputStyle.display = 'none'; });
        firstTime = false;
    }
}

///////////////////////////////////////// CHAT /////////////////////////////////////////
function prefabMessage(msg) {
    const input = body.querySelector('.chatbox-view').querySelector('input');
    input.focus(); input.value = msg;
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true, keyCode: 13, which: 13 }));
}
function updatedChat() {
    const log = getByDataHook('log');
    if (!log || !log.firstChild) return;
    const children = log.firstChild.children;
    if (lastMessage !== log.firstChild.lastChild) {
        if (children.length > 5) {
            for (let i = 0; i < children.length - 5; i++) children[i].style.display = "none";
        }
        const lastChild = log.firstChild.lastChild;
        lastChild.style.opacity = 1;
        setTimeout(() => { lastChild.classList.add("fade-out"); lastChild.removeAttribute("style"); }, 500);
        lastMessage = lastChild;
    }
    log.scrollTop = 0;
}
function chatToggle() {
    const inputStyle = body.querySelector('.chatbox-view').querySelector('.input').style;
    inputStyle.display = inputStyle.display === 'none' ? 'block' : 'none';
    if (inputStyle.display == 'block') body.querySelector('.chatbox-view').querySelector('input').focus();
}

///////////////////////////////////////// CONTROLS /////////////////////////////////////////
function showControls(v) {
    if(v) {
        joystick.setAttribute("view", "visible");
        kickButton.setAttribute("view", "visible");
    } else {
        joystick.setAttribute("view", "hidden");
        kickButton.setAttribute("view", "hidden");
    }
}
function updateControlsSettingsNumbers() {
    let inputs = inputOptionsHandler.querySelectorAll(".my-custom-row");
    if (!inputs || inputs.length < 3) return;
    inputs[0].children[1].innerHTML = inputs[0].children[2].value;
    inputs[1].children[1].innerHTML = inputs[1].children[2].value;
    inputs[2].children[1].innerHTML = inputs[2].children[2].value;
}
function onControlsSettingsInput() {
    let inputs = inputOptionsHandler.querySelectorAll(".my-custom-row");
    if (!inputs || inputs.length < 3) return;
    updateControlsOptions(inputs[0].children[2].value, inputs[1].children[2].value, inputs[2].children[2].value);
}
function getColors() {
    try { return Object.assign({}, DEFAULT_COLORS, JSON.parse(localStorage.getItem("controls_colors") || "{}")); } 
    catch { return {...DEFAULT_COLORS}; }
}
function applyColors(c) {
    localStorage.setItem("controls_colors", JSON.stringify(c));
    const opts = JSON.parse(localStorage.getItem("controls")) || [20, 5, 1];
    updateControlsOptions(opts[0], opts[1], opts[2], true, c);
}
function updateControlsOptions(w, m, o, f = false, colors = null) {
    if (f) {
        let inputs = inputOptionsHandler.querySelectorAll(".my-custom-row");
        if (inputs && inputs.length >= 3) {
            inputs[0].children[2].value = w; inputs[1].children[2].value = m; inputs[2].children[2].value = o;
        }
    }
    localStorage.setItem("controls", JSON.stringify([w, m, o]));
    const c = colors || getColors();
    controlsHandler.innerHTML = constrolsStyleBase
        .replaceAll("CONTROLS_WIDTH", w.toString()).replaceAll("CONTROLS_MARGIN", m.toString())
        .replaceAll("CONTROLS_OPACITY", o.toString()).replaceAll("KICK_OPACITY", (o / 2).toString())
        .replaceAll("JOY_BG", c.joyBg).replaceAll("JOY_BORDER", c.joyBorder)
        .replaceAll("THUMB_BG", c.thumbBg).replaceAll("THUMB_BORDER", c.thumbBorder)
        .replaceAll("KICK_BG", c.kickBg).replaceAll("KICK_BORDER", c.kickBorder)
        .replaceAll("KICK_ICON", c.kickIcon);
    updateControlsSettingsNumbers(); resetJoystick();
}
function handleTouchStart(e) { isTouching = true; updateJoystick(e.touches[0]); }
function handleTouchMove(e) { if (isTouching) updateJoystick(e.touches[0]); }
function handleTouchEnd() { isTouching = false; resetJoystick(); }
function updateJoystick(touch) {
    const rect = joystick.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = touch.clientX - centerX;
    const deltaY = touch.clientY - centerY;
    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(joystick.clientWidth / 2, Math.hypot(deltaX, deltaY));
    const thumbX = centerX + distance * Math.cos(angle);
    const thumbY = centerY + distance * Math.sin(angle);
    thumb.style.left = thumbX - rect.left - thumb.clientWidth / 2 + 'px';
    thumb.style.top = thumbY - rect.top - thumb.clientHeight / 2 + 'px';
    const joystickValue = Math.round(((angle + 2 * Math.PI) % (2 * Math.PI) * 180 / Math.PI) / 45) % 8;
    switch (joystickValue) {
        case 0: emulateKeys("d"); break; case 1: emulateKeys("sd"); break;
        case 2: emulateKeys("s"); break; case 3: emulateKeys("sa"); break;
        case 4: emulateKeys("a"); break; case 5: emulateKeys("wa"); break;
        case 6: emulateKeys("w"); break; case 7: emulateKeys("wd"); break;
    }
}
function resetJoystick() {
    thumb.style.left = joystick.clientWidth / 2 - thumb.clientWidth / 2 + 'px';
    thumb.style.top = joystick.clientHeight / 2 - thumb.clientHeight / 2 + 'px';
    emulateKeys("");
}
function emulateKeys(str) {
    let keys = { "w": "keyup", "a": "keyup", "s": "keyup", "d": "keyup" };
    for (var i = 0; i < str.length; i++) keys[str[i]] = "keydown";
    try {
        gameFrame.document.dispatchEvent(new KeyboardEvent(keys['w'], { code: "KeyW" }));
        gameFrame.document.dispatchEvent(new KeyboardEvent(keys['a'], { code: "KeyA" }));
        gameFrame.document.dispatchEvent(new KeyboardEvent(keys['s'], { code: "KeyS" }));
        gameFrame.document.dispatchEvent(new KeyboardEvent(keys['d'], { code: "KeyD" }));
    } catch {}
}
function kick(str) { try { gameFrame.document.dispatchEvent(new KeyboardEvent(str, { code: "KeyX" })); } catch {} }

function setupControls() {
    controlsHandler.name = "stylesheet";
    document.head.appendChild(controlsHandler);

    // Tạo bảng Setting bằng mã nhà làm, không dùng class của Haxball
    inputOptionsHandler.id = "kiruz-settings-menu";
    inputOptionsHandler.setAttribute("hidden", "");
    
    let colorRows = "";
    for (const key in COLOR_LABELS) {
        colorRows += `
        <div style="margin-bottom: 15px; background: #2a343a; padding: 10px; border-radius: 8px;">
            <div style="margin-bottom: 8px; color: white; font-weight: bold; font-size: 14px;">${COLOR_LABELS[key]}</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;" data-color-group="${key}">
                ${PRESET_COLORS.map(color => `<div class="color-box" data-color="${color}" style="width:35px; height:35px; border-radius:50%; background-color:${color}; border: 2px solid #555; cursor: pointer; box-sizing:border-box;"></div>`).join('')}
            </div>
        </div>`;
    }

    inputOptionsHandler.innerHTML = `
    <style>
        #kiruz-settings-menu {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(26, 33, 37, 0.95); z-index: 9999;
            overflow-y: auto; display: flex; flex-direction: column; align-items: center;
            color: white; font-family: sans-serif;
        }
        #kiruz-settings-menu[hidden] { display: none !important; }
        .kiruz-container {
            width: 95%; max-width: 500px; padding: 20px; margin-top: 20px; margin-bottom: 50px;
            background: #1a2125; border-radius: 10px; border: 1px solid #333;
        }
        .my-custom-row { display: flex; align-items: center; margin-bottom: 15px; background: #222; padding: 10px; border-radius: 5px; }
        .my-custom-row input[type=range] { flex: 1; margin-left: 10px; }
        .my-custom-row div:first-child { min-width: 80px; font-weight: bold; }
        .my-custom-row div:nth-child(2) { width: 40px; text-align: right; margin-right: 10px; }
    </style>
    <div class="kiruz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #444; padding-bottom: 10px;">
            <h2 style="margin: 0; font-size: 1.5rem;">Cài Đặt</h2>
            <button data-hook="closeinput" style="background: #c13535; color: white; padding: 8px 15px; border-radius: 5px; border: none; font-weight:bold; font-size: 1rem;">Đóng</button>
        </div>
        
        <div class="my-custom-row">
            <div>Kích thước</div><div>20</div><input class="slider" type="range" min="10" max="30" step="0.01">
        </div>
        <div class="my-custom-row">
            <div>Khoảng cách</div><div>5</div><input class="slider" type="range" min="0" max="15" step="0.01">
        </div>
        <div class="my-custom-row">
            <div>Độ mờ</div><div>1</div><input class="slider" type="range" min="0.2" max="1" step="0.01">
        </div>
        
        <button data-hook="resetinput" style="background: #555; color: white; padding: 10px; border-radius: 5px; border: none; width: 100%; font-weight:bold; margin-bottom: 20px;">Reset Kích Thước</button>

        <h2 style="text-align: center; margin-bottom: 15px;">Màu Sắc</h2>
        ${colorRows}
        
        <button data-hook="resetcolors" style="background: #ff9800; color: white; padding: 12px; border-radius: 5px; border: none; width: 100%; margin-bottom: 10px; font-weight:bold;">Khôi phục màu gốc</button>
    </div>
    `;
    
    body.parentNode.appendChild(inputOptionsHandler);

    // Nút bánh răng lơ lửng (Nút R)
    floatingBtn = document.createElement("button");
    floatingBtn.id = "open-panel-btn";
    floatingBtn.innerHTML = "⚙";
    floatingBtn.style.cssText = "position:fixed;top:15px;right:15px;z-index:8888;width:55px;height:55px;border-radius:50%;background:#1a2125cc;color:#ecf0f3;border:2px solid #ecf0f3;font-size:28px;display:flex;align-items:center;justify-content:center;padding:0;line-height:1;box-shadow: 0 4px 6px rgba(0,0,0,0.5);";
    floatingBtn.addEventListener("click", () => {
        inputOptionsHandler.removeAttribute("hidden"); showControls(true); resetJoystick();
    });
    document.body.appendChild(floatingBtn);

    // Event bấm nút Đóng
    inputOptionsHandler.querySelector('[data-hook="closeinput"]').addEventListener("click", function() {
        inputOptionsHandler.setAttribute("hidden", ""); showControls(false);
    });
    
    // Event Slider
    inputOptionsHandler.querySelector('[data-hook="resetinput"]').addEventListener("click", function() {
        updateControlsOptions(20, 5, 1, true);
    });
    const sectionRows = inputOptionsHandler.querySelectorAll(".my-custom-row");
    if(sectionRows.length >= 3) {
        sectionRows[0].children[2].addEventListener("input", onControlsSettingsInput);
        sectionRows[1].children[2].addEventListener("input", onControlsSettingsInput);
        sectionRows[2].children[2].addEventListener("input", onControlsSettingsInput);
    }

    // Event bấm chọn màu
    inputOptionsHandler.querySelectorAll('.color-box').forEach(box => {
        box.addEventListener("click", (e) => {
            const color = e.target.getAttribute("data-color");
            const groupKey = e.target.parentNode.getAttribute("data-color-group");
            const currentColors = getColors();
            currentColors[groupKey] = color;
            applyColors(currentColors);
            
            inputOptionsHandler.querySelectorAll(`[data-color-group="${groupKey}"] .color-box`).forEach(b => b.style.border = "2px solid #555");
            e.target.style.border = "4px solid white";
        });
    });

    inputOptionsHandler.querySelector('[data-hook="resetcolors"]').addEventListener("click", () => {
        applyColors({...DEFAULT_COLORS});
        inputOptionsHandler.querySelectorAll('.color-box').forEach(b => b.style.border = "2px solid #555");
    });

    // Joystick & Kick
    joystick = document.createElement("div");
    joystick.setAttribute("class", "neo rounded sizer");
    joystick.setAttribute("view", "hidden");
    joystick.setAttribute("float", "");
    joystick.setAttribute("id", "joystick");
    joystick.innerHTML = '<div id="thumb" class="rounded" float></div>';
    joystick.addEventListener('touchstart', handleTouchStart);
    joystick.addEventListener('touchmove', handleTouchMove);
    joystick.addEventListener('touchend', handleTouchEnd);

    kickButton = document.createElement("button");
    kickButton.setAttribute("class", "neo rounded sizer");
    kickButton.setAttribute("view", "hidden");
    kickButton.setAttribute("float", "");
    kickButton.setAttribute("id", "kick");
    kickButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M290 49c-16 0-32 14-38 36-6 25 5 48 22 52 18 5 39-10 45-35 7-25-5-48-22-52l-7-1zM89 68 78 87c32 16 63 34 96 47l28-12c-40-16-77-34-113-54zm148 56c-48 26-98 42-154 62l9 16c52-16 111-33 161-56-7-6-12-13-16-22zm30 35c-22 11-46 20-71 29-20 45-28 95-37 140l-2 11-101-40-16 26 130 60 3-4 15-29a1672 1672 0 0 0 79-193zm-31 135-17 36c25 37 57 79 95 109l23-17c-36-40-73-85-101-128zm188 73a48 48 0 0 0-48 48 48 48 0 0 0 48 48 48 48 0 0 0 48-48 48 48 0 0 0-48-48z"/></svg>';
    kickButton.addEventListener('touchstart', function() { kick('keydown') });
    kickButton.addEventListener('touchend', function() { kick('keyup') });

    document.body.appendChild(joystick);
    document.body.appendChild(kickButton);

    const controlOptions = JSON.parse(localStorage.getItem("controls"));
    if (controlOptions === null) updateControlsOptions(20, 5, 1, true);
    else updateControlsOptions(controlOptions[0], controlOptions[1], controlOptions[2], true);
    resetJoystick();
}

///////////////////////////////////////// GAMEPAD /////////////////////////////////////////
let previousDigitalStickState = "";
let previousAnalogStickState = "";
let isXButtonPressed = false;

window.addEventListener("gamepadconnected", (event) => { checkGamepadState(event.gamepad); });
window.addEventListener("gamepaddisconnected", (event) => {});

function checkGamepadState(gamepad) {
  requestAnimationFrame(() => {
    const axes = gamepad.axes; const buttons = gamepad.buttons;
    const digitalStickState = getDigitalStickState(axes[0], axes[1]);
    if (digitalStickState.changed) { emulateKeys(digitalStickState.direction); previousDigitalStickState = digitalStickState.direction; }
    const analogStickState = getAnalogStickState(axes[2], axes[3]);
    if (analogStickState.changed) { emulateKeys(analogStickState.direction); previousAnalogStickState = analogStickState.direction; }
    if ((buttons[0].pressed || buttons[2].pressed) && !isXButtonPressed) { kick("keydown"); isXButtonPressed = true; } 
    else if (!buttons[0].pressed && !buttons[2].pressed) { kick("keyup"); isXButtonPressed = false; }
    checkGamepadState(navigator.getGamepads()[gamepad.index]);
  });
}
function getDigitalStickState(x, y) {
  const threshold = 0.5; const centerThreshold = 0.1;
  if (Math.abs(x) < centerThreshold && Math.abs(y) < centerThreshold) return { changed: previousDigitalStickState !== "Center", direction: "Center" };
  if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
    const direction = getDirection(x, y); return { changed: direction !== previousDigitalStickState, direction };
  }
  return { changed: false };
}
function getAnalogStickState(x, y) {
  const threshold = 0.5; const centerThreshold = 0.1;
  if (Math.abs(x) < centerThreshold && Math.abs(y) < centerThreshold) return { changed: previousAnalogStickState !== "Center", direction: "Center" };
  if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
    const direction = getDirection(x, y); return { changed: direction !== previousAnalogStickState, direction };
  }
  return { changed: false };
}
function getDirection(x, y) {
  const angle = Math.atan2(y, x);
  const angleInDegrees = (angle >= 0 ? angle : (2 * Math.PI + angle)) * (180 / Math.PI);
  const sector = Math.round(angleInDegrees / 45) % 8;
  return ["d", "sd", "s", "sa", "a", "aw", "w", "wd"][sector];
}
