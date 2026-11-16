window.onload = async () => {
    window.history.replaceState(null, "", "/itec101-charprof");

    await Loop.Delay(0.5);
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
