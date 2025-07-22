// Sample games data with classic unblocked games
const gamesData = [
    {
        id: 1,
        title: "Happy Wheels",
        description: "Physics-based obstacle course game with ragdoll characters",
        category: "action",
        thumbnail: "🚴",
        plays: "2.3M",
        rating: "4.8",
        url: "games/happy-wheels"
    },
    {
        id: 2,
        title: "Super Smash Flash 2",
        description: "Fan-made fighting game featuring Nintendo characters",
        category: "action",
        thumbnail: "👊",
        plays: "1.8M",
        rating: "4.7",
        url: "games/super-smash-flash-2"
    },
    {
        id: 3,
        title: "Run 3",
        description: "Endless running game in space with gravity-defying mechanics",
        category: "adventure",
        thumbnail: "🏃",
        plays: "3.1M",
        rating: "4.9",
        url: "games/run-3"
    },
    {
        id: 4,
        title: "Tank Trouble",
        description: "Multiplayer tank battle game in a maze",
        category: "multiplayer",
        thumbnail: "🔫",
        plays: "1.5M",
        rating: "4.6",
        url: "games/tank-trouble"
    },
    {
        id: 5,
        title: "Papa's Pizzeria",
        description: "Time management cooking game making pizzas",
        category: "puzzle",
        thumbnail: "🍕",
        plays: "2.7M",
        rating: "4.8",
        url: "games/papas-pizzeria"
    },
    {
        id: 6,
        title: "Slope",
        description: "High-speed ball rolling down endless slopes",
        category: "action",
        thumbnail: "⚽",
        plays: "4.2M",
        rating: "4.9",
        url: "games/slope"
    },
    {
        id: 7,
        title: "2048",
        description: "Number puzzle game - combine tiles to reach 2048",
        category: "puzzle",
        thumbnail: "🔢",
        plays: "1.9M",
        rating: "4.5",
        url: "games/2048"
    },
    {
        id: 8,
        title: "Moto X3M",
        description: "Bike racing game with stunts and obstacles",
        category: "racing",
        thumbnail: "🏍️",
        plays: "2.1M",
        rating: "4.7",
        url: "games/moto-x3m"
    },
    {
        id: 9,
        title: "Getting Over It",
        description: "Challenging climbing game with a hammer",
        category: "adventure",
        thumbnail: "🔨",
        plays: "1.4M",
        rating: "4.3",
        url: "games/getting-over-it"
    },
    {
        id: 10,
        title: "Shell Shockers",
        description: "First-person shooter with egg characters",
        category: "multiplayer",
        thumbnail: "🥚",
        plays: "3.5M",
        rating: "4.8",
        url: "games/shell-shockers"
    },
    {
        id: 11,
        title: "Chrome Dino",
        description: "The classic offline Chrome dinosaur game",
        category: "action",
        thumbnail: "🦕",
        plays: "5.1M",
        rating: "4.6",
        url: "games/chrome-dino"
    },
    {
        id: 12,
        title: "Friday Night Funkin'",
        description: "Rhythm game with catchy beats and rap battles",
        category: "puzzle",
        thumbnail: "🎵",
        plays: "2.8M",
        rating: "4.9",
        url: "games/friday-night-funkin"
    }
];

let currentFilter = 'all';
let searchQuery = '';

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    displayGames(gamesData);
    setupEventListeners();
});

// Display games in the grid
function displayGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');
    
    if (!gamesGrid) return;
    
    gamesGrid.innerHTML = '';
    
    games.forEach((game, index) => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.style.animationDelay = `${index * 0.1}s`;
        
        gameCard.innerHTML = `
            <div class="game-thumbnail">
                ${game.thumbnail}
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <div class="game-meta">
                    <span class="game-category">${game.category}</span>
                    <span class="game-plays">${game.plays} plays</span>
                </div>
            </div>
        `;
        
        gameCard.addEventListener('click', () => playGame(game));
        gamesGrid.appendChild(gameCard);
    });
}

