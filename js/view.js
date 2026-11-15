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

let chars = null;

async function view (index)
{
    const charReq = await fetch(`../data/chars/${chars[index]}.json`);
    const char = await charReq.json();

    fpic.src = `../img/char/${chars[index]}/full.png`;
    mpic.src = `../img/char/${chars[index]}/min.png`;

    fname.textContent = char.fname;
    lname.textContent = char.lname;
    quote.textContent = `"${char.quote}"`;
    mfrom.textContent = char.from;
    desc.textContent = char.desc;

    while (adj.firstChild != null) adj.firstChild.remove();
    for (let i = 0; i < char.adj.length; i++)
    {
        const span = document.createElement("span");
        span.append(char.adj[i].toUpperCase());
        adj.append(span);
    }

    const stats = Object.entries(char.stats);
    clearStats();
    for (let i = 0; i < stats.length; i++) addStat(stats[i][0], stats[i][1]);
}

function clearStats ()
{
    while (stats.firstChild != null) stats.firstChild.remove();
}

function addStat (id, value)
{
    const content = document.createElement("div");

    const icon = document.createElement("img");
    icon.src = `../img/stats/${availStats.includes(id) ? id : "spc"}.svg`;

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
}

window.onload = async () => {
    const charsReq = await fetch("../data/data.json");
    chars = await charsReq.json();

    const params = new URLSearchParams(window.location.search);
    const char = params.get("c") ?? params.get("char") ?? 0;
    view(char);
};