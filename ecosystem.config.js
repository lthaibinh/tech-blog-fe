module.exports = {
  apps : [{
    script: 'npm start',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      key: 'ubuntu',
      user : 'root',
      host : '207.148.64.43',  
      ref  : 'origin/main',
      repo : 'git@github.com:lthaibinh/english-dictation.git',
      path : '/home/ubuntu/english-dictation',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
