document.addEventListener('DOMContentLoaded', () => {
    let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
    let profitPerHour = parseInt(localStorage.getItem('profitPerHour')) || 0;
    let energy = parseInt(localStorage.getItem('energy')) || 1000;
    let clickCost = parseInt(localStorage.getItem('clickCost')) || 50;
    let level = parseInt(localStorage.getItem('level')) || 1;
    let experience = parseInt(localStorage.getItem('experience')) || 0;
    let experienceToNextLevel = parseInt(localStorage.getItem('experienceToNextLevel')) || 100;
    let autoClickers = parseInt(localStorage.getItem('autoClickers')) || 0;

    const clickCountDisplay = document.getElementById('clickCount');
    const profitPerHourDisplay = document.getElementById('profitPerHour');
    const energyDisplay = document.getElementById('energy');
    const levelDisplay = document.getElementById('level');
    const experienceDisplay = document.getElementById('experience');
    const experienceToNextLevelDisplay = document.getElementById('experienceToNextLevel');
    const clickButton = document.getElementById('clickButton');
    const shopToggle = document.getElementById('shopToggle');
    const shopContainer = document.getElementById('shopContainer');
    const inviteFriends = document.getElementById('inviteFriends');
    const buyClickButton = document.getElementById('buyClick');
    const buyEnergyButton = document.getElementById('buyEnergy');
    const incomeUpgrade1Button = document.getElementById('incomeUpgrade1');
    const incomeUpgrade2Button = document.getElementById('incomeUpgrade2');
    const incomeUpgrade3Button = document.getElementById('incomeUpgrade3');
    const buyAutoClickerButton = document.getElementById('buyAutoClicker');
    const clickCostDisplay = document.getElementById('clickCost');
    const particleContainer = document.getElementById('particle-container');
    const dailyBonusButton = document.getElementById('dailyBonus');
    const leaderboardToggle = document.getElementById('leaderboardToggle');
    const leaderboardContainer = document.getElementById('leaderboardContainer');
    const leaderboard = document.getElementById('leaderboard');

    clickCountDisplay.textContent = clickCount;
    profitPerHourDisplay.textContent = profitPerHour;
    energyDisplay.textContent = energy;
    levelDisplay.textContent = level;
    experienceDisplay.textContent = experience;
    experienceToNextLevelDisplay.textContent = experienceToNextLevel;
    clickCostDisplay.textContent = clickCost;

    clickButton.addEventListener('click', (event) => {
        if (energy > 0) {
            clickCount += 1;
            experience += 1;
            energy -= 1;
            clickCountDisplay.textContent = clickCount;
            energyDisplay.textContent = energy;
            experienceDisplay.textContent = experience;
            createParticles(event.clientX, event.clientY);
            updateButtonStates();
            saveProgress();
            levelUp();
        } else {
            alert("Не хватает энергии!");
        }
    });

    shopToggle.addEventListener('click', () => {
        if (shopContainer.style.display === 'none' || shopContainer.style.display === '') {
            shopContainer.style.display = 'block';
            shopToggle.textContent = 'Закрыть магазин';
        } else {
            shopContainer.style.display = 'none';
            shopToggle.textContent = 'Открыть магазин';
        }
    });

    inviteFriends.addEventListener('click', () => {
        alert("Пригласите друзей, чтобы получить бонусы!");
    });

    buyClickButton.addEventListener('click', () => {
        if (clickCount >= clickCost) {
            clickCount -= clickCost;
            clickCost *= 2;
            clickCountDisplay.textContent = clickCount;
            clickCostDisplay.textContent = clickCost;
            updateButtonStates();
            saveProgress();
        }
    });

    buyEnergyButton.addEventListener('click', () => {
        if (clickCount >= 500) {
            clickCount -= 500;
            energy += 1000;
            clickCountDisplay.textContent = clickCount;
            energyDisplay.textContent = energy;
            updateButtonStates();
            saveProgress();
        }
    });

    incomeUpgrade1Button.addEventListener('click', () => {
        if (clickCount >= 1000) {
            clickCount -= 1000;
            profitPerHour += 10;
            clickCountDisplay.textContent = clickCount;
            profitPerHourDisplay.textContent = profitPerHour;
            updateButtonStates();
            saveProgress();
        }
    });

    incomeUpgrade2Button.addEventListener('click', () => {
        if (clickCount >= 10000) {
            clickCount -= 10000;
            profitPerHour += 100;
            clickCountDisplay.textContent = clickCount;
            profitPerHourDisplay.textContent = profitPerHour;
            updateButtonStates();
            saveProgress();
        }
    });

    incomeUpgrade3Button.addEventListener('click', () => {
        if (clickCount >= 100000) {
            clickCount -= 100000;
            profitPerHour += 1000;
            clickCountDisplay.textContent = clickCount;
            profitPerHourDisplay.textContent = profitPerHour;
            updateButtonStates();
            saveProgress();
        }
    });

    buyAutoClickerButton.addEventListener('click', () => {
        if (clickCount >= 5000) {
            clickCount -= 5000;
            autoClickers += 1;
            clickCountDisplay.textContent = clickCount;
            updateButtonStates();
            saveProgress();
            setInterval(() => {
                clickCount += autoClickers;
                clickCountDisplay.textContent = clickCount;
                saveProgress();
            }, 1000);
        }
    });

    dailyBonusButton.addEventListener('click', () => {
        const lastClaimed = localStorage.getItem('lastClaimedBonus');
        const now = new Date().getTime();

        if (!lastClaimed || now - lastClaimed >= 86400000) { // 24 часа
            clickCount += 100;
            clickCountDisplay.textContent = clickCount;
            localStorage.setItem('lastClaimedBonus', now);
            saveProgress();
            alert("Вы получили ежедневный бонус в 100 монет!");
        } else {
            alert("Ежедневный бонус можно получать раз в 24 часа.");
        }
    });

    leaderboardToggle.addEventListener('click', () => {
        if (leaderboardContainer.style.display === 'none' || leaderboardContainer.style.display === '') {
            leaderboardContainer.style.display = 'block';
            leaderboardToggle.textContent = 'Закрыть таблицу лидеров';
        } else {
            leaderboardContainer.style.display = 'none';
            leaderboardToggle.textContent = 'Таблица лидеров';
        }
    });

    function createParticles(x, y) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particleContainer.appendChild(particle);
            setTimeout(() => {
                particle.remove();
            }, 500);
        }
    }

    function updateButtonStates() {
        updateButtonState(buyClickButton, clickCost);
        updateButtonState(buyEnergyButton, 500);
        updateButtonState(incomeUpgrade1Button, 1000);
        updateButtonState(incomeUpgrade2Button, 10000);
        updateButtonState(incomeUpgrade3Button, 100000);
        updateButtonState(buyAutoClickerButton, 5000);
    }

    function updateButtonState(button, cost) {
        if (clickCount >= cost) {
            button.classList.add('enabled');
            button.classList.remove('disabled');
        } else {
            button.classList.add('disabled');
            button.classList.remove('enabled');
        }
    }

    function levelUp() {
        if (experience >= experienceToNextLevel) {
            level += 1;
            experience -= experienceToNextLevel;
            experienceToNextLevel *= 2;
            levelDisplay.textContent = level;
            experienceDisplay.textContent = experience;
            experienceToNextLevelDisplay.textContent = experienceToNextLevel;
            alert(`Поздравляем! Вы достигли уровня ${level}!`);
        }
    }

    function saveProgress() {
        localStorage.setItem('clickCount', clickCount);
        localStorage.setItem('profitPerHour', profitPerHour);
        localStorage.setItem('energy', energy);
        localStorage.setItem('clickCost', clickCost);
        localStorage.setItem('level', level);
        localStorage.setItem('experience', experience);
        localStorage.setItem('experienceToNextLevel', experienceToNextLevel);
        localStorage.setItem('autoClickers', autoClickers);
    }

    function loadLeaderboard() {
        // Ваша логика загрузки и отображения таблицы лидеров
    }

    // Добавляем прибыль в час к общему количеству кликов каждую минуту для тестирования (каждый час в реальной версии)
    setInterval(() => {
        clickCount += profitPerHour / 60; // Делим на 60 для минутного обновления
        clickCountDisplay.textContent = clickCount;
        updateButtonStates();
        saveProgress();
    }, 60000); // 60000 миллисекунд = 1 минута

    updateButtonStates();
    loadLeaderboard();
});
