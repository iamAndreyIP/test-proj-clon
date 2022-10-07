import Block from '../../utils/block';
import PickedChatActions from './pickedChatActions';
import PickedChatContent from './pickedChatContent';
import PickedChatHead from './pickedChatHead';
import store, { StoreEvents } from '../../utils/store';

const template = `
<div class="picked-chat">
    {{{pickedHead}}}

    {{{pickedContent}}}

    {{{pickedActions}}}
</div>
`;

export default class PickedChat extends Block {
  constructor(props: {} | undefined) {
    super({ ...props, pickedChatItem: store.getState().pickedChatItem });

    store.on(StoreEvents.UPDATED, () => {
      this.children.pickedHead.setProps({
        pickedChatItem: store.getState().pickedChatItem,
      });

      this.setProps({
        pickedChatItem: store.getState().pickedChatItem,
        messages: store.getState().messages,
      });

      this.children.pickedContent.setProps({
        messages1: store.getState().messages1,
      });
    });
  }

  protected addChild(): void {
    this.children.pickedHead = new PickedChatHead({
      pickedChatItem: this.props.pickedChatItem,
    });

    this.children.pickedContent = new PickedChatContent({});

    this.children.pickedActions = new PickedChatActions({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
