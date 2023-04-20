export class PubSub {
  private subscribers: Function[] = [];

  subscribe(fn: Function): void {
    this.subscribers.push(fn);
  }

  unsubscribe(fn: Function): void {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== fn);
  }

  unsubscribeAll(): void {
    this.subscribers = [];
  }

  publish(data: unknown): void {
    this.subscribers.forEach((subscriber) => subscriber(data));
  }
}

export default PubSub;
