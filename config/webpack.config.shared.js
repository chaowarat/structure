const path = require('path');

const sharedConfig = {
  'alias': {
    'Images': path.resolve(__dirname, '../src/images/'),
    'Utils': path.resolve(__dirname, '../src/utils/'),
    'Containers': path.resolve(__dirname, '../src/containers/'),
    'Components': path.resolve(__dirname, '../src/components/'),
    'Redux': path.resolve(__dirname, '../src/redux/')
  }
};

module.exports = sharedConfig