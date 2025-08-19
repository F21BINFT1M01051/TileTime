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

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigator />
        <Toast config={toastConfig} />
      </PaperProvider>
    </Provider>
  );
}

export default App;
