const color = '\x1b[36m%s\x1b[0m\x1b[33m%s\x1b[0m\x1b[32m\x1b[0m';
const getFullTime = () => new Date().toLocaleTimeString();
export const logger = (msg) => console.log(color, getFullTime(), ' => '.concat(msg));