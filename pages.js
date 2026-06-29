import { createElement, setTitle, setAttribute, setFavicon, scrollUp, importCSSFromList, importJSFromList, setContentOfHeader, setContentOfMain, setContentOfFooter } from "https://js.nether.click/nether.js";

setAttribute("html", "lang", "en")

setFavicon("img/icons/favicon.png");

await importCSSFromList([
    "https://modern-web.nether.click/fonts/lexend/lexend.css",
    "https://modern-web.nether.click/components/css/all.css",
    "https://modern-web.nether.click/components/css/body.css",
    "https://modern-web.nether.click/components/css/header.css",
    "https://modern-web.nether.click/components/css/main.css",
    "https://modern-web.nether.click/components/css/footer.css",
    "https://modern-web.nether.click/components/css/a.css",
    "https://modern-web.nether.click/components/css/headings.css",
    "https://modern-web.nether.click/components/css/section.css",
    "https://modern-web.nether.click/components/css/grouped-list.css",
    "https://modern-web.nether.click/components/css/tabs-switching.css",
    "https://modern-web.nether.click/components/css/copy-box.css",
]);

await importJSFromList([
    "https://nether.click/js/import-app-drawer.js",
    "https://nether.click/js/import-app-check.js",

    "https://modern-web.nether.click/components/js/tabs-switching.js",
])

setContentOfHeader(`
    <div class="app-drawer-wrapepr"></div>
    <button class="logo" onclick="showHome()" title="Displays Home Page">
        <img src="img/icons/favicon.png" alt="Nether.ps logo">
    </button>
`)

setContentOfFooter(`
    <button onclick="showHome()" title="Displays Home Page">
        <img src="img/icons/favicon.png" alt="Nether.ps logo">
    </button>
    <button onclick="showFunctions()" title="Displays Functions page">
        <img src="img/links-icons/functions.svg" alt="Functions page link icon">
    </button>
`)

window.showHome = showHome;
window.showFunctions = showFunctions;

function showHome() {
    scrollUp()
    setTitle("Nether.ps")
    setContentOfMain(`
        <h1>Nether.ps</h1>
        <section>
            <h2>Links</h2>
            <div class="grouped-list">
                <button class="item" onclick="showFunctions()" title="Displays functions page">
                    <img src="img/links-icons/functions.svg">
                    Functions 
                </button>
            </div>
        </section>
    `)
}

async function showFunctions() {
    scrollUp();
    setTitle("Functions");
    setContentOfMain(`
        <h1>Functions</h1>
        <section>
            <div class="grouped-list" id="functions-list"></div>
        </section>
    `);

    const functions = await fetch("db.json").then(r => r.json());

    const list = document.getElementById("functions-list");

    functions.forEach(fn => {
        const button = createElement("button");
        button.textContent = fn.name;
        button.onclick = () => showFunction(fn.name, fn.what_it_does, fn.parameters, fn.example_usage);
        button.classList.add("item");

        list.appendChild(button);
    });
}

function showFunction(name, what, params, examples) {
    scrollUp();
    setTitle(`${name} - Nether.js Function`);

    let examplesPSCODE = "";

    examples.forEach(ex => {
        examplesPSCODE += `
            <div class="copy-box">
                <div class="head">
                    <span class="language">JavaScript (JS)</span>
                </div>
                <div class="body">
                    <pre class="code">${ex}</pre>
                </div>
            </div>
            <br>
        `;
    });

    setContentOfMain(`
        <h1>${name}</h1>
        <section>
            <div class="tabs-switching">
                <div class="tabs">
                    <button class="tab active" onclick="showTab('what')" data-tab="what">What it does</button>
                    <button class="tab" onclick="showTab('how_to_import')" data-tab="how_to_import">How to import</button>
                    <button class="tab" onclick="showTab('params')" data-tab="params">Parameters</button>
                    <button class="tab" onclick="showTab('examples')" data-tab="examples">Examples</button>
                </div>
                <div class="tab-content active" id="what">
                    <h2>Description</h2>
                    <p>${what}</p>
                </div>
                <div class="tab-content active" id="how_to_import">
                    <h2>How to import</h2>
                    <div class="copy-box">
                        <div class="head">
                            <span class="language">JS</span>
                        </div>
                        <div class="body">
                            <pre class="code">import {${name}}(${params})</pre>
                        </div>
                    </div>
                </div>
                <div class="tab-content" id="params">
                    <h2>Parameters</h2>
                    <div class="copy-box">
                        <div class="head">
                            <span class="language">JS</span>
                        </div>
                        <div class="body">
                            <pre class="code">${name}(${params})</pre>
                        </div>
                    </div>
                </div>
                <div class="tab-content" id="examples">
                    <h2>Examples</h2>
                    ${examplesPSCODE}
                </div>
            </div>
        </section>
    `);
}

showHome()
