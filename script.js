document.getElementById('new-entry').addEventListener('click', showNewEntryForm);
document.getElementById('view-entries').addEventListener('click', showEntries);

function showNewEntryForm() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>New Entry</h2>
        <textarea id="entry-text" placeholder="Write your thoughts here..."></textarea>
        <button onclick="saveEntry()">Save Entry</button>
    `;
}

function saveEntry() {
    const text = document.getElementById('entry-text').value;
    if (!text) return;

    const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    const entry = {
        date: new Date().toLocaleString(),
        text,
    };
    entries.push(entry);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
    alert('Entry saved!');
    showEntries();
}

function showEntries() {
    const content = document.getElementById('content');
    const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    if (entries.length === 0) {
        content.innerHTML = '<h2>No Entries Yet</h2>';
        return;
    }

    let entriesHtml = '<h2>Your Entries</h2><ul>';
    entries.forEach((entry, index) => {
        entriesHtml += `<li><a href="#" onclick="viewEntry(${index})">${entry.date}</a></li>`;
    });
    entriesHtml += '</ul>';
    content.innerHTML = entriesHtml;
}

function viewEntry(index) {
    const content = document.getElementById('content');
    const entries = JSON.parse(localStorage.getItem('diaryEntries'));
    const entry = entries[index];

    content.innerHTML = `
        <h2>${entry.date}</h2>
        <p>${entry.text}</p>
        <button onclick="showEntries()">Back to Entries</button>
        <button onclick="deleteEntry(${index})">Delete Entry</button>
    `;
}

function deleteEntry(index) {
    if (confirm("Are you sure you want to delete this entry?")) {
        const entries = JSON.parse(localStorage.getItem('diaryEntries'));
        entries.splice(index, 1);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        alert('Entry deleted!');
        showEntries();
    }
}
