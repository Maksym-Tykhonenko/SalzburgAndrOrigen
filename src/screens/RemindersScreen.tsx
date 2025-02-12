import React from 'react';
import {View, StyleSheet} from 'react-native';
import {List, Switch, Text, Divider} from 'react-native-paper';
import {Bell, Calendar, Music, AlertCircle} from 'lucide-react-native';

const RemindersScreen = () => {
  const [switchStates, setSwitchStates] = React.useState({
    reminder1: true,
    reminder2: false,
    reminder3: true,
    reminder4: false,
  });

  const toggleSwitch = (key: any) => {
    setSwitchStates((prevState: any) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const reminderStyles = {
    iconColor: '#FF0000', // Замінено синій на червоний
    activeColor: '#FF0000',
    inactiveColor: '#E74C3C',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reminders</Text>
        <Bell color={reminderStyles.iconColor} size={24} />
      </View>

      <List.Section style={styles.listSection}>
        <List.Subheader style={styles.subheader}>
          Upcoming Events
        </List.Subheader>

        <List.Item
          title="Mozart Concert"
          description="March 15, 2025 at 7:30 PM"
          left={() => (
            <Music
              style={{marginLeft: 10}}
              color={reminderStyles.iconColor}
              size={24}
            />
          )}
          right={() => (
            <Switch
              value={switchStates.reminder1}
              onValueChange={() => toggleSwitch('reminder1')}
              color={
                switchStates.reminder1
                  ? reminderStyles.activeColor
                  : reminderStyles.inactiveColor
              }
            />
          )}
          style={styles.listItem}
        />

        <Divider />

        <List.Item
          title="Project Deadline"
          description="February 28, 2025"
          left={() => (
            <AlertCircle
              style={{marginLeft: 10}}
              color={reminderStyles.iconColor}
              size={24}
            />
          )}
          right={() => (
            <Switch
              value={switchStates.reminder2}
              onValueChange={() => toggleSwitch('reminder2')}
              color={
                switchStates.reminder2
                  ? reminderStyles.activeColor
                  : reminderStyles.inactiveColor
              }
            />
          )}
          style={styles.listItem}
        />

        <Divider />

        <List.Item
          title="Family Vacation"
          description="July 1-15, 2025"
          left={() => (
            <Calendar
              style={{marginLeft: 10}}
              color={reminderStyles.iconColor}
              size={24}
            />
          )}
          right={() => (
            <Switch
              value={switchStates.reminder3}
              onValueChange={() => toggleSwitch('reminder3')}
              color={
                switchStates.reminder3
                  ? reminderStyles.activeColor
                  : reminderStyles.inactiveColor
              }
            />
          )}
          style={styles.listItem}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Білий фон
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000', // Червоний колір для заголовка
  },
  listSection: {
    backgroundColor: '#FFFFFF', // Білий фон для секції списку
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000', // Червоний колір для підзаголовків
  },
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000', // Червона лінія для елементів списку
  },
});

export default RemindersScreen;
