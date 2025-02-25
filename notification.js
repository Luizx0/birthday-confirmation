document.addEventListener('DOMContentLoaded', function() {
    const nameList = document.getElementById('nameList');
    const savedNames = JSON.parse(localStorage.getItem('nameList')) || [];

    savedNames.forEach(name => {
        const listItem = createListItem(name);
        nameList.appendChild(listItem);
    });

    const deleteAllButton = document.createElement('button');
    deleteAllButton.textContent = 'Delete All Names';
    deleteAllButton.style.display = 'block';
    deleteAllButton.style.margin = '20px auto';
    deleteAllButton.addEventListener('click', function() {
        const password = prompt('Enter the password to delete all names:');
        if (password === '123123') {
            localStorage.removeItem('nameList');
            while (nameList.firstChild) {
                nameList.removeChild(nameList.firstChild);
            }
            alert('Todos os nomes foram deletados.');
        } else {
            alert('Senha Incorreta.');
        }
    });
    document.body.appendChild(deleteAllButton);
});

document.getElementById('notificationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const messageElement = document.getElementById('message');
    const nameList = document.getElementById('nameList');

    const names = Array.from(nameList.children).map(item => item.firstChild.textContent);
    if (names.includes(name)) {
        messageElement.textContent = `Error: ${name} já está na lista.`;
        return;
    }

    messageElement.textContent = `Notification: ${name} pressed the button.`;

    const listItem = createListItem(name);
    nameList.appendChild(listItem);

    names.push(name);
    localStorage.setItem('nameList', JSON.stringify(names));
});

function createListItem(name) {
    const listItem = document.createElement('li');
    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;
    listItem.appendChild(nameSpan);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', function() {
        const password = prompt('Enter the password to delete this name:');
        if (password === '123123') {
            listItem.remove();
            const names = Array.from(document.getElementById('nameList').children).map(item => item.firstChild.textContent);
            localStorage.setItem('nameList', JSON.stringify(names));
            alert('Nome deletado.');
        } else {
            alert('Senha Incorreta.');
        }
    });
    listItem.appendChild(deleteButton);

    return listItem;
}