// Filter games by category
function filterGames(category) {
    currentFilter = category;
    
    // Update sidebar active state
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Find and activate the clicked category
    const categoryItems = document.querySelectorAll('.sidebar-item');
    categoryItems.forEach(item => {
        const text = item.querySelector('.sidebar-text');
        if (text && text.textContent.toLowerCase().includes(category.toLowerCase())) {
            item.classList.add('active');
        }
    });
    
    const filteredGames = category === 'all' 
        ? gamesData 
        : gamesData.filter(game => game.category === category);
    
    const searchFiltered = searchQuery 
        ? filteredGames.filter(game => 
            game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            game.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : filteredGames;
    
    displayGames(searchFiltered);
    
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

// Search games
function searchGames() {
    const searchInput = document.getElementById('searchInput');
    searchQuery = searchInput.value.trim();
    
    const filteredGames = currentFilter === 'all' 
        ? gamesData 
        : gamesData.filter(game => game.category === currentFilter);
    
    const searchFiltered = searchQuery 
        ? filteredGames.filter(game => 
            game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            game.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : filteredGames;
    
    displayGames(searchFiltered);
}

// Play game function
function playGame(game) {
    // Create a modal-style game player
    const gameModal = document.createElement('div');
    gameModal.className = 'game-modal';
    gameModal.innerHTML = `
        <div class="game-modal-content">
            <div class="game-modal-header">
                <h2>${game.title}</h2>
                <button class="close-game" onclick="closeGame()">&times;</button>
            </div>
            <div class="game-modal-body">
                <div class="game-placeholder">
                    <div class="game-icon">${game.thumbnail}</div>
                    <h3>Game Loading...</h3>
                    <p>This is where "${game.title}" would load</p>
                    <p class="game-note">In a real implementation, this would embed the actual game.</p>
                    <button class="roblox-btn" onclick="closeGame()">Back to Games</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
        .game-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .game-modal-content {
            background: white;
            border-radius: 12px;
            width: 90%;
            max-width: 800px;
            height: 90%;
            max-height: 600px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        
        .game-modal-header {
            background: linear-gradient(135deg, #00a2ff 0%, #0078d4 100%);
            color: white;
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .game-modal-header h2 {
            margin: 0;
            font-size: 24px;
        }
        
        .close-game {
            background: none;
            border: none;
            color: white;
            font-size: 32px;
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
        }
        
        .close-game:hover {
            background: rgba(255,255,255,0.2);
        }
        
        .game-modal-body {
            height: calc(100% - 72px);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .game-placeholder {
            text-align: center;
            padding: 40px;
        }
        
        .game-placeholder .game-icon {
            font-size: 120px;
            margin-bottom: 24px;
        }
        
        .game-placeholder h3 {
            font-size: 28px;
            margin-bottom: 16px;
            color: #333;
        }
        
        .game-placeholder p {
            font-size: 16px;
            color: #666;
            margin-bottom: 12px;
        }
        
        .game-note {
            font-style: italic;
            color: #999 !important;
            margin-bottom: 32px !important;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(gameModal);
    document.body.style.overflow = 'hidden';
    
    // Add escape key listener
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGame();
        }
    });
}

// Close game modal
function closeGame() {
    const gameModal = document.querySelector('.game-modal');
    if (gameModal) {
        gameModal.remove();
        document.body.style.overflow = '';
    }
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchGames();
            }
        });
        
        // Real-time search
        searchInput.addEventListener('input', function() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                searchGames();
            }, 300);
        });
    }
    
    // Home sidebar item
    const homeItem = document.querySelector('.sidebar-item');
    if (homeItem) {
        homeItem.addEventListener('click', function(e) {
            e.preventDefault();
            currentFilter = 'all';
            searchQuery = '';
            if (searchInput) searchInput.value = '';
            
            // Update active state
            document.querySelectorAll('.sidebar-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            displayGames(gamesData);
            
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.querySelector('.hamburger-menu');
        
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleSidebar();
        }
    });
    
    // Responsive sidebar behavior
    window.addEventListener('resize', function() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
    });
}

// Add some YouTube-style animations and effects
function addYouTubeEffects() {
    // Animate search bar focus
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
    }
    
    // Add hover effects to game cards
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.game-card')) {
            const card = e.target.closest('.game-card');
            card.style.transform = 'translateY(-4px) scale(1.02)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.game-card')) {
            const card = e.target.closest('.game-card');
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
}

// Initialize effects
document.addEventListener('DOMContentLoaded', addYouTubeEffects);

// Add some classic Roblox-style notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = `
        <style>
        .notification {
            position: fixed;
            top: 80px;
            right: 24px;
            background: white;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            border-left: 4px solid #00a2ff;
            min-width: 300px;
        }
        
        .notification-success {
            border-left-color: #00c851;
        }
        
        .notification-error {
            border-left-color: #ff4444;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-icon {
            font-size: 20px;
        }
        
        .notification-message {
            font-weight: 500;
            color: #333;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        </style>
    `;
    
    if (!document.querySelector('.notification-styles')) {
        const styles = document.createElement('div');
        styles.className = 'notification-styles';
        styles.innerHTML = notificationStyles;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Example usage - show welcome message
setTimeout(() => {
    showNotification('Welcome to RetroGames! Enjoy the nostalgic experience.', 'success');
}, 1000);