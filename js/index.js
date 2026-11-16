let chars = [];

async function addPanel (charID, index)
{   
    const panel = document.createElement("a");
    panel.classList.add("faded");
    panel.setAttribute("on", 0);
    panel.setAttribute("loaded", 0);
    panel.href = `itec101-charprof/view?c=${index}`;

    const image = document.createElement("img");
    image.classList.add("faded");
    image.setAttribute("on", 0);
    image.src = `img/char/${charID}/full.png`;

    const name = document.createElement("div");
    name.classList.add("faded");
    name.setAttribute("on", 0);

    panel.append(image, name);
    roster.append(panel);

    if (charID !== "Null")
    {
        const charReq = await fetch(`/data/chars/${charID}.json`);
        const char = await charReq.json();

        name.textContent = `${char.fname} ${char.lname}`;
    }
    else
    {
        name.textContent = "A pumpkin"
        image.src = "img/char/Null/-.png";
    }

    await Loop.Wait(() => image.complete);

    panel.setAttribute("loaded", 1);

    name.setAttribute("on", 1);
    await Loop.Delay(0.2);
    image.setAttribute("on", 1);
}

window.onload = async () => {
    window.history.replaceState(null, "", "/itec101-charprof");

    const charsReq = await fetch("/itec101-charprof/data/data.json");
    chars = await charsReq.json();

    for (let i = 0; i < chars.length; i++) addPanel(chars[i], i);

    await Loop.Delay(0.2);
    welcome.setAttribute("on", 1);
    await Loop.Delay(0.7);
    logo.setAttribute("on", 1);
    await Loop.Delay(0.7);
    desc.setAttribute("on", 1);
    await Loop.Delay(0.7);
    
    footer.setAttribute("on", 1);
    rhead.setAttribute("on", 1);

    const ritems = roster.children;

    for (let i = 0; i < ritems.length; i++)
    {
        ritems[i].setAttribute("on", 1);
        await Loop.Delay(0.1);
    }
};