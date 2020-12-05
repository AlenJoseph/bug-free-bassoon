module.exports = {
    logerconfig: {
      appenders: {
        file: {
          type: 'file',
          filename: 'logs/minimal-output.log',
          maxLogSize: 10485760, // = 10Mb
          backups: 1, // keep five backup files
          compress: true, // compress the backups
          encoding: 'utf-8',
          mode: 0o0640,
          flags: 'w+',
          maxBackupIndex: 7
        },
        dateFile: {
          type: 'dateFile',
          filename: 'logs/output.log',
          maxLogSize: 10485760,
          pattern: 'yyyy-MM-dd-hh',
          maxBackupIndex: 7,
          compress: true
        },
        out: {
          type: 'stdout'
        }
      },
      categories: {
        default: { appenders: ['file', 'dateFile', 'out'], level: 'trace' }
      }
    }
  };
  