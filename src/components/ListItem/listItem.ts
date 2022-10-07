import Block from '../../utils/block';
import { template } from './listItemTemplate';

export default class ListItem extends Block {
  constructor(props: {} | undefined) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
