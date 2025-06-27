# PAYR

**Pay All Your Responsibilities** - A clean, modern Electron application for organizing and accessing all your bill payment websites in one place.

![PAYR App](https://via.placeholder.com/800x400?text=PAYR+App+Screenshot)

## Features

- 🏦 **Organized Bill Management** - Categorize your bill payment sites (Insurance, Utilities, Credit Cards, etc.)
- 📱 **Collapsible Sidebar** - Clean, space-efficient interface with toggle functionality
- 🎨 **Color-Coded Sites** - Each site gets a unique color for easy identification
- 🌐 **Integrated WebView** - Access your bill payment sites without leaving the app
- 💾 **Local Storage** - All data stored locally on your machine (no cloud dependency)
- 🔒 **Privacy First** - No credentials stored, just site names and URLs
- ⚡ **Fast & Lightweight** - Built with Electron for cross-platform compatibility

## Categories Supported

- 🛡️ Insurance
- ⚡ Utilities  
- 💳 Credit Cards
- 🏠 Loans & Mortgages
- 📺 Subscriptions
- 🏥 Healthcare
- 🏛️ Government
- 📋 Other

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn package manager

### Install Dependencies

```bash
npm install
```

## Development

### Run in Development Mode

```bash
npm run dev
```

This will start the Electron app in development mode with hot reload.

### Build for Production

```bash
# For Windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```

## Usage

1. **Launch the App** - Start PAYR and you'll see the welcome screen
2. **Add a Site** - Click the `+` button in the sidebar
3. **Fill Details** - Enter site name, select category, and paste the bill payment URL
4. **Access Sites** - Click any site button to load it in the integrated browser
5. **Edit/Delete** - Hover over site buttons to see edit options

## Tech Stack

- **Framework**: [Electron](https://www.electronjs.org/)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Bundler**: [electron-builder](https://www.electron.build/)

## Security

- No user credentials are stored
- All data remains on your local machine
- Uses Content Security Policy (CSP) for enhanced security
- Webviews are sandboxed for safe browsing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.
