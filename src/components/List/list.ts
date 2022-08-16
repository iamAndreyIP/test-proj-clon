import Block from "../../utils/block";
import store, { StoreEvents } from "../../utils/store";

const template = `
<ul class="chats__menu-list chats-list">
   {{#each chats}}
        {{log chats}}
        <li class="chats-list__item" data-li={{id}}>
          <div class="chats-list__item-img">
            <img class="chats-list__item-avatar" alt="" />
          </div>
          <div class="chats-list__item-info chats-info">
            <div class="chats-info__title">{{name}}</div>
            <div class="chats-info__note">{{images}}</div>
          </div>
          <div class="chats-list__item-date chats-date">
            <div class="chats-date__time">{{date}}</div>
            <div class="chats-date__ring">{{ring}}</div>
          </div>
      </li>
   {{/each}}
</ul>
`;

function mapTestToProps(state) {
  return {
    chats: state.chats,
  };
}

class List extends Block {
  constructor(props) {
    super({ ...props, ...mapTestToProps(store.getState()) });

    store.on(StoreEvents.UPDATED, () => {
      this.setProps({ ...mapTestToProps(store.getState()) });
    });
  }

  protected render(): DocumentFragment {
    console.log(this.props);
    return this.compile(template, this.props);
  }
}

export const list = new List({});
