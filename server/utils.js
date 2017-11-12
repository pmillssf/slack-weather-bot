const TempEventLog = function () {
  this.storage = {};
};

TempEventLog.prototype.addEvent = function (eventID) {
  if (this.storage[eventID]) {
    return false;
  }
  this.storage[eventID] = true;
  setTimeout(() => {
    delete this.storage[eventID];
  }, 360000);
  return true;
};

const parseSlackMessage = (botUsername, text) => {
  return new Promise((resolve) => {
    if (text.includes(`${botUsername} help`)) {
      resolve('help');
    }
    const start = text.indexOf('weather in') + 11;
    const finish = text.indexOf('?');
    if (start <= 11 || finish <= start) {
      resolve('queryError');
    }
    const city = text.slice(start, finish).split(' ').join('');
    resolve(city);
  });
};

module.exports = {
  TempEventLog,
  parseSlackMessage,
};
