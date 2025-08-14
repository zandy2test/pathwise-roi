# Contributing to PathwiseROI

Thank you for your interest in contributing to PathwiseROI! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment for all contributors.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pathwise-roi.git
   cd pathwise-roi
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/zandy2test/pathwise-roi.git
   ```

## 💻 Development Setup

### Prerequisites

- Node.js 18.17.0 or higher (use `.nvmrc` file with nvm)
- npm 9.x or higher

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration

3. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## 🤝 How to Contribute

### Reporting Bugs

1. Check if the issue already exists
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details

### Suggesting Features

1. Check existing feature requests
2. Open a discussion or issue
3. Provide:
   - Use case description
   - Proposed solution
   - Alternative solutions considered

### Code Contributions

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write clean, maintainable code
   - Follow existing patterns
   - Add tests for new features
   - Update documentation

3. **Test your changes**:
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

## 📝 Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable/function names
- Add JSDoc comments for complex functions
- Prefer functional components with hooks

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use CSS variables for theming

### File Structure

```
app/              # Next.js app directory
components/       # React components
lib/              # Utility functions and data
public/          # Static assets
__tests__/       # Test files
```

## 🧪 Testing Guidelines

### Writing Tests

- Place tests in `__tests__/` directory
- Name test files as `*.test.ts` or `*.test.tsx`
- Write descriptive test names
- Test both success and failure cases

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Coverage Goals

- Aim for >40% overall coverage
- Critical paths should have >80% coverage
- All utility functions should be tested

## 💬 Commit Guidelines

### Commit Message Format

```
type: subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat: add viral sharing feature

- Implemented share card with QR code
- Added social media share buttons
- Integrated analytics tracking

Closes #123
```

## 🔄 Pull Request Process

1. **Update your fork**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**:
   - Use a clear, descriptive title
   - Reference any related issues
   - Describe what changes were made and why
   - Include screenshots for UI changes
   - Ensure all tests pass
   - Request review from maintainers

4. **Code Review**:
   - Address feedback promptly
   - Make requested changes
   - Keep discussions professional
   - Be open to suggestions

5. **Merge**:
   - Squash commits if requested
   - Ensure branch is up to date
   - Delete branch after merge

## 🎯 Focus Areas

Current priority areas for contributions:

1. **Testing**: Increase test coverage
2. **Accessibility**: Improve WCAG compliance
3. **Performance**: Optimize load times
4. **Documentation**: Enhance user guides
5. **Features**: Premium tier implementation

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🙏 Thank You!

Your contributions help make PathwiseROI better for everyone. We appreciate your time and effort!

## 📧 Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Check existing documentation
- Review closed issues for similar topics

Happy coding! 🚀
