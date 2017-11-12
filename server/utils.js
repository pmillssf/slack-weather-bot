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

module.exports = {
  TempEventLog,
};
