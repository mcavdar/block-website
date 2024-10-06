document.addEventListener('DOMContentLoaded', loadWebsites);
document.getElementById('addWebsite').addEventListener('click', addWebsite);

function loadWebsites() {
    browser.storage.sync.get('websites', (data) => {
        const websites = data.websites || [];
        const list = document.getElementById('websiteList');
        list.innerHTML = '';
        websites.forEach((website, index) => {
            const li = document.createElement('li');
            li.textContent = website;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteWebsite(index);
            li.appendChild(deleteButton);
            list.appendChild(li);
        });
    });
}

function addWebsite() {
    const input = document.getElementById('websiteInput');
    const newWebsite = input.value.trim();
    if (newWebsite) {
        browser.storage.sync.get('websites', (data) => {
            const websites = data.websites || [];
            websites.push(newWebsite);
            browser.storage.sync.set({ websites }, loadWebsites);
        });
        input.value = '';
    }
}

function deleteWebsite(index) {
    browser.storage.sync.get('websites', (data) => {
        let websites = data.websites || [];
        websites.splice(index, 1);
        browser.storage.sync.set({ websites }, loadWebsites);
    });
}