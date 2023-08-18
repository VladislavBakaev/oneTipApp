/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

// AppRegistry.registerHeadlessTask("WidgetTask", () =>
//     require('./WidgetTasks'),
// );

AppRegistry.registerComponent(appName, () => App);
