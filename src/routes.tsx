import React from "react";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./pages/Home";
import Points from './pages/Points'
import Detail from './pages/Detail'

const AppStack = createStackNavigator();

const Routes = () => {
  return(
    <NavigationIndependentTree>
      <AppStack.Navigator>
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Points" component={Points} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationIndependentTree>
  )
}

export default Routes;