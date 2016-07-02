import React, {
  Component
} from 'react'
import { Toolbar as MaterialToolbar } from 'react-native-material-design';

class Toolbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigator, onIconPress } = this.props;
    return (
      <MaterialToolbar
        title={'huku'}
        icon={navigator && navigator.getCurrentRoutes().length > 1 ? 'keyboard-backspace' : 'menu'}
        onIconPress={() => navigator && navigator.getCurrentRoutes().length > 1 ? navigator.pop() : onIconPress() }
      />
    )
  }
}

module.exports = Toolbar;
