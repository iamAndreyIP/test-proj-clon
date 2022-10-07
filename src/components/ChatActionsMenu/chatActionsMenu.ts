import Block from '../../utils/block';
import store, { StoreEvents } from '../../utils/store';
import Icon from '../Icons/icons';
import { Add } from '../Icons/iconsTemplates';

const template = `
<div class="tooltip hidde">
      <div class="tooltip__add">
        <div>
          {{{addIcon}}}
        </div>
        Добавить пользователя
      </div>
      <div class="tooltip__delete">
        {{{deleteIcon}}}
        Удалить пользователя
      </div>
</div>
`;

export default class ChatMenuActions extends Block {
  constructor(props: {} | undefined) {
    super({ ...props, ...store.getState() });

    store.on(StoreEvents.UPDATED, () => {
      this.setProps({ ...store.getState() });
    });
  }

  protected addChild(): void {
    this.children.addIcon = new Icon(
      {
        cls: 'add',
        events: {
          click: () => {
            console.log('click add user');

            store.set('addUserToChatFlag', true);
          },
        },
      },
      Add
    );

    this.children.deleteIcon = new Icon(
      {
        cls: 'delete',
        events: {
          click: () => {
            console.log('click delete user');
            store.set('deleteUserToChatFlag', true);
          },
        },
      },
      Add
    );
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
