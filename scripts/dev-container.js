#!/usr/bin/env node

const { spawn } = require('child_process');

// Handle signals properly in container
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

// Start Next.js dev server with better error handling
const nextDev = spawn('npx', ['next', 'dev', '--turbopack', '--hostname', '0.0.0.0'], {
  stdio: ['pipe', 'inherit', 'inherit'],
  env: {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=4096',
    FORCE_COLOR: '1'
  }
});

nextDev.on('error', (err) => {
  console.error('Failed to start Next.js dev server:', err);
  process.exit(1);
});

nextDev.on('close', (code) => {
  console.log(`Next.js dev server exited with code ${code}`);
  process.exit(code);
});

