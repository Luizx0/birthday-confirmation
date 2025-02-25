import { database, ref, set, get, child, onValue } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', function() {
    const nameList = document.getElementById('nameList');
    const dbRef = ref(database, 'names');

    onValue(dbRef, (snapshot) => {
        nameList.innerHTML = '';
        const data = snapshot.val();
        if (data) {
            Object.values(data).forEach(name => {
                const listItem = createListItem(name);
                nameList.appendChild(listItem);
            });
        }
    });

    const deleteAllButton = document.createElement('button');
    deleteAllButton.textContent = 'Delete All Names';
    deleteAllButton.style.display = 'block';
    deleteAllButton.style.margin = '20px auto';
    deleteAllButton.addEventListener('click', function() {
        const password = prompt('Enter the password to delete all names:');
        if (password === '123123') {
            set(dbRef, null);
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
    const dbRef = ref(database, 'names');

    get(child(dbRef, name)).then((snapshot) => {
        if (snapshot.exists()) {
            messageElement.textContent = `Error: ${name} já está na lista.`;
        } else {
            messageElement.textContent = `Notification: ${name} pressed the button.`;
            set(child(dbRef, name), name);
            showBalloons();
        }
    });
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
            set(child(ref(database, 'names'), name), null);
            listItem.remove();
            alert('Nome deletado.');
        } else {
            alert('Senha Incorreta.');
        }
    });
    listItem.appendChild(deleteButton);

    return listItem;
}

function showBalloons() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    for (let i = 0; i < 5; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.backgroundColor = colors[i];
        balloon.style.left = `${20 * i}%`;
        document.body.appendChild(balloon);

        setTimeout(() => {
            balloon.remove();
        }, 10000);
    }
}
