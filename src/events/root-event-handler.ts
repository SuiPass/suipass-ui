import { EventHandler } from './event-handler';
import { EventListeners, EventNames } from './events';

export const rootEventHandler = new EventHandler<EventNames, EventListeners>();
