document.addEventListener('DOMContentLoaded', function () {
  const savedData = localStorage.getItem('assassinsScoreData');
  const tableBody = document.getElementById('scoreTableBody');

  if (savedData) {
    populateTable(JSON.parse(savedData));
  } else {
    const emptyTeams = Array(25).fill().map((_, i) => ({
      pos: String(i + 1).padStart(2, '0'),
      name: '',
      members: ['', '', '', ''],
      mp: '0.0',
      kp: '0.0',
      pp: '0.0',
      tt: '0.0',
      cd: '0.0'
    }));
    populateTable(emptyTeams);
  }

  document.getElementById('backLink').addEventListener('click', function (e) {
    e.preventDefault();
    saveData();
    window.location.href = 'assassins-home.html';
  });
});

function populateTable(teams) {
  const tableBody = document.getElementById('scoreTableBody');
  tableBody.innerHTML = '';

  teams.forEach((team, index) => {
    team.members = team.members || ['', '', '', ''];

    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="pos-cell">${team.pos}</td>
      <td><input type="text" class="launcher-cell" data-field="name" value="${team.name}" placeholder="Team name" /></td>
      <td class="input-cell">
        <input type="text" class="launcher-cell" data-field="members" value="${team.members[0]}" placeholder="Member 1" /> <br>
        <input type="text" class="launcher-cell" data-field="members" value="${team.members[1]}" placeholder="Member 2" /> <br>
        <input type="text" class="launcher-cell" data-field="members" value="${team.members[2]}" placeholder="Member 3" /> <br>
        <input type="text" class="launcher-cell" data-field="members" value="${team.members[3]}" placeholder="Member 4" />
      </td>
      ${createLauncherCell(team.mp, index, 'mp')}
      ${createLauncherCell(team.kp, index, 'kp')}
      ${createLauncherCell(team.pp, index, 'pp')}
      ${createLauncherCell(team.tt, index, 'tt')}
      ${createLauncherCell(team.cd, index, 'cd')}
    `;

    tableBody.appendChild(row);
  });

  document.querySelectorAll('.launcher-cell[data-field]').forEach(cell => {
    cell.addEventListener('click', function (e) {
      if (e.target.tagName === 'INPUT') return;
      openNumberSelector(this, this.getAttribute('data-field'));
    });
  });
}

function createLauncherCell(value, index, field, min = 0, max = 10, step = 0.1) {
  return `<td><div class="launcher-cell" data-index="${index}" data-field="${field}" data-min="${min}" data-max="${max}" data-step="${step}">${value}</div></td>`;
}

function openNumberSelector(cell, field) {
  const min = parseFloat(cell.dataset.min || '0');
  const max = parseFloat(cell.dataset.max || '10');
  const step = parseFloat(cell.dataset.step || '0.1');
  const index = cell.dataset.index;
  const modalRoot = document.getElementById('modalRoot');

  const values = [];
  for (let val = min; val <= max; val += step) {
    values.push(val.toFixed(1));
  }

  modalRoot.innerHTML = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <h2>Select ${field.toUpperCase()}</h2>
        <div class="number-grid">
          ${values.map(val => `<button onclick="selectValue('${index}', '${field}', '${val}')">${val}</button>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function closeModal(e) {
  if (e.target.classList.contains('modal-overlay')) {
    document.getElementById('modalRoot').innerHTML = '';
  }
}

function selectValue(index, field, value) {
  const targetCell = document.querySelector(`.launcher-cell[data-index="${index}"][data-field="${field}"]`);
  if (targetCell) targetCell.textContent = value;
  document.getElementById('modalRoot').innerHTML = '';
  saveData();
}

function saveData() {
  const rows = document.querySelectorAll('#scoreTableBody tr');
  const teams = [];

  rows.forEach(row => {
    const teamData = {};
    teamData.pos = row.querySelector('.pos-cell').textContent;
    teamData.name = row.querySelector('input[data-field="name"]').value;
    teamData.members = Array.from(row.querySelectorAll('input[data-field="members"]')).map(input => input.value);

    row.querySelectorAll('.launcher-cell[data-field]').forEach(cell => {
      const field = cell.dataset.field;
      teamData[field] = cell.textContent;
    });

    teams.push(teamData);
  });

  localStorage.setItem('assassinsScoreData', JSON.stringify(teams));
}