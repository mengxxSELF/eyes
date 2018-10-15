'use strict'

module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-cnpm')(shipit)
  require('shipit-pm')(shipit)
  shipit.initConfig({
    default: {
      workspace: '/tmp/deploy/eyes',
      deployTo: '/home/work/eyes',
      repositoryUrl: 'https://github.com/mengxxSELF/eyes.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: '/path/to/key',
      shallowClone: true,
      cnpm: {
        flags: '--production',
        local: false,
        npm: 'cnpm',
        remote: true
      },
      pm: {
        production: {
          path: '/home/work/eyes/pm2.production.json'
        }
      }
    },
    production: {
      servers: ['root@47.104.231.146'],
      branch: 'master'
    }
  })
}
