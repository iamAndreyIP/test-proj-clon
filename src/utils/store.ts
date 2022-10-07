import EventBus from './eventBus';
import { set } from './helpers';

export const StoreEvents = {
  UPDATED: 'update',
};

class Store extends EventBus {
  private state: any = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.UPDATED);
  }
}

export default new Store();
