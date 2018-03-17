// @flow

export default (sender: Function, channel: string, ...message: Array<string>) =>
  sender(channel, ...message);
