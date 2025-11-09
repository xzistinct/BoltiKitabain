# Bolti Kitabain

A mobile audiobook application providing access to a curated database of Pakistani audiobooks with full bilingual support.

## Overview

Bolti Kitabain (بولتی کتابیں - "Speaking Books") is a React Native application built with Expo that delivers Pakistani literature and audiobooks to users with an emphasis on accessibility and cultural inclusivity.

## Key Features

### Bilingual Interface

The application provides complete bilingual support for English and Urdu:

- Real-time language switching between English and Urdu
- Comprehensive translation table covering all UI elements
- Native Urdu text rendering with proper right-to-left support
- Book titles, descriptions, and chapter names available in both languages
- Seamless user experience regardless of language preference

### Accessibility-First Design

- Audio-first experience designed for listening on the go
- Clear typography with multiple font options (Jost, Roboto, Open Sans)
- Intuitive navigation with bottom tabs for easy access
- Large, touchable interface elements for ease of use
- Background audio playback with system-level media controls
- Offline-capable architecture for uninterrupted listening

### Pakistani Audiobook Database

- Curated collection of Pakistani literature in audio format
- Books categorized by genre, author, and narrator
- Support for multi-chapter audiobooks
- Detailed metadata including:
  - Author information
  - Narrator credits
  - Contributor acknowledgments
  - Genre classifications
  - Book ratings and descriptions

### User Features

- Personal reading lists and bookmarks
- Reading progress tracking across all books
- Genre preferences and recommendations
- Currently reading shelf
- Book discovery and search functionality
- Guest mode for browsing without account creation

## Technology Stack

- React Native 0.76.3
- Expo SDK 52
- React Navigation for routing
- Redux Toolkit for state management
- Expo Audio for playback
- AsyncStorage for local data persistence
- TypeScript for type safety

## Project Structure

```
src/
├── app/              # Navigation and routes
├── assets/           # Images and static resources
├── components/       # Reusable UI components
├── constants/        # Colors, fonts, types, translations
├── helpers/          # Utility functions and API helpers
└── state/            # Redux store and slices
```

## Getting Started

### Prerequisites

- Node.js and npm
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Run on specific platform:

```bash
npm run android
npm run ios
npm run web
```

## Configuration

The application uses environment-specific endpoints configured in `src/constants/endpoints.ts` for:

- Book metadata retrieval
- Audio file streaming
- Cover image loading
- User authentication

## Features in Detail

### Audio Playback

- Chapter-based navigation
- Playback controls (play, pause, skip, rewind)
- Background playback support
- System notification integration for media controls
- Progress saving and resume functionality

### User Management

- Account creation with email authentication
- User profile with customizable preferences
- Gender and date of birth for personalized experience
- Reading history and preferences sync

### Book Management

- Add books to reading list
- Track reading progress
- Genre-based recommendations
- Popular books discovery
- Search functionality across the database

## Permissions

The application requires the following Android permissions:

- `RECORD_AUDIO` - For future voice interaction features
- `MODIFY_AUDIO_SETTINGS` - For optimal playback experience

## Contributing

This project welcomes contributions to expand the audiobook database and improve accessibility features.

## License

Private project for educational and cultural preservation purposes.

## Contact

For issues or questions about the audiobook database, please refer to the repository maintainer.
