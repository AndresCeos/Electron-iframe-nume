# Numerología Cotidiana - Desktop Application

This project creates a desktop application that wraps the Numerología Cotidiana website in an Electron app for Windows and macOS.

## Setup and Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone/download this project
2. Run `npm install` to install all dependencies

### Development
To run the application in development mode:
```bash
# Start the web server and Electron app
node scripts/electron-dev.js
```

### Building Installers

#### For Windows (.exe installer)
```bash
# Build for Windows
npm run build
npx electron-builder --win
```

#### For macOS (.dmg installer)
```bash
# Build for macOS (Intel)
npm run build
npx electron-builder --mac --x64

# Build for macOS (Apple Silicon)
npm run build  
npx electron-builder --mac --arm64

# Build for both macOS architectures
npm run build
npx electron-builder --mac
```

#### Build All Platforms
```bash
# Build for all platforms
npm run build
npx electron-builder --mac --win
```

### Output
The built installers will be created in the `release/` directory:
- Windows: `Numerología Cotidiana Setup.exe`
- macOS Intel: `Numerología Cotidiana-x64.dmg`
- macOS Apple Silicon: `Numerología Cotidiana-arm64.dmg`

## Features
- Full-screen iframe wrapper for https://v2.numerologia-cotidiana.com/?m=1
- Custom application icons for Windows (.ico) and macOS (.icns)
- Error handling and retry functionality
- Loading states and connection status
- Auto-updater ready (can be configured)

## Configuration

### Icons
- Windows icon: `assets/icon.ico`
- macOS icon: `assets/icon.icns`

### App Information
- App ID: `com.numerologia-cotidiana.desktop`
- Product Name: `Numerología Cotidiana`

### Build Configuration
The build settings are configured in `electron-builder.json` and include:
- Code signing ready (certificates need to be configured)
- Auto-updater support
- Platform-specific installers
- Desktop shortcuts creation

## Troubleshooting

### Common Issues
1. **Build fails**: Make sure you have built the web app first with `npm run build`
2. **Icons not showing**: Ensure icon files are in the `assets/` directory
3. **App won't start**: Check that the web server builds successfully

### Platform Requirements
- **Windows**: Windows 7+ (64-bit)
- **macOS**: macOS 10.11+ (Intel and Apple Silicon)

## Security
The app is configured with secure defaults:
- Context isolation enabled
- Node integration disabled
- Web security enabled
- Restricted iframe permissions