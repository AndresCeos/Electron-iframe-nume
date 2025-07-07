const { spawn } = require('child_process');
const waitOn = require('wait-on');

// Start the web server
console.log('Starting web server...');
const webServer = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Wait for the server to be ready, then start Electron
waitOn({
  resources: ['http://localhost:5000'],
  delay: 1000,
  timeout: 30000
}).then(() => {
  console.log('Web server is ready. Starting Electron...');
  const electron = spawn('npx', ['electron', '.'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NODE_ENV: 'development' }
  });

  electron.on('close', () => {
    webServer.kill();
    process.exit();
  });
}).catch(err => {
  console.error('Error waiting for web server:', err);
  webServer.kill();
  process.exit(1);
});

// Handle cleanup
process.on('SIGINT', () => {
  webServer.kill();
  process.exit();
});