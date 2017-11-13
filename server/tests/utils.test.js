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

    it('Should resolve to help when help is requested', () => {
      const botUserName = 'MockBot';
      const text = "MockBot help!";

      expect(parseSlackMessage(botUserName, text)).resolves.toBe('help');
    });

    it('Should resolve to city name when a city is given', () => {
      const botUserName = 'MockBot';
      const text = 'MockBot, what\'s the weather in San Francisco?';

      expect(parseSlackMessage(botUserName, text)).resolves.toBe('SanFrancisco');
    });

    it('Should resolve to city name and country code when both are given given', () => {
      const botUserName = 'MockBot';
      const text = 'MockBot, what\'s the weather in San Francisco, US?';

      expect(parseSlackMessage(botUserName, text)).resolves.toBe('SanFrancisco,US');
    });

    it('Should resolve to queryError when no city is given', () => {
      const botUserName = 'MockBot';
      const text = 'MockBot, what\'s the weather in?';
      const textTwo = 'MockBot, what\'s up?';

      expect(parseSlackMessage(botUserName, text)).resolves.toBe('queryError');
      expect(parseSlackMessage(botUserName, textTwo)).resolves.toBe('queryError');

    });
    
  });

});