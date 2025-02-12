import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {Bell, Music} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

const Header = ({onNotificationPress}: any) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Music color="#FF0000" size={24} />
        <Text style={styles.title}>Salzburg</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Reminders')}>
        <Bell color="#333" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF', // Білий фон
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000', // Червона лінія
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#FF0000', // Червоний колір для заголовка
  },
});

export default Header;
