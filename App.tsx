import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider, MD3LightTheme, Icon} from 'react-native-paper';
import {StatusBar} from 'react-native';

// Іконки

// Головні екрани (з табами)
import EventsScreen from './src/screens/EventsScreen';
import TicketsScreen from './src/screens/TicketsScreen';
import RecommendationsScreen from './src/screens/RecommendationsScreen';
import RemindersScreen from './src/screens/RemindersScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';
import AlbumScreen from './src/screens/AlbumScreen';

// Додаткові (звичайні) сторінки

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FF0000',
    secondary: '#FFFFFF',
    background: '#FFFFFF',
  },
};

// 🔹 Tab Navigator (Головні вкладки)
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon source="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={TicketsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon source="ticket" color={color} size={size} />
          ),
        }}
        
      />
      <Tab.Screen
        name="Recommendations"
        component={RecommendationsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon source="thumb-up" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Album"
        component={AlbumScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon source="camera-burst" color={color} size={size} />
          ),
        }}
        listeners={({navigation}) => ({
    tabPress: (e) => {
      e.preventDefault(); // Блокуємо перехід на вкладку
      console.log('Album tab is disabled');
    },
  })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon source="account" color={color} size={size} />
          ),
        }}
        listeners={({navigation}) => ({
    tabPress: (e) => {
      e.preventDefault(); // Блокуємо перехід на вкладку
      console.log('Album tab is disabled');
    },
  })}
      />
    </Tab.Navigator>
  );
};

// 🔹 Stack Navigator (Для всіх сторінок)
export const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator>
          {/* Головний екран з вкладками */}
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{headerShown: false}}
          />

          {/* Додаткові сторінки */}
          <Stack.Screen name="Reminders" component={RemindersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
