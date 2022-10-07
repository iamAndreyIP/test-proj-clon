import API, { ChatApi } from '../api/chatApi';
import ListItem from '../components/ListItem/listItem';
import store from '../utils/store';
import MessageController from './messageController';

export class ChatController {
  private readonly api: ChatApi;

  constructor() {
    this.api = API;
  }

  async createChat(title: string) {
    try {
      const response: any = await this.api.create({ title });

      if (response.response.includes('id')) {
        this.fetchChats();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchChats() {
    try {
      const self = this;
      const response: any = await this.api.read();

      const check = JSON.parse(response.response);

      store.set('newChats', JSON.parse(response.response) || []);

      if (check.length) {
        const items = store.getState().newChats.map((item) => {
          if (item.last_message) {
            const formatTime = item.last_message.time.slice(11, 16);
            item.last_message.time = formatTime;
          }
          return new ListItem({
            ...item,
            events: {
              dblclick: function () {
                const id: string = this.getAttribute('data-id');

                self.getToken(Number(id));

                const chat = store
                  .getState()
                  .newChats.find(
                    (ch: { id: string | number }) => +ch.id === +id
                  );

                if (chat.id) {
                  store.set('pickedChatItem', chat);

                  document.querySelectorAll('.list__item').forEach((item) => {
                    const iId: any = item.getAttribute('data-id');
                    if (+iId === +id) {
                      item.classList.add('www');
                    } else {
                      item.classList.remove('www');
                    }
                  });

                  store.set('pickedChatFlag', true);
                }
              },
            },
          });
        });

        store.set('listOfChat', items);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getToken(chatId: number) {
    try {
      const response: any = await this.api.getToken(chatId);
      const { token } = JSON.parse(response.response);

      MessageController.connect(chatId, token);
    } catch (error) {
      console.error(error);
    }
  }

  async addUserToChat(chatData: { users: any; chatId: any }) {
    try {
      const res: any = await this.api.addUser(chatData);

      await this.getUsersOfChat(chatData.chatId);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUserToChat(chatData: { users: any; chatId: any }) {
    try {
      const res: any = await this.api.deleteUser(chatData);

      await this.getUsersOfChat(chatData.chatId);
    } catch (error) {
      console.error(error);
    }
  }

  async getUsersOfChat(id: number) {
    try {
      const res: any = await this.api.getUsersOfChat(id);

      if (!res.response.includes('reason')) {
        const users = JSON.parse(res.response);

        console.log('chat ctr users', users);

        const logins = users.filter((user) => user.role === 'regular');

        console.log('chat ctr logins', logins);
      } else {
        console.log(res.response);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ChatController();
