import Block from '../../utils/block';
import { connect } from '../../utils/store';

const template = `
<div class="picked-chat__content">
      <div class="chat__date">19 июня</div>

      {{#if messages.length}}

        {{#each messages}}
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

interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

type PickedChatContentType = {
  pickedChatId: number | undefined;
  messages: Message[];
  userId: number;
};

export default class PickedChatContent extends Block {
  constructor(props: PickedChatContentType) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withPickedChat = connect((state) => {
  const pickedChatId = state.pickedChatId;

  if (!pickedChatId) {
    return {
      messages: [],
      pickedChatId: state.pickedChatId,
    };
  }

  return {
    messages: (state.messages || [])[pickedChatId] || [],
  };
});
export const PickedChatContent2 = withPickedChat(PickedChatContent);
