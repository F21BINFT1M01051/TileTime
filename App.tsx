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

function App() {
  return (
    <PaperProvider>
      <Navigator />
      <Toast config={toastConfig} />
    </PaperProvider>
  );
}

export default App;
