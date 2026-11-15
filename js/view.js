let chars = null;

window.onload = async () => {
    const charsReq = await fetch("../data/data.json");
    chars = await charsReq.json();

    view(0);
};

async function view (index)
{
    const charReq = await fetch(`../data/chars/${chars[index]}.json`);
    const char = await charReq.json(); 

    fname.textContent = char.fname;
    lname.textContent = char.lname;
    mfrom.textContent = char.from;
    desc.textContent = char.desc;
}