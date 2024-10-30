document.addEventListener('DOMContentLoaded', () => {
    fetch('imdb_movies.json')
        .then(response => response.json())
        .then(data => populateTable(data))
        .catch(error => console.error('Error fetching data:', error));
});

function populateTable(data) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');
    const tooltip = document.getElementById('tooltip');

    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        const srNoTd = document.createElement('td');
        srNoTd.textContent = index + 1;
        tr.appendChild(srNoTd);

        headers.forEach(header => {
            const td = document.createElement('td');
            const content = row[header];
            td.textContent = content;
            td.addEventListener('mouseover', (event) => showTooltip(event, content, tooltip));
            td.addEventListener('mousemove', (event) => moveTooltip(event, tooltip));
            td.addEventListener('mouseout', () => hideTooltip(tooltip));
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
}

function showTooltip(event, content, tooltip) {
    tooltip.textContent = content;
    tooltip.style.display = 'block';
    moveTooltip(event, tooltip);
}

function moveTooltip(event, tooltip) {
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
}

function hideTooltip(tooltip) {
    tooltip.style.display = 'none';
}

function searchTable() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const rows = document.getElementById('table-body').getElementsByTagName('tr');

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        let rowContainsQuery = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(input));
        row.style.display = rowContainsQuery ? '' : 'none';
    }
}
