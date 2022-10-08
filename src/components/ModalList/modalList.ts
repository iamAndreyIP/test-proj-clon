import Block from '../../utils/block';
import { isEqual } from '../../utils/helpers';
import store, { StoreEvents } from '../../utils/store';
import Icon from '../Icons/icons';
import { Add } from '../Icons/iconsTemplates';
import { template, templateItem } from './modalListTemplate';

class ModalListItem extends Block {
  constructor(props: {} | undefined) {
    super({ ...props });
  }

  protected render(): DocumentFragment {
    return this.compile(templateItem, this.props);
  }
}

class ModalList extends Block {
  constructor(props: {} | undefined) {
    super({ ...props });

    this.props.events = {
      click: (e: { target: Element }) => {
        const modal = document.querySelector('.modal');

        if (modal && e.target === modal) {
          store.set('openUsersListFlag', false);
        }
      },
    };
  }

  protected addChild(): void {
    this.children.usersOflist = this.createItem(this.props);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    newProps;
    this.children.usersOflist = this.createItem(newProps);

    return true;
  }

  private createItem(props) {
    props;
    return (props?.usersOflist || []).map((item) => {
      return new ModalListItem({
        ...item,
        events: {
          click: () => {
            console.log('click');
          },
        },
        deleteUserFromChatIcon: new Icon(
          {
            cls: 'delete',
            events: {
              click: () => {
                console.log('click icon');
              },
            },
          },
          Add
        ),
      });
    });
  }

  protected render(): DocumentFragment {
    this.props;
    return this.compile(template, { ...this.props });
  }
}

export function connect(mapStateToProps: (state: any) => any) {
  return function (component: typeof Block) {
    return class extends component {
      constructor(props) {
        let state = mapStateToProps(store.getState());
        super({ ...props, ...state });

        store.on(StoreEvents.UPDATED, () => {
          let newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    };
  };
}

export const WithStore = connect((state) => ({
  usersOflist: state.usersOflist || [],
  modalListFlag: state.modalListFlag,
}))(ModalList);
