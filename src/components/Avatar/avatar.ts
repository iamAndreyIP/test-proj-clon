import Block from '../../utils/block';
import store, { StoreEvents } from '../../utils/store';

const template = `
<div class="profile__avatar">
    <img class="profile__avatar-img" src="https://ya-praktikum.tech/api/v2/resources{{currentUser.avatar}}" alt="" width="130px" height="130px"/>
    <div class="overlayAvatar">
      {{{avatarLink}}}
    </div>
</div>
`;

const IMG_URL_HOTS =
  'https://ya-praktikum.tech/api/v2/resources{{currentUser.avatar}}';

export default class Avatar extends Block {
  constructor(props: {} | undefined) {
    super({ ...props, ...store.getState() });

    store.on(StoreEvents.UPDATED, () => {
      this.setProps({ ...store.getState() });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
