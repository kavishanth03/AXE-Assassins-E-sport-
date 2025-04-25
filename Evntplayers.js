    document.addEventListener('DOMContentLoaded', function() {
        const tableBody = document.getElementById('scoreTableBody');
        const savedTeams = JSON.parse(localStorage.getItem('teamData')) || [];

        for (let i = 0; i < 25; i++) {
            const row = document.createElement('tr');
            const teamData = savedTeams[i] || {};

            const posCell = document.createElement('td');
            posCell.textContent = i + 1;
            posCell.className = 'pos-cell';

            const nameCell = document.createElement('td');
            nameCell.innerHTML = `<input type="text" placeholder="Enter team name" value="${teamData.name || ''}">`;

            const emailCell = document.createElement('td');
            emailCell.innerHTML = `<input type="email" placeholder="Enter email" value="${teamData.email || ''}">`;

            const phoneCell = document.createElement('td');
            phoneCell.innerHTML = `<input type="tel" placeholder="Enter phone number" value="${teamData.phone || ''}">`;

            row.appendChild(posCell);
            row.appendChild(nameCell);
            row.appendChild(emailCell);
            row.appendChild(phoneCell);

            tableBody.appendChild(row);
        }

        // Save data when leaving the page
        window.addEventListener('beforeunload', function() {
            const inputs = document.querySelectorAll('#scoreTableBody input');
            const teamsData = [];

            for (let i = 0; i < 25; i++) {
                const name = inputs[i * 3].value;
                const email = inputs[i * 3 + 1].value;
                const phone = inputs[i * 3 + 2].value;

                if (name || email || phone) {
                    teamsData.push({
                        position: i + 1,
                        name: name,
                        email: email,
                        phone: phone
                    });
                }
            }

            localStorage.setItem('teamData', JSON.stringify(teamsData));
        });
    });