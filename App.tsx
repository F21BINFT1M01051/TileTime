/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Navigator from './src/routers/StackNavigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { COLORS } from './src/config/theme';

const theme = {
  colors: {
    primary: COLORS.fieldBorder,
    background: 'white',
    surface: 'white',
    text: COLORS.inputColor,
    placeholder: '#999',
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <Navigator />
    </PaperProvider>
  );
}

export default App;
