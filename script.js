class MemoryGame {
    constructor() {
        this.selectedCategory = null;
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
                { emoji: '🏛️', name: 'Museum' }
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
                { emoji: '🏄', name: 'Surfing' }
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
                { emoji: '🦋', name: 'Butterfly' }
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
        
        this.initializeElements();
        this.setupEventListeners();
    }
    
    initializeElements() {
        // Screens
        this.mainMenuScreen = document.getElementById('main-menu');
        this.gameScreen = document.getElementById('game-screen');
        this.winScreen = document.getElementById('win-screen');
        
        // Main menu elements
        this.categoryOptions = document.querySelectorAll('.category-option');
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
        
        console.log('Final score element:', this.finalScore); // Debug log
    }
    
    setupEventListeners() {
        // Category selection
        this.categoryOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectCategory(e.currentTarget.dataset.category);
            });
        });
        
        // Navigation buttons
        this.playButton.addEventListener('click', () => this.startGame());
        this.backButton.addEventListener('click', () => this.showMainMenu());
        this.restartButton.addEventListener('click', () => this.restartGame());
        this.hintButton.addEventListener('click', () => this.showHint());
        this.playAgainButton.addEventListener('click', () => this.startGame());
        this.menuButton.addEventListener('click', () => this.showMainMenu());
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
        this.playButton.disabled = false;
        
        // Add animation effect
        selectedOption.style.transform = 'scale(1.1)';
        setTimeout(() => {
            selectedOption.style.transform = 'scale(1.05)';
        }, 200);
    }
    
    startGame() {
        if (!this.selectedCategory) return;
        
        this.showGameScreen();
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
        this.updateMoves();
        this.updateTimer();
    }
    
    createGameBoard() {
        // Get category data and randomly select 8 items
        const categoryData = this.gameData[this.selectedCategory];
        const shuffledData = [...categoryData].sort(() => Math.random() - 0.5);
        this.currentGameItems = shuffledData.slice(0, 8);
        
        // Create pairs
        const gameCards = [...this.currentGameItems, ...this.currentGameItems];
        
        // Shuffle cards
        this.shuffleArray(gameCards);
        
        // Clear board
        this.gameBoard.innerHTML = '';
        
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
        console.log('Flipping card:', card); // Debug log
        
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
        
        console.log('Showing label:', card.name, 'at position:', cardRect); // Debug log
        
        // Remove label after 2 seconds
        setTimeout(() => {
            if (label.parentNode) {
                label.remove();
            }
        }, 2000);
    }
    
    calculateScore() {
        // Base score of 1000 points
        let baseScore = 1000;
        
        // Deduct points for moves (70% weight)
        // Perfect game would be 8 moves (minimum possible), so deduct more for extra moves
        const minMoves = 8;
        const movePenalty = Math.max(0, (this.moves - minMoves) * 15);
        const moveScore = Math.max(0, baseScore * 0.7 - movePenalty);
        
        // Deduct points for time (30% weight)
        // Target time is 30 seconds, deduct points for going over
        const targetTime = 30;
        const timePenalty = Math.max(0, (this.time - targetTime) * 5);
        const timeScore = Math.max(0, baseScore * 0.3 - timePenalty);
        
        // Calculate final score
        this.score = Math.round(moveScore + timeScore);
        return this.score;
    }
    
    showHint() {
        // Find two unmatched cards with the same value
        const unmatchedCards = this.cards.filter(card => !card.isMatched && !card.isFlipped);
        
        for (let i = 0; i < unmatchedCards.length; i++) {
            for (let j = i + 1; j < unmatchedCards.length; j++) {
                if (unmatchedCards[i].emoji === unmatchedCards[j].emoji) {
                    // Add hint glow effect
                    unmatchedCards[i].element.classList.add('hint-glow');
                    unmatchedCards[j].element.classList.add('hint-glow');
                    
                    setTimeout(() => {
                        unmatchedCards[i].element.classList.remove('hint-glow');
                        unmatchedCards[j].element.classList.remove('hint-glow');
                    }, 2000);
                    
                    this.moves += 1; // Penalty for using hint
                    this.updateMoves();
                    
                    // Disable hint button temporarily
                    this.hintButton.disabled = true;
                    this.hintButton.textContent = 'Hint Used';
                    setTimeout(() => {
                        this.hintButton.disabled = false;
                        this.hintButton.textContent = 'Hint';
                    }, 3000);
                    
                    return;
                }
            }
        }
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.time++;
            this.updateTimer();
        }, 1000);
    }
    
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    updateMoves() {
        this.movesCount.textContent = `Moves: ${this.moves}`;
    }
    
    updateTimer() {
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;
        this.timerDisplay.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    winGame() {
        this.stopTimer();
        this.gameStarted = false;
        
        // Calculate final score
        const finalScore = this.calculateScore();
        console.log('Calculated score:', finalScore); // Debug log
        
        // Update win screen with final stats
        this.finalMoves.textContent = this.moves;
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;
        this.finalTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update score display
        if (this.finalScore) {
            this.finalScore.textContent = finalScore;
            console.log('Score updated in DOM'); // Debug log
        } else {
            console.error('Final score element not found!'); // Debug log
        }
        
        // Show win screen after a delay
        setTimeout(() => {
            this.showWinScreen();
        }, 1500);
    }
    
    restartGame() {
        this.stopTimer();
        this.startGame();
    }
    
    showMainMenu() {
        this.stopTimer();
        this.mainMenuScreen.classList.add('active');
        this.gameScreen.classList.remove('active');
        this.winScreen.classList.remove('active');
        
        // Reset category selection
        this.categoryOptions.forEach(option => {
            option.classList.remove('selected');
        });
        this.selectedCategory = null;
        this.playButton.disabled = true;
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
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
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
