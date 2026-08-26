module.exports = {
  apps: [
    {
      name: 'rehelp-web',
      script: 'server/app.js',
      cwd: '/var/www/rehelp',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '400M',
      env: {
        NODE_ENV: 'production',
        MODE: 'production',
      },
    },
  ],
};
