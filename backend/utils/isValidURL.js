const isValidURL = (url) => {
  const urlRegex = /^https?:\/\/(?:localhost|(?:\d{1,3}\.){3}\d{1,3}|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/[\w\-./?%&=]*)?$/;
  return urlRegex.test(url);
};

module.exports = isValidURL;