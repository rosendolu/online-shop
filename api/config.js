export const env = 'prod';
// export const env = 'dev';

const config = {
  dev: {
    hostname: 'http://127.0.0.1:3000',
  },
  prod: {
    hostname: 'http://127.0.0.1:3000',
  },
};
export default config[env];
