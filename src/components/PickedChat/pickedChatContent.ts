import Block from '../../utils/block';

const template = `
<div class="picked-chat__content">
      <div class="chat__date">19 июня</div>

      {{#if messages1.length}}

        {{#each messages1}}
          {{#if this.owner}}

          <div class="chat__message">

            {{this.content}}

            <div class="message__time">

              <time>{{this.formatTime}}</time>

            </div>

          </div>

          {{else}}

            <div class="chat__message-answer">
              {{this.content}}

              <div class="message__time-answer">
                <time>{{this.formatTime}}</time>
              </div>

            </div>

          {{/if}}
          
        {{/each}}
      
      {{/if}}
</div>
`;

export default class PickedChatContent extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
