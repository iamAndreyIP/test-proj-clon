import Block from '../../utils/block';

import store, { StoreEvents } from '../../utils/store';

const template = `
<ul class="menu__list list" width="310">
    {{{addChatButton}}}

    {{#if listOfChat.length}}
        {{#each listOfChat}}
            {{{this}}}
        {{/each}}
    {{else}}
        <div class="msg__no-pick-chat" style="text-align:center">Пока что нет ни одного чата</div>
    {{/if}}

</ul>
`;

function mapStateToProps(state) {
  return {
    listOfChat: state.listOfChat || [],
  };
}

type listType = {
  addChatButton: Block;
  listOfChat?: Block[];
  events?: { [key: string]: (e: Event) => void };
};

export default class List extends Block {
  constructor(props: listType) {
    super({
      ...props,
      ...mapStateToProps(store.getState()),
    });

    store.on(StoreEvents.UPDATED, () => {
      this.setChildren(mapStateToProps(store.getState()));
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
