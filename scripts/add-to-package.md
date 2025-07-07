# Package.json Scripts to Add

Add these scripts to your package.json file in the "scripts" section:

```json
{
  "scripts": {
    "electron:dev": "cross-env NODE_ENV=development node scripts/electron-dev.js",
    "electron:build": "npm run build && npx electron-builder",
    "electron:build-win": "npm run build && npx electron-builder --win",
    "electron:build-mac-intel": "npm run build && npx electron-builder --mac --x64",
    "electron:build-mac-silicon": "npm run build && npx electron-builder --mac --arm64",
    "electron:build-mac-universal": "npm run build && npx electron-builder --mac",
    "electron:build-all": "npm run build && npx electron-builder --mac --win"
  }
}
```

## Usage Commands

### Development
```bash
npm run electron:dev
```

### Build Installers

**Windows (x64):**
```bash
npm run electron:build-win
```

**Mac Intel Processors:**
```bash
npm run electron:build-mac-intel
```

**Mac Apple Silicon (M1/M2/M3):**
```bash
npm run electron:build-mac-silicon
```

**Mac Universal (Both Intel and Apple Silicon):**
```bash
npm run electron:build-mac-universal
```

**All Platforms:**
```bash
npm run electron:build-all
```

## Output Files

The installers will be created in the `release/` directory:
- `Numerología Cotidiana Setup.exe` - Windows installer
- `Numerología Cotidiana-x64.dmg` - Mac Intel installer  
- `Numerología Cotidiana-arm64.dmg` - Mac Apple Silicon installer
- `Numerología Cotidiana.dmg` - Mac Universal installer (when using universal build)