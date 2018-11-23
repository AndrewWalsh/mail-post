// Will need to change this, as 8323 could be taken
export const WORKER_PORT = 8323;

// Used as an IPC channel signifying that the worker is ready for the renderer
export const WORKER_LOADED = 'WORKER_LOADED';

// Types for pubsub notifications (identifying the action to be performed)
export const NOTIFICATION_TYPE_ADD = 'NOTIFICATION_TYPE_ADD';
export const NOTIFICATION_TYPE_UPDATE = 'NOTIFICATION_TYPE_UPDATE';
export const NOTIFICATION_TYPE_REMOVE = 'NOTIFICATION_TYPE_REMOVE';
