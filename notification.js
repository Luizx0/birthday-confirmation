import { database, ref, set, get, child, onValue } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', function() {
    const nameList = document.getElementById('nameList');
    const dbRef = ref(database, 'names');

    // Verifique se o nó 'names' existe e inicialize se necessário
    get(dbRef).then((snapshot) => {
        if (!snapshot.exists()) {
            set(dbRef, {});
        }
    });

    onValue(dbRef, (snapshot) => {
        nameList.innerHTML = '';
        const data = snapshot.val();
        if (data) {
            Object.keys(data).forEach(key => {
                const listItem = createListItem(data[key].name);
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
            nameList.innerHTML = '';
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
    const dbRef = ref(database, 'names');

    get(child(dbRef, name)).then((snapshot) => {
        if (snapshot.exists()) {
            messageElement.textContent = `Error: ${name} já está na lista.`;
        } else {
            messageElement.textContent = `Notification: ${name} pressed the button.`;
            set(child(dbRef, name), { name });
        }
    });
});

function createListItem(name) {
    const listItem = document.createElement('li');
    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;
    listItem.appendChild(nameSpan);
    
//FUNCIONOU PORRAAAAA
    
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
