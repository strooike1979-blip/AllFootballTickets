function onPageLoaded() {
    console.log("Page processing started");

    // --- 1. PREVIEW & STATISTIEKEN LOGICA ---
    const tooltip = document.createElement('div');
    tooltip.id = 'image-preview-tooltip';
    Object.assign(tooltip.style, {
            position: 'fixed',
            display: 'none',
            zIndex: '10000',
            pointerEvents: 'none',
            background: '#fff',
            border: '3px solid rgb(255, 148, 0)',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            padding: '5px',
            maxWidth: '500px', // Verhoogd voor een grotere foto
            width: 'auto'       // Nu met de juiste komma hierboven
        });
    document.body.appendChild(tooltip);

    const rows = document.querySelectorAll('#matchTable tbody tr');
    let ticketsOwned = 0;
    let programsOwned = 0;
    let totalMatches = 0;

    rows.forEach(row => {
        const cells = row.cells;
        if (cells && cells.length === 5) { 
            totalMatches++;
            const links = row.querySelectorAll('td a');
            
            links.forEach(link => {
                const img = link.querySelector('img');
                if (img && img.src.includes('aaa.png')) {
                    if (link.parentElement.cellIndex === 3) ticketsOwned++;
                    if (link.parentElement.cellIndex === 4) programsOwned++;

                    // Preview tonen als je met de muis op het icoon komt
                        link.addEventListener('mouseenter', () => {
                            // De style="width:100%" zorgt dat de foto de 600px van hierboven opvult
                            tooltip.innerHTML = `<img src="${link.href}" style="width:100%; height:auto; display:block; border-radius:4px;">`;
                            tooltip.style.display = 'block';
                        });
                    link.addEventListener('mousemove', (e) => {
    const tooltipWidth = 510;  // De breedte van je foto (500px + padding)
    const gap = 30;            // Afstand tussen muis en foto
    let leftPos = e.clientX + gap;

    // CONTROLE: Valt de foto rechts buiten het scherm?
    if (leftPos + tooltipWidth > window.innerWidth) {
        // JA: Verplaats de foto naar de LINKERKANT van de muis
        leftPos = e.clientX - tooltipWidth - gap;
    }

    // CONTROLE: Valt de foto links buiten het scherm? (bijv. op kleine schermen)
    if (leftPos < 0) {
        leftPos = 10; // Zet hem strak tegen de linkerrand
    }

    tooltip.style.left = leftPos + 'px';

    // HOOGTE CONTROLE: Voorkom dat de foto aan de onderkant verdwijnt
    let topPos = e.clientY + 10;
    const estimatedHeight = 400; // Schatting van de hoogte van je foto

    if (topPos + estimatedHeight > window.innerHeight) {
        topPos = e.clientY - estimatedHeight - 10;
    }
    
    // Extra veiligheid: nooit hoger dan de bovenkant van het scherm
    if (topPos < 10) topPos = 10;

    tooltip.style.top = topPos + 'px';
});
                    link.addEventListener('mouseleave', () => {
                        tooltip.style.display = 'none';
                    });
                }
            });
        }
    });

    // Update tellers alleen als de elementen bestaan
    if(document.getElementById('ticket-count')) {
        document.getElementById('ticket-count').innerText = ticketsOwned;
        document.getElementById('total-tickets').innerText = totalMatches;
        document.getElementById('program-count').innerText = programsOwned;
        document.getElementById('total-programs').innerText = totalMatches;
    }

    // --- 2. ZOEKFUNCTIE LOGICA ---
    const clSeasons = [
        { year: "1992/1993", file: "cl-1992-1993.html" },
        { year: "1993/1994", file: "cl-1993-1994.html" },
        { year: "1994/1995", file: "cl-1994-1995.html" }
    ];

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            let html = '';
            clSeasons.forEach(season => {
                if(season.year.includes(query)) {
                    html += `<div style="padding: 10px; border-bottom: 1px solid #eee; cursor: pointer;" 
                             onclick="window.location.href='${season.file}'">
                             Zoek in seizoen ${season.year}
                             </div>`;
                }
            });
            searchResults.innerHTML = html;
            searchResults.style.display = 'block';
        });

        document.addEventListener('click', function(e) {
            if (e.target !== searchInput) {
                searchResults.style.display = 'none';
            }
        });
    }

    // --- 3. VIDEO BUTTON LOGICA ---
    document.querySelectorAll(".play-button").forEach(function (button) {
        button.addEventListener("click", function () {
            const videoLink = this.parentNode.querySelector("a");
            if(videoLink) videoLink.click();
        });
    });

    console.log("page loaded");
}

// Start de functie zodra de DOM klaar is
document.addEventListener("DOMContentLoaded", onPageLoaded);