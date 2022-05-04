const NetworkSpeed = require('network-speed');  // ES5
const testNetworkSpeed = new NetworkSpeed();

module.exports = async function getNetworkDownloadSpeed() {
  const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
  const fileSizeInBytes = 500000;
  const speedtest = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
  return speedtest
}