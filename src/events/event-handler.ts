import { EventEmitter } from 'events';

export class EventHandler<T, K extends Record<string, (...args: any) => any>> {
  private eventEmitter = new EventEmitter();

  public emit(eventName: T) {
    this.eventEmitter.emit(eventName as string);
  }

  public on<V1 extends T>(eventName: V1, listener: V1 extends keyof K ? K[V1] : () => void) {
    console.info('ADDED LISTENER: ', eventName);
    this.eventEmitter.addListener(eventName as string, listener);
  }

  public remove(eventName: T) {
    console.info('REMOVED LISTENER: ', eventName);
    this.eventEmitter.removeAllListeners(eventName as string);
  }
}
