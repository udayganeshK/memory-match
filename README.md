# Memory Match Game 🧠🎮

A beautiful and interactive memory card matching game built with vanilla HTML, CSS, and JavaScript. Features three exciting categories with dynamic content rotation and intelligent scoring system.

## ✨ Key Features

- **Three Themed Categories**: Places (🌍), Sports (🏆), and Animals (🐾)
- **Dynamic Content**: 16+ items per category with 8 randomly selected each game
- **Intelligent Scoring**: Weighted scoring system (70% moves, 30% time)
- **Tile Labeling**: Click any card to see the name with animated labels
- **Beautiful UI**: Glassmorphism design with gradient backgrounds
- **Game Statistics**: Real-time move counter and timer
- **Hint System**: Visual feedback for matching pairs (with move penalty)
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: 3D card flips and visual effects for matches

## 🚀 How to Play

1. **Select a Category**: Choose from Places, Sports, or Animals
2. **Click Play Now**: Start the memory matching game
3. **Find Matches**: Click cards to flip them and find matching pairs
4. **Win the Game**: Match all pairs to complete the level
5. **Track Progress**: Monitor your moves and time as you play

## 🎯 Scoring System

The game uses an intelligent scoring algorithm:
- **Move Efficiency**: 70% weight - fewer moves = higher score
- **Time Efficiency**: 30% weight - faster completion = higher score
- **Penalties**: Using hints adds to your move count
- **Bonus Points**: Quick consecutive matches get bonus multipliers

## 🏗️ Project Structure

```
memory-match/
├── index.html          # Main HTML structure with multiple screens
├── styles.css          # Complete styling with animations and responsive design
├── script.js           # Game logic with ES6+ features
├── README.md           # Project documentation
├── .gitignore          # Excludes system and sensitive files
└── .github/
    └── copilot-instructions.md  # Development guidelines
```

## 📊 Game Content

### Places Category (🌍)
Famous landmarks and locations from around the world including Eiffel Tower, Statue of Liberty, Big Ben, and more.

### Sports Category (🏆)  
Popular sports and activities including soccer, basketball, tennis, swimming, and many others.

### Animals Category (🐾)
Diverse wildlife from lions and elephants to dolphins and penguins.

## 📱 Screenshots

The game features a vibrant gradient interface with:
- Animated category bubbles showing theme previews
- Smooth card flip animations
- Real-time move and time tracking
- Celebration effects when matches are found

## 🛠️ Technical Implementation

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Animations, Glassmorphism effects
- **JavaScript**: Modern ES6+ features, modular code structure
- **Responsive**: Mobile-first design with breakpoints
- **Performance**: Optimized animations and efficient DOM manipulation
- **Code Quality**: Clean, commented code following best practices

## � Game Rules

- Click on cards to flip them over and see the emoji
- Click again to see the name label for each item
- Find matching pairs by remembering card positions
- You can only have 2 cards flipped at a time
- Matched pairs stay revealed with visual confirmation
- Use hints strategically (adds to your move count)
- Complete the game by matching all 8 pairs!

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/udayganeshK/memory-match.git
   cd memory-match
   ```

2. **Open and play**:
   - Open `index.html` in your web browser
   - Or use a local server for best experience

3. **Start playing**:
   - Select a category from the main menu
   - Click "Play Now" to begin
   - Try to beat your best score!

## 🎨 Customization & Development

The game is built with modular, well-documented code:

### Adding New Categories
```javascript
// Add to gameData object in script.js
newCategory: [
    { emoji: '🆕', name: 'New Item' },
    // Add 16+ items for variety
]
```

### Modifying Game Settings
- Grid size: Adjust `createGameBoard()` function
- Difficulty: Change number of pairs (currently 8)
- Timing: Modify scoring weights in `calculateScore()`
- Animations: Customize CSS transitions and keyframes

### Design Customization
- Colors: Update CSS custom properties
- Animations: Modify transition durations and effects
- Layout: Adjust grid and flexbox properties
- Responsive: Update media query breakpoints

## 🌟 Features in Detail

### Dynamic Content Rotation
Each game randomly selects 8 items from 16+ available in each category, ensuring high replayability.

### Advanced Scoring Algorithm
```javascript
// Scoring formula
baseScore = 1000
moveScore = Math.max(0, baseScore - (moves - 8) * 10) * 0.7
timeScore = Math.max(0, baseScore - timeInSeconds * 2) * 0.3
finalScore = moveScore + timeScore
```

### Responsive Design
- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Optimized touch interactions
- **Mobile**: Compact layout with larger touch targets

## 📱 Browser Support

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- [ ] Multiple difficulty levels (4x4, 6x6 grids)
- [ ] Leaderboard with local storage
- [ ] Sound effects and background music
- [ ] Multiplayer mode
- [ ] Custom category creation
- [ ] Achievement system
- [ ] Dark/light theme toggle

---

**Start your memory training journey today!** 🧠✨

*Made with ❤️ using vanilla JavaScript - no frameworks, no dependencies, just pure web technologies.*
