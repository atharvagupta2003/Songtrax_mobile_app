import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {TabNavigator} from 'songtrax_mobile/components/Tab.js';
import { ThemeProvider } from 'songtrax_mobile/data/theme.js';
import { MapContext, useMapContext } from 'songtrax_mobile/components/MapContext.js'

const App = () => {
  return (
  <MapContext>
    <TabNavigator />
  </MapContext>
  );
};

export default App;
