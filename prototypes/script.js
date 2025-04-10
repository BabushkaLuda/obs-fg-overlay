
function updateNamesAndScores() {
	const player1Name = document.getElementById('player1List').value;
	const player2Name = document.getElementById('player2List').value;
	const score1 = document.getElementById('score1Input').value;
	const score2 = document.getElementById('score2Input').value;
	const player1Bg = document.getElementById('player1Bg');
	const player2Bg = document.getElementById('player2Bg');

	if (player1Name) document.getElementById('player1Name').innerText = player1Name;
	if (player2Name) document.getElementById('player2Name').innerText = player2Name;
	if (score1) document.getElementById('player1Score').innerText = score1;
	if (score2) document.getElementById('player2Score').innerText = score2;
	if (player1Bg) document.getElementById('player1Bg').src = player1Name.toLowerCase() + ".png";
	if (player2Bg) document.getElementById('player2Bg').src = player2Name.toLowerCase() + ".png";
}

function swapPlayers() {
	const player1Name = document.getElementById('player1Name');
	const player2Name = document.getElementById('player2Name');
	const player1NameL = document.getElementById('player1List');
	const player2NameL = document.getElementById('player2List');
	const player1Score = document.getElementById('player1Score');
	const player2Score = document.getElementById('player2Score');
	const player1Bg = document.getElementById('player1Bg');
	const player2Bg = document.getElementById('player2Bg');
	const player1ScoreI = document.getElementById('score1Input');
	const player2ScoreI = document.getElementById('score2Input');

	const tempName = player1Name.innerText;
	const tempScore = player1Score.innerText;
	const tempBg = player1Bg.src;
	const tempList = player1NameL.value;
	const tempScoreI = player1ScoreI.value;

	player1Name.innerText = player2Name.innerText;
	player1Score.innerText = player2Score.innerText;
	player1NameL.value = player2NameL.value;
	player1ScoreI.value = player2ScoreI.value;
	player1Bg.src = player2Bg.src;

	player2Name.innerText = tempName;
	player2Score.innerText = tempScore;
	player2NameL.value = tempList;
	player2ScoreI.value = tempScoreI;
	player2Bg.src = tempBg;
}
	
	
fetch('http://localhost:8080/overlay/data.txt')
	.then(response => {
		if (!response.ok) {
			throw new Error('Сетевой запрос не удался');
		}
		return response.text();
	})
	.then(data => {
		const lines = data.split('\n');
		const selectElements = document.querySelectorAll('.mySelect');

		selectElements.forEach(select => {
			// Для каждого select очищаем старые опции
			select.innerHTML = '';

			// Добавляем пустую опцию (если нужно)
			const defaultOption = document.createElement('option');
			defaultOption.textContent = 'Выберите значение';
			defaultOption.value = '';
			select.appendChild(defaultOption);

			// Для каждой строки из файла создаем новую опцию
			lines.forEach(line => {
				if (line.trim()) {  // Если строка не пустая
					const option = document.createElement('option');
					option.textContent = line.trim();
					option.value = line.trim();
					select.appendChild(option);
				}
			});
		});
	})
	.catch(error => {
		console.error('Ошибка загрузки данных:', error);
	});