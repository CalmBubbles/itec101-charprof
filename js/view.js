const availStats = [
    "str",
    "int",
    "chr",
    "def",
    "agi",
    "lck"
];
const statColors = [
    "#ec3e28, #960e07",
    "#02fbff, #003f98",
    "#b841fd, #65169a",
    "#efb62e, #c67013",
    "#effe34, #ad9612",
    "#73fe33, #05761b"
];

let index = 0;
let abortLoad = false;
let animScale = 1;
let chars = null;

async function view ()
{
    const charReq = await fetch(`data/chars/${chars[index]}.json`);
    const char = await charReq.json();

    fpic.style.imageRendering = char.fpixel ? "pixelated" : "";
    fpic.src = `img/char/${chars[index]}/full.png`;
    mpic.style.imageRendering = char.mpixel ? "pixelated" : "";
    mpic.src = `img/char/${chars[index]}/min.png`;

    await Loop.Wait(() => (fpic.complete && mpic.complete) || abortLoad);
    if (abortLoad) return;

    fname.textContent = char.fname;
    lname.textContent = char.lname;
    quote.textContent = `"${char.quote}"`;
    mfrom.textContent = char.from;
    desc.textContent = char.desc;

    for (let i = 0; i < char.adj.length; i++)
    {
        const span = document.createElement("span");
        span.append(char.adj[i].toUpperCase());
        adj.append(span);
    }

    const statEntries = Object.entries(char.stats);
    const statElements = [];
    for (let i = 0; i < statEntries.length; i++) statElements.push(addStat(statEntries[i][0], statEntries[i][1]));


    info.setAttribute("on", 1);

    fname.setAttribute("on", 1);
    await Loop.Delay(0.3 * animScale);
    if (abortLoad) return;
    lname.setAttribute("on", 1);
    await Loop.Delay(0.2 * animScale);
    if (abortLoad) return;
    from.setAttribute("on", 1);
    fpic.setAttribute("on", 1);
    await Loop.Delay(0.3 * animScale);
    if (abortLoad) return;
    quote.setAttribute("on", 1);
    await Loop.Delay(0.3 * animScale);
    if (abortLoad) return;

    for (let i = 0; i < statElements.length; i++)
    {
        statElements[i].setAttribute("on", 1);
        await Loop.Delay(0.1 * animScale);
        if (abortLoad) return;
    }

    desc.setAttribute("on", 1);
    await Loop.Delay(0.1 * animScale);
    if (abortLoad) return;
    adj.setAttribute("on", 1);
    await Loop.Delay(0.1 * animScale);
    if (abortLoad) return;
    mpic.setAttribute("on", 1);
}

function addStat (id, value)
{
    const content = document.createElement("div");
    content.setAttribute("on", 0);

    const icon = document.createElement("img");
    icon.src = `img/stats/${availStats.includes(id) ? id : "spc"}.svg`;

    const label = document.createElement("span");
    label.append(id.toUpperCase());

    content.append(icon, label);
    
    const isNum = typeof value === "number";

    if (isNum)
    {
        const bar = document.createElement("div");
        bar.classList.add("bar");

        const barVal = document.createElement("div");
        barVal.style.width = `${value}%`;
        barVal.style.background = `linear-gradient(to right, ${statColors[availStats.indexOf(id)]})`;
        bar.append(barVal);

        content.append(bar);
    }

    const valText = document.createElement("span");
    valText.textContent = isNum ? `${value}%` : value;
    content.append(valText);

    stats.append(content);

    return content;
}

async function move (dir)
{
    if (animScale === 1)
    {
        animScale = 0.5;
        main.setAttribute("moved", 1);
    }

    main.setAttribute("dir", dir);

    await Loop.Delay(0.125);

    main.style.transition = "none";
    main.setAttribute("dir", dir * -1);
    main.setAttribute("afade", 1);
    
    info.setAttribute("on", 0);
    fname.setAttribute("on", 0);
    lname.setAttribute("on", 0);
    from.setAttribute("on", 0);
    quote.setAttribute("on", 0);
    desc.setAttribute("on", 0);
    adj.setAttribute("on", 0);
    mpic.setAttribute("on", 0);

    fpic.style.transition = "none";
    fpic.setAttribute("on", 0);

    while (adj.firstChild != null) adj.firstChild.remove();
    while (stats.firstChild != null) stats.firstChild.remove();

    await new Promise(resolve => requestAnimationFrame(resolve));

    main.style.transition = "";
    main.setAttribute("dir", dir * 0);

    main.setAttribute("afade", 0);
    fpic.style.transition = "";

    index += dir;
    if (index < 0) index = chars.length - 1;
    else if (index > chars.length - 1) index = 0;

    window.history.pushState({ }, "", `view?c=${index}`);

    await view();
}

lnav.onclick = () => move(-1);
rnav.onclick = () => move(1);

window.onload = async () => {
    const charsReq = await fetch("data/data.json");
    chars = await charsReq.json();

    const params = new URLSearchParams(window.location.search);
    index = parseInt(params.get("c") ?? params.get("char"));

    if (isNaN(index)) index = 0;

    window.history.replaceState(null, "", `view?c=${index}`);

    view();
};