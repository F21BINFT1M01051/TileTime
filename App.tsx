/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Navigator from './src/routers/StackNavigation';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastConfig';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { KeyboardProvider } from 'react-native-keyboard-controller';

function App() {
  return (
    <Provider store={store}>
      <KeyboardProvider>
        <PaperProvider>
          <Navigator />
          <Toast config={toastConfig} />
        </PaperProvider>
      </KeyboardProvider>
    </Provider>
  );
}

export default App;
