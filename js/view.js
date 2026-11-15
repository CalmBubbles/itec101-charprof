const availStats = [
    "str",
    "int",
    "chr",
    "def",
    "agi",
    "lck"
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

    const bar = document.createElement("div");
    const barVal = document.createElement("div");
    const barText = document.createElement("span");
    barText.textContent = value;
    bar.append(barVal, barText);

    content.append(icon, label, bar);
    stats.append(content);
}

window.onload = async () => {
    const charsReq = await fetch("../data/data.json");
    chars = await charsReq.json();

    const params = new URLSearchParams(window.location.search);
    const char = params.get("c") ?? params.get("char") ?? 0;
    view(char);
};