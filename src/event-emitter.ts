export type GeneralEventTypes = {
  [eventName: string]: unknown[];
};

type EventListener<
  EventTypes extends GeneralEventTypes,
  EventName extends keyof EventTypes,
> = (...arg: EventTypes[EventName]) => void;

type EventMap<EventTypes extends GeneralEventTypes> = {
  [EventName in keyof EventTypes]: Set<EventListener<EventTypes, EventName>>;
};

class EventEmitter<EventTypes extends GeneralEventTypes> {
  private listeners = {} as EventMap<EventTypes>;

  public on<EventName extends keyof EventTypes>(
    eventName: EventName,
    listener: EventListener<EventTypes, EventName>,
    options?: { once?: boolean },
  ) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = new Set();
    }
    this.listeners[eventName].add(listener);
    if (options?.once) {
      const unsubscribeOnce = () => {
        this.off(eventName, listener);
        this.off(eventName, unsubscribeOnce);
      };
      this.on(eventName, unsubscribeOnce);
      return unsubscribeOnce;
    }

    return () => this.off(eventName, listener);
  }

  public emit<EventName extends keyof EventTypes>(
    eventName: EventName,
    ...args: EventTypes[EventName]
  ): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => listener(...args));
    }
  }

  public once<EventName extends keyof EventTypes>(
    eventName: EventName,
    listener: EventListener<EventTypes, EventName>,
  ): () => void {
    return this, this.on(eventName, listener, { once: true });
  }

  public off<EventName extends keyof EventTypes>(
    eventName: EventName,
    listener: EventListener<EventTypes, EventName>,
  ): void {
    this.listeners[eventName]?.delete(listener);
  }
}

export default EventEmitter;
