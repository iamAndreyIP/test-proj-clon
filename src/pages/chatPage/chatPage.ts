import Block from '../../utils/block';
import { template } from './chatPageTemplate';
import Input from '../../components/Input/input';
import List from '../../components/List/list';
import Link from '../../components/Link/link';
import { router } from '../../../index';
import Button from '../../components/Button/button';
import Modal from '../../components/Modal/modal';
import Icon from '../../components/Icons/icons';
import { ChevronRight } from '../../components/Icons/iconsTemplates';
import store, { StoreEvents } from '../../utils/store';
import PickedChat from '../../components/PickedChat/pickedChat';
import ChatController from '../../controllers/chatController';

import { WithStore } from '../../components/ModalList/modalList';

function mapStateToProps(state: any) {
  return {
    addChatFlag: state.addChatFlag,
    pickedChat1: state.pickedChat1,
    pickedChatFlag: state.pickedChatFlag,
    addUserToChatFlag: state.addUserToChatFlag,
    deleteUserToChatFlag: state.deleteUserToChatFlag,
    modalListFlag: state.modalListFlag,
    usersOflist: state.usersOflist,
  };
}

export default class ChatPage extends Block {
  constructor(props) {
    super({ ...props, ...mapStateToProps(store.getState()) });

    store.on(StoreEvents.UPDATED, () => {
      this.setProps({ ...mapStateToProps(store.getState()) });
    });

    this.props.pickedChatFlag = false;

    this.componentDidMount();
  }

  componentDidMount(oldProps?: any): void {
    console.log('CHAT PAGE DID MOUNT******');
    ChatController.fetchChats();
  }

  protected addChild(): void {
    this.children.profileLink = new Link({
      linkClass: 'profile__link',
      linkHref: '#',
      linkText: 'Профиль',
      linkIcon: new Icon({}, ChevronRight),
      events: {
        click: (event) => {
          event.preventDefault();

          router.go('/profile');
        },
      },
    });

    this.children.searchInput = new Input({
      inputClass: 'search__input',
      inputName: 'search',
      inputPlaceholder: 'Поиск',
      inputType: 'text',
    });

    this.children.chatList = new List({
      addChatButton: new Button({
        buttonClass: 'btn',
        buttonText: 'Создать чат',
        events: {
          click: () => {
            store.set('addChatFlag', true);
          },
        },
      }),
    });

    this.children.addChatModal = new Modal({
      modalInput: new Input({
        inputClass: 'modal__user',
        inputName: 'user_name',
        inputPlaceholder: 'Название чата',
        inputType: 'text',
      }),
      modalTitle: 'Создать чат',
      modalButton: new Button({
        buttonClass: 'btn',
        buttonText: 'Добавить',
        events: {
          click: (e) => {
            const input: HTMLInputElement | null =
              document.querySelector('.modal__user');

            ChatController.createChat(input?.value || '');
            if (input) {
              input.value = '';
              store.set('addChatFlag', false);
            }
          },
        },
      }),
    });

    this.children.pickedChat = new PickedChat({});

    this.children.addUserModal = new Modal({
      modalTitle: 'Добавить пользователя в чат',
      modalInput: new Input({
        inputClass: 'input',
        inputName: 'user_modal',
        inputPlaceholder: 'Введите логин',
        inputType: 'text',
      }),
      modalButton: new Button({
        buttonClass: 'btn',
        buttonText: 'Добавить',
        events: {
          click: (e) => {
            console.log('click add user to chat');

            const input: HTMLInputElement | null =
              document.querySelector('.input');

            if (input && input.value) {
              console.log('req go on');

              const value = input.value;
              const id = store.getState().pickedChatItem.id;

              const chatData: { users: any; chatId: any } = {
                users: [],
                chatId: id,
              };

              chatData.users.push(Number(value));

              ChatController.addUserToChat(chatData);

              input.value = '';
              store.set('addUserToChatFlag', false);
            }
          },
        },
      }),
      events: {
        click: (e: { target: Element | null }) => {
          const modal = document.querySelector('.modal');

          console.log('click add modal');

          if (e.target === modal) {
            store.set('addUserToChatFlag', false);
          }
        },
      },
    });

    this.children.deleteUserModal = new Modal({
      modalTitle: 'Удалить пользователя из чата',
      modalInput: new Input({
        inputClass: 'input',
        inputName: 'user_modal',
        inputPlaceholder: 'Введите логин',
        inputType: 'text',
      }),
      modalButton: new Button({
        buttonClass: 'btn',
        buttonText: 'Удалить',
        events: {
          click: () => {
            const input: HTMLInputElement | null =
              document.querySelector('.input');

            if (input && input.value) {
              const value = input.value;
              const id = store.getState().pickedChatItem.id;

              const chatData: { users: any; chatId: any } = {
                users: [],
                chatId: id,
              };

              chatData.users.push(Number(value));

              ChatController.deleteUserToChat(chatData);

              input.value = '';
              store.set('deleteUserToChatFlag', false);
            }
          },
        },
      }),
    });

    this.children.modalList = new WithStore({});
  }

  protected render(): DocumentFragment {
    // console.log('RENDER CHAT PAGE');
    return this.compile(template, this.props);
  }
}

//@ts-ignore
window.chatCtr = ChatController;
