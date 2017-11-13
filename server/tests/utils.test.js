const { TempEventLog, parseSlackMessage } = require('../utils');

describe('Testing Utils.js', () => {

  describe('TempEventLog', () => {

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('Should add an event', () => {
      const receivedEvents = new TempEventLog();
      const event = 'Test Event!';
      expect(receivedEvents.addEvent(event)).toBe(true);
      expect(receivedEvents.storage[event]).toBe(true);
    });

    it('Should return false if an event has already been added', () => {

      const receivedEvents = new TempEventLog();
      const event = 'Test Event!';
      receivedEvents.addEvent(event);
      expect(receivedEvents.addEvent(event)).toBe(false);

    });

    it('Should add multiple events', () => {

      const receivedEvents = new TempEventLog();
      const eventOne = 'Test Event One!';
      const eventTwo = 'Test Event Two!';
      const eventThree = 'Test Event Three!';

      receivedEvents.addEvent(eventOne);
      receivedEvents.addEvent(eventTwo);
      receivedEvents.addEvent(eventThree);

      expect(receivedEvents.storage).toHaveProperty(eventOne);
      expect(receivedEvents.storage).toHaveProperty(eventTwo);
      expect(receivedEvents.storage).toHaveProperty(eventThree);

    });

    it('Should remove events after six minutes', () => {
      const receivedEvents = new TempEventLog();
      const eventOne = 'Test Event One!';
      const eventTwo = 'Test Event Two!';
      const eventThree = 'Test Event Three!';

      receivedEvents.addEvent(eventOne);
      receivedEvents.addEvent(eventTwo);
      receivedEvents.addEvent(eventThree);

      jest.runAllTimers()
      expect(receivedEvents.storage).toEqual({});
    });

  });

  describe('parseSlackMessage', () => {
    it();
  });

});