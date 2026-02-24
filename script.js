document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".add-to-cart");
    items.forEach(function (item) {
        item.addEventListener("click", function () {
            alert("Item added to cart!");
        });
    });

    const newsletterForm = document.querySelector("#newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you for subscribing!");
        });
    }
});

/* axe-testning */
function runAccessibilityAudit() {
    if (typeof axe === 'undefined') {
        console.error("Axe-core hittades inte. Kontrollera script-länken.");
        return;
    }

    axe.run(document)
        .then(results => {
            console.log("%c --- Tillgänglighetsrapport --- ", "background: #794724; color: white; font-size: 15px;");
            
            if (results.violations.length === 0) {
                console.log("%c Inga överträdelser hittade! Din kod är ren. ", "color: #03b2d1; font-weight: bold;");
            } else {
                console.warn(`Hittade ${results.violations.length} överträdelser:`);
                results.violations.forEach(violation => {
                    console.group(`Överträdelse: ${violation.id}`);
                    console.log(`Beskrivning: ${violation.description}`);
                    console.log(`Allvarlighetsgrad: ${violation.impact}`);
                    console.log("Berörda element:", violation.nodes);
                    console.log(`Läs mer: ${violation.helpUrl}`);
                    console.groupEnd();
                });
            }
        })
        .catch(err => {
            console.error('Audit misslyckades:', err);
        });
}

window.addEventListener("load", runAccessibilityAudit);

/* PerformanceObserver-testning */
const observeLCP = () => {
    const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        console.log("%c --- LCP Rapport --- ", "background: #794724; color: white; font-size: 14px;");
        console.log(`LCP-värde: ${lastEntry.startTime.toFixed(2)} ms`);
        console.log("LCP-element:", lastEntry.element);
        
        const display = document.getElementById('lcp-display');
        if (display) {
            display.innerText = `LCP: ${lastEntry.startTime.toFixed(2)} ms`;
        }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
};

observeLCP();