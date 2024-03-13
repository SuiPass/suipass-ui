import { EventEmitter } from 'events';

export class EventHandler<T, K extends Record<string, (...args: any) => any>> {
  private eventEmitter = new EventEmitter();

  public emit(eventName: T, payload?: any) {
    console.info('EVENT EMITTED: ', eventName, payload);
    this.eventEmitter.emit(eventName as string, payload);
  }

  public on<V1 extends T>(eventName: V1, listener: V1 extends keyof K ? K[V1] : () => void) {
    this.eventEmitter.addListener(eventName as string, listener);
    return [eventName as string, listener];
  }

  public remove<V1 extends T>(eventName: V1, listener: V1 extends keyof K ? K[V1] : () => void) {
    this.eventEmitter.removeListener(eventName as string, listener);
  }
  public removeListeners(mapListeners: (string | (() => void))[][]) {
    mapListeners.forEach(([eventName, listener]) => {
      this.eventEmitter.removeListener(eventName as string, listener as any);
    });
  }
}
