import EventBus from "./eventBus";
import { set } from "./helpers";

export const StoreEvents = {
  UPDATED: "update",
};

class Store extends EventBus {
  state = {
    users: [],
    chats: [{ id: 1, name: "valio", date: "some date" }],
  };

  getState() {
    return this.state;
  }

  set(path, value) {
    set(this.state, path, value);

    this.emit(StoreEvents.UPDATED);
  }
}

export default new Store();
