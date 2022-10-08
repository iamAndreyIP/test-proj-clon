import Block from '../../utils/block';
import { template } from './listItemTemplate';
import { connect } from '../ModalList/modalList';

export class ListItemBase extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  render() {
    console.log('listitem chat', this.props);
    return this.compile(template, {
      ...this.props,
      isPicked: this.props.id === this.props.pickedChatItem?.id,
    });
  }
}

export const withStore = connect((state) => ({
  pickedChatItem: (state.listOfChat || []).find(
    ({ id }) => id === state.pickedChatId
  ),
  usersOflist: state.usersOflist,
}));

export const ListItem = withStore(ListItemBase);
