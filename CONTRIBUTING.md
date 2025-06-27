# Contributing to PAYR

Thank you for considering contributing to PAYR! We welcome contributions from everyone.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this standard.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots if applicable**
- **Include your environment details** (OS, Electron version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the enhancement**
- **Describe the current behavior and explain which behavior you expected**
- **Explain why this enhancement would be useful**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies** with `npm install`
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Update documentation** if necessary
6. **Commit your changes** with clear, descriptive messages
7. **Push to your fork** and submit a pull request

#### Pull Request Guidelines

- **Follow the existing code style**
- **Write clear, concise commit messages**
- **Include tests** for new functionality
- **Update documentation** for any new features
- **Ensure all tests pass**
- **Keep pull requests focused** - one feature/fix per PR

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Make your changes and test thoroughly

## Coding Standards

### JavaScript
- Use ES6+ features when appropriate
- Follow existing naming conventions
- Comment complex logic
- Avoid deep nesting when possible

### CSS
- Use semantic class names
- Group related styles together
- Use CSS custom properties for theming
- Maintain consistent spacing and formatting

### Commits
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally

## Project Structure

```
payr/
├── src/
│   ├── main/           # Main Electron process
│   ├── preload/        # Preload scripts
│   └── renderer/       # Renderer process (UI)
│       ├── assets/     # CSS and static assets
│       └── src/        # JavaScript modules
├── build/              # Build configuration
├── resources/          # App resources (icons, etc.)
└── docs/              # Documentation
```

## Testing

Before submitting a pull request, please ensure:

- The app builds without errors: `npm run build`
- The app runs correctly in development: `npm run dev`
- All existing functionality still works
- New features are properly tested

## Questions?

Feel free to open an issue with the `question` label if you have any questions about contributing.

## Recognition

Contributors will be recognized in our README.md file. Thank you for helping make PAYR better!
