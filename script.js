class MemoryGame {
    constructor() {
        this.selectedCategory = null;
        this.selectedDifficulty = 24; // Default to medium (4x6)
        this.gameData = {
            places: [
                { emoji: '🗼', name: 'Eiffel Tower' },
                { emoji: '🏛️', name: 'Parthenon' },
                { emoji: '🏰', name: 'Castle' },
                { emoji: '🏯', name: 'Japanese Castle' },
                { emoji: '🗽', name: 'Statue of Liberty' },
                { emoji: '🎡', name: 'Ferris Wheel' },
                { emoji: '🌉', name: 'Golden Gate Bridge' },
                { emoji: '🏔️', name: 'Mountain' },
                { emoji: '🗻', name: 'Mount Fuji' },
                { emoji: '🏖️', name: 'Beach' },
                { emoji: '🏜️', name: 'Desert' },
                { emoji: '🌋', name: 'Volcano' },
                { emoji: '🏟️', name: 'Stadium' },
                { emoji: '🎪', name: 'Circus Tent' },
                { emoji: '🎭', name: 'Theatre' },
                { emoji: '🏛️', name: 'Museum' },
                { emoji: '🏕️', name: 'Camping' },
                { emoji: '🏝️', name: 'Island' },
                { emoji: '🌁', name: 'Foggy City' },
                { emoji: '🎢', name: 'Roller Coaster' }
            ],
            sports: [
                { emoji: '⚽', name: 'Soccer Ball' },
                { emoji: '🏀', name: 'Basketball' },
                { emoji: '🎾', name: 'Tennis Ball' },
                { emoji: '🏈', name: 'American Football' },
                { emoji: '🏐', name: 'Volleyball' },
                { emoji: '🏓', name: 'Ping Pong' },
                { emoji: '⛳', name: 'Golf' },
                { emoji: '🎱', name: 'Pool Ball' },
                { emoji: '🏸', name: 'Badminton' },
                { emoji: '🥊', name: 'Boxing Gloves' },
                { emoji: '🏒', name: 'Ice Hockey' },
                { emoji: '🥅', name: 'Goal Net' },
                { emoji: '🎯', name: 'Dart Board' },
                { emoji: '🏹', name: 'Archery' },
                { emoji: '🎿', name: 'Skiing' },
                { emoji: '🏄', name: 'Surfing' },
                { emoji: '🏊', name: 'Swimming' },
                { emoji: '🚴', name: 'Cycling' },
                { emoji: '🤸', name: 'Gymnastics' },
                { emoji: '🏋️', name: 'Weight Lifting' }
            ],
            animals: [
                { emoji: '🦁', name: 'Lion' },
                { emoji: '🐵', name: 'Monkey' },
                { emoji: '🐘', name: 'Elephant' },
                { emoji: '🐯', name: 'Tiger' },
                { emoji: '🐼', name: 'Panda' },
                { emoji: '🦒', name: 'Giraffe' },
                { emoji: '🦓', name: 'Zebra' },
                { emoji: '🐨', name: 'Koala' },
                { emoji: '🦘', name: 'Kangaroo' },
                { emoji: '🐧', name: 'Penguin' },
                { emoji: '🦅', name: 'Eagle' },
                { emoji: '🐺', name: 'Wolf' },
                { emoji: '🦊', name: 'Fox' },
                { emoji: '🐻', name: 'Bear' },
                { emoji: '🐙', name: 'Octopus' },
                { emoji: '🦋', name: 'Butterfly' },
                { emoji: '🐬', name: 'Dolphin' },
                { emoji: '🦈', name: 'Shark' },
                { emoji: '🐢', name: 'Turtle' },
                { emoji: '🦎', name: 'Lizard' }
            ]
        };
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.time = 0;
        this.timer = null;
        this.gameStarted = false;
        this.score = 0;
        this.currentGameItems = [];
        this.hintsUsed = 0;
        this.maxHints = 0;
        
        this.initializeElements();
        this.setupEventListeners();
        this.initializeDefaults();
    }
    
    initializeElements() {
        // Screens
        this.mainMenuScreen = document.getElementById('main-menu');
        this.gameScreen = document.getElementById('game-screen');
        this.winScreen = document.getElementById('win-screen');
        
        // Main menu elements
        this.categoryOptions = document.querySelectorAll('.category-option');
        this.difficultyOptions = document.querySelectorAll('.difficulty-option');
        this.playButton = document.getElementById('play-btn');
        
        // Game elements
        this.backButton = document.getElementById('back-btn');
        this.gameBoard = document.getElementById('game-board');
        this.movesCount = document.getElementById('moves-count');
        this.timerDisplay = document.getElementById('timer');
        this.restartButton = document.getElementById('restart-btn');
        this.hintButton = document.getElementById('hint-btn');
        
        // Win screen elements
        this.playAgainButton = document.getElementById('play-again-btn');
        this.menuButton = document.getElementById('menu-btn');
        this.finalMoves = document.getElementById('final-moves');
        this.finalTime = document.getElementById('final-time');
        this.finalScore = document.getElementById('final-score');
        
        // Modal elements
        this.howToPlayButton = document.getElementById('how-to-play-btn');
        this.modal = document.getElementById('how-to-play-modal');
        this.closeModalButton = document.getElementById('close-modal');
    }
    
    setupEventListeners() {
        // Category selection
        this.categoryOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectCategory(e.currentTarget.dataset.category);
            });
        });
        
        // Difficulty selection
        this.difficultyOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectDifficulty(parseInt(e.currentTarget.dataset.size));
            });
        });
        
        // Navigation buttons
        this.playButton.addEventListener('click', () => this.startGame());
        this.backButton.addEventListener('click', () => this.showMainMenu());
        this.restartButton.addEventListener('click', () => this.restartGame());
        this.hintButton.addEventListener('click', () => this.showHint());
        this.playAgainButton.addEventListener('click', () => this.startGame());
        this.menuButton.addEventListener('click', () => this.showMainMenu());
        
        // Modal buttons
        this.howToPlayButton.addEventListener('click', () => this.showModal());
        this.closeModalButton.addEventListener('click', () => this.hideModal());
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.hideModal();
            }
        });
        
        // Window resize handler for responsive layout
        window.addEventListener('resize', () => {
            if (this.gameStarted) {
                this.setGridSize();
            }
        });
    }
    
    selectCategory(category) {
        // Remove previous selection
        this.categoryOptions.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selection to clicked category
        const selectedOption = document.querySelector(`[data-category="${category}"]`);
        selectedOption.classList.add('selected');
        
        this.selectedCategory = category;
        this.updatePlayButton();
        
        // Add animation effect
        selectedOption.style.transform = 'scale(1.1)';
        setTimeout(() => {
            selectedOption.style.transform = 'scale(1.05)';
        }, 200);
    }
    
    selectDifficulty(size) {
        // Remove previous selection
        this.difficultyOptions.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selection to clicked difficulty
        const selectedOption = document.querySelector(`[data-size="${size}"]`);
        selectedOption.classList.add('selected');
        
        this.selectedDifficulty = size;
        this.updatePlayButton();
        
        // Add animation effect
        selectedOption.style.transform = 'scale(1.1)';
        setTimeout(() => {
            selectedOption.style.transform = 'scale(1.05)';
        }, 200);
    }
    
    updatePlayButton() {
        this.playButton.disabled = !(this.selectedCategory && this.selectedDifficulty);
    }
    
    startGame() {
        if (!this.selectedCategory) return;
        
        this.showGameScreen();
        this.resetGameState();
        this.createGameBoard();
        this.startTimer();
    }
    
    restartGame() {
        this.stopTimer();
        this.resetGameState();
        this.createGameBoard();
        this.startTimer();
    }
    
    resetGameState() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.time = 0;
        this.gameStarted = true;
        this.hintsUsed = 0;
        
        // Set max hints based on difficulty
        const hintLimits = {
            16: 2,  // Easy - 2 hints
            24: 3,  // Medium - 3 hints
            36: 5   // Hard - 5 hints
        };
        this.maxHints = hintLimits[this.selectedDifficulty];
        
        this.updateMoves();
        this.updateTimer();
        this.updateHintButton();
    }
    
    createGameBoard() {
        // Calculate pairs needed based on difficulty
        const totalPairs = this.selectedDifficulty / 2;
        
        // Get category data and randomly select the needed number of items
        const categoryData = this.gameData[this.selectedCategory];
        const shuffledData = [...categoryData].sort(() => Math.random() - 0.5);
        this.currentGameItems = shuffledData.slice(0, totalPairs);
        
        // Create pairs
        const gameCards = [...this.currentGameItems, ...this.currentGameItems];
        
        // Shuffle cards
        this.shuffleArray(gameCards);
        
        // Clear board and set grid size
        this.gameBoard.innerHTML = '';
        this.setGridSize();
        
        // Create card elements
        gameCards.forEach((cardData, index) => {
            const card = this.createCard(cardData, index);
            this.gameBoard.appendChild(card);
            this.cards.push({
                element: card,
                data: cardData,
                emoji: cardData.emoji,
                name: cardData.name,
                id: index,
                isFlipped: false,
                isMatched: false
            });
        });
    }
    
    setGridSize() {
        // Define grid dimensions for each difficulty
        const gridConfigs = {
            16: { rows: 4, cols: 4 }, // 4x4
            24: { rows: 4, cols: 6 }, // 4x6
            36: { rows: 6, cols: 6 }  // 6x6
        };
        
        const config = gridConfigs[this.selectedDifficulty];
        this.gameBoard.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;
        this.gameBoard.style.gridTemplateRows = `repeat(${config.rows}, 1fr)`;
        
        // Check if we're on mobile
        const isMobile = window.innerWidth <= 768;
        
        // Adjust card size and board settings based on difficulty and screen size
        const settings = {
            16: { 
                cardSize: isMobile ? '80px' : '120px', 
                maxWidth: isMobile ? '400px' : '600px', 
                gap: isMobile ? '0.4rem' : '0.75rem' 
            },
            24: { 
                cardSize: isMobile ? '60px' : '90px', 
                maxWidth: isMobile ? '420px' : '700px', 
                gap: isMobile ? '0.3rem' : '0.5rem' 
            },
            36: { 
                cardSize: isMobile ? '50px' : '105px', 
                maxWidth: isMobile ? '350px' : '800px', 
                gap: isMobile ? '0.25rem' : '0.6rem' 
            }
        };
        
        const setting = settings[this.selectedDifficulty];
        this.gameBoard.style.setProperty('--card-size', setting.cardSize);
        this.gameBoard.style.maxWidth = setting.maxWidth;
        this.gameBoard.style.gap = setting.gap;
        
        // Set font sizes for emojis based on difficulty
        const fontSizes = {
            16: isMobile ? '2rem' : '2.5rem',
            24: isMobile ? '1.8rem' : '2.3rem',
            36: isMobile ? '1.5rem' : '2.1rem'
        };
        
        // Apply font size to all card-back elements
        document.documentElement.style.setProperty('--emoji-font-size', fontSizes[this.selectedDifficulty]);
        
        // Adjust padding for mobile
        if (isMobile) {
            this.gameBoard.style.padding = '1rem';
        } else {
            this.gameBoard.style.padding = '2rem';
        }
    }
    
    createCard(cardData, id) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = id;
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-pattern"></div>
                </div>
                <div class="card-back">${cardData.emoji}</div>
            </div>
        `;
        
        card.addEventListener('click', () => this.flipCard(id));
        
        return card;
    }
    
    flipCard(cardId) {
        const card = this.cards[cardId];
        
        // Prevent flipping if card is already flipped, matched, or two cards are already flipped
        if (card.isFlipped || card.isMatched || this.flippedCards.length >= 2) {
            return;
        }
        
        // Flip the card
        card.element.classList.add('flipped');
        card.isFlipped = true;
        this.flippedCards.push(card);
        
        // Show label for the flipped card
        this.showCardLabel(card);
        
        // Check for match when two cards are flipped
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateMoves();
            
            setTimeout(() => {
                this.checkForMatch();
            }, 1000);
        }
    }
    
    checkForMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.emoji === card2.emoji) {
            // Match found
            card1.isMatched = true;
            card2.isMatched = true;
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');
            
            this.matchedPairs++;
            this.createSparkleEffect(card1.element);
            this.createSparkleEffect(card2.element);
            
            // Check if game is won
            if (this.matchedPairs === this.currentGameItems.length) {
                this.winGame();
            }
        } else {
            // No match - flip cards back
            card1.element.classList.remove('flipped');
            card2.element.classList.remove('flipped');
            card1.isFlipped = false;
            card2.isFlipped = false;
        }
        
        this.flippedCards = [];
    }
    
    createSparkleEffect(element) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.textContent = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = (Math.random() * 80 + 10) + '%';
                sparkle.style.top = (Math.random() * 80 + 10) + '%';
                sparkle.style.fontSize = '1.5rem';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '1000';
                
                element.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.remove();
                    }
                }, 1000);
            }, i * 200);
        }
        
        // Add golden glow effect
        element.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 2000);
    }
    
    showCardLabel(card) {
        // Remove any existing labels
        const existingLabels = document.querySelectorAll('.card-label');
        existingLabels.forEach(label => label.remove());
        
        // Create label element
        const label = document.createElement('div');
        label.className = 'card-label';
        label.textContent = card.name;
        
        // Add to document body for better positioning
        document.body.appendChild(label);
        
        // Position the label relative to the card
        const cardRect = card.element.getBoundingClientRect();
        
        label.style.position = 'fixed';
        label.style.left = (cardRect.left + cardRect.width / 2) + 'px';
        label.style.top = (cardRect.bottom + 10) + 'px';
        label.style.transform = 'translateX(-50%)';
        label.style.zIndex = '1000';
        
        // Remove label after 2 seconds
        setTimeout(() => {
            if (label.parentNode) {
                label.remove();
            }
        }, 2000);
    }
    
    calculateScore() {
        // Base score varies by difficulty
        const baseScores = {
            16: 1000,  // Easy (4x4)
            24: 1500,  // Medium (4x6)
            36: 2000   // Hard (6x6)
        };
        let baseScore = baseScores[this.selectedDifficulty];
        
        // Deduct points for moves (70% weight)
        // Perfect game moves = number of pairs, so deduct for extra moves
        const minMoves = this.selectedDifficulty / 2;
        const movePenalty = Math.max(0, (this.moves - minMoves) * 15);
        const moveScore = Math.max(0, baseScore * 0.7 - movePenalty);
        
        // Deduct points for time (30% weight)
        // Target time varies by difficulty
        const targetTimes = {
            16: 30,   // 30 seconds for easy
            24: 50,   // 50 seconds for medium
            36: 70    // 70 seconds for hard
        };
        const targetTime = targetTimes[this.selectedDifficulty];
        const timePenalty = Math.max(0, (this.time - targetTime) * 5);
        const timeScore = Math.max(0, baseScore * 0.3 - timePenalty);
        
        // Calculate final score
        this.score = Math.round(moveScore + timeScore);
        return this.score;
    }

    winGame() {
        this.stopTimer();
        this.gameStarted = false;
        
        // Calculate final score
        const finalScore = this.calculateScore();
        
        // Get maximum possible score for this difficulty
        const baseScores = {
            16: 1000,  // Easy (4x4)
            24: 1500,  // Medium (4x6)
            36: 2000   // Hard (6x6)
        };
        const maxScore = baseScores[this.selectedDifficulty];
        
        // Update final displays
        this.finalMoves.textContent = this.moves;
        this.finalTime.textContent = this.formatTime(this.time);
        this.finalScore.textContent = `${finalScore} / ${maxScore}`;
        
        // Show win screen
        this.showWinScreen();
    }
    
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.time++;
            this.updateTimer();
        }, 1000);
    }
    
    updateTimer() {
        this.timerDisplay.textContent = `Time: ${this.formatTime(this.time)}`;
    }
    
    updateMoves() {
        this.movesCount.textContent = `Moves: ${this.moves}`;
    }
    
    updateHintButton() {
        const hintsRemaining = this.maxHints - this.hintsUsed;
        if (hintsRemaining > 0) {
            this.hintButton.textContent = `Hint (${hintsRemaining})`;
            this.hintButton.disabled = false;
            this.hintButton.style.opacity = '1';
        } else {
            this.hintButton.textContent = 'No Hints Left';
            this.hintButton.disabled = true;
            this.hintButton.style.opacity = '0.5';
        }
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    showHint() {
        // Check if hints are available
        if (this.hintsUsed >= this.maxHints) {
            return; // No more hints available
        }
        
        // Find two unmatched cards with the same emoji
        const unmatchedCards = this.cards.filter(card => !card.isMatched && !card.isFlipped);
        
        // Group cards by emoji
        const cardGroups = {};
        unmatchedCards.forEach(card => {
            if (!cardGroups[card.emoji]) {
                cardGroups[card.emoji] = [];
            }
            cardGroups[card.emoji].push(card);
        });
        
        // Find a pair
        let hintPair = null;
        for (const emoji in cardGroups) {
            if (cardGroups[emoji].length >= 2) {
                hintPair = cardGroups[emoji].slice(0, 2);
                break;
            }
        }
        
        if (hintPair) {
            // Increment hints used
            this.hintsUsed++;
            
            // Add penalty moves
            this.moves += 2;
            this.updateMoves();
            this.updateHintButton();
            
            // Highlight the pair
            hintPair.forEach(card => {
                card.element.classList.add('hint-glow');
                setTimeout(() => {
                    card.element.classList.remove('hint-glow');
                }, 2000);
            });
        }
    }
    
    showGameScreen() {
        this.mainMenuScreen.classList.remove('active');
        this.gameScreen.classList.add('active');
        this.winScreen.classList.remove('active');
    }
    
    showWinScreen() {
        this.mainMenuScreen.classList.remove('active');
        this.gameScreen.classList.remove('active');
        this.winScreen.classList.add('active');
    }
    
    showMainMenu() {
        this.stopTimer();
        this.mainMenuScreen.classList.add('active');
        this.gameScreen.classList.remove('active');
        this.winScreen.classList.remove('active');
        
        // Reset selections
        this.categoryOptions.forEach(option => {
            option.classList.remove('selected');
        });
        this.difficultyOptions.forEach(option => {
            option.classList.remove('selected');
        });
        this.selectedCategory = null;
        this.selectedDifficulty = 24; // Reset to default
        this.updatePlayButton();
        
        // Re-select default difficulty
        const defaultDifficulty = document.querySelector('[data-size="24"]');
        if (defaultDifficulty) {
            defaultDifficulty.classList.add('selected');
        }
        
        // Reset hint button
        this.hintButton.textContent = 'Hint';
        this.hintButton.disabled = false;
        this.hintButton.style.opacity = '1';
    }
    
    showModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    hideModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    initializeDefaults() {
        // Set default difficulty to Medium (24 tiles)
        const defaultDifficulty = document.querySelector('[data-size="24"]');
        if (defaultDifficulty) {
            defaultDifficulty.classList.add('selected');
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add floating animation to bubbles
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble, index) => {
        bubble.style.animationDelay = `${index * 0.5}s`;
        bubble.style.animation = 'float 3s ease-in-out infinite';
    });
});

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);
