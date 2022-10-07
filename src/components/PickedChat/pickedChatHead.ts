import Block from '../../utils/block';
import ChatMenuActions from '../ChatActionsMenu/chatActionsMenu';
import Icon from '../Icons/icons';
import { ThreeDots } from '../Icons/iconsTemplates';

const template = `
<div class="picked-chat__head">
    
    {{#if chatMenuActionsFlag}}
        {{{chatMenuActions}}}
    {{/if}}
    
    <div class="picked-chat__info">
        <div class="picked-chat__avatar"></div>
        <div class="picked-chat__title">{{pickedChatItem.title}}</div>
    </div>

    <div class="three-dots__box">
        {{{threeDotsIcon}}}
    </div>
    {{{testIcon}}}
</div>
`;

export default class PickedChatHead extends Block {
  constructor(props: {} | undefined) {
    super(props);

    this.props.chatMenuActionsFlag = true;
  }

  protected addChild(): void {
    this.children.threeDotsIcon = new Icon(
      {
        events: {
          click: () => {
            document
              .querySelector('.three-dots__box')
              ?.classList.toggle('active');

            document.querySelector('.tooltip')?.classList.toggle('hidde');
          },
        },
      },
      ThreeDots
    );

    this.children.chatMenuActions = new ChatMenuActions({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
