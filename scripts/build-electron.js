const { spawn } = require('child_process');
const path = require('path');

console.log('Building web application...');

// Build the web application first
const buildProcess = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  shell: true
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error('Web build failed!');
    process.exit(1);
  }

  console.log('Web build completed. Building Electron packages...');
  
  // Now build the Electron packages
  const electronBuild = spawn('npx', ['electron-builder'], {
    stdio: 'inherit',
    shell: true
  });

  electronBuild.on('close', (electronCode) => {
    if (electronCode === 0) {
      console.log('Electron build completed successfully!');
      console.log('Check the "release" folder for your installers.');
    } else {
      console.error('Electron build failed!');
      process.exit(1);
    }
  });
});