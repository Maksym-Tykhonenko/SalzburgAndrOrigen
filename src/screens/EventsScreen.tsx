import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  TextInput as RNTextInput,
} from 'react-native';
import {Text, Card, Title, Button, Chip, TextInput} from 'react-native-paper';
import {Calendar, Clock, Plus, Search} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../components/Header';
import {Background} from '../components/background';

const EventsScreen = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Mozart Concert',
      date: 'March 15, 2025',
      time: '19:00',
      location: 'Salzburg Cathedral',
      description: 'Classical concert featuring Mozart compositions.',
      price: '€75',
      category: 'Classical',
      tickets_left: 45,
    },
    {
      id: 2,
      title: 'Rock Festival',
      date: 'April 5, 2025',
      time: '14:00',
      location: 'City Park',
      description:
        'Annual rock festival featuring local and international bands.',
      price: '€45',
      category: 'Rock',
      tickets_left: 150,
    },
    {
      id: 3,
      title: 'Jazz Night',
      date: 'March 20, 2025',
      time: '20:30',
      location: 'Blue Note Club',
      description: 'Intimate jazz performance featuring acclaimed quartet.',
      price: '€60',
      category: 'Jazz',
      tickets_left: 25,
    },
  ]);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const categories = ['All', 'Classical', 'Rock', 'Jazz', 'Opera'];

  const filteredEvents = events.filter(
    event =>
      (selectedCategory === 'All' || event.category === selectedCategory) &&
      event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(),
    time: new Date(),
    location: '',
    description: '',
    price: '',
    category: '',
  });

  const openBookingModal = (event: any) => {
    setSelectedEvent(event);
    setIsBookingModalVisible(true);
  };

  const handleCreateEvent = () => {
    const eventToAdd = {
      ...newEvent,
      id: events.length + 1,
      date: newEvent.date.toLocaleDateString(),
      time: newEvent.time.toLocaleTimeString(),
      tickets_left: 100,
    };
    setEvents([...events, eventToAdd]);
    setIsCreateModalVisible(false);
    setNewEvent({
      title: '',
      date: new Date(),
      time: new Date(),
      location: '',
      description: '',
      price: '',
      category: '',
    });
  };

  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    tickets: 1,
  });

  const handleInputChange = (field: any, value: any) => {
    setBookingForm(prev => ({...prev, [field]: value}));
  };

  return (
    <>
      <Background />
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Title style={styles.screenTitle}>Events</Title>
        </View>
        {/* Пошук подій */}
        <View style={styles.searchContainer}>
          <Search color="#D32F2F" size={24} />
          <RNTextInput
            placeholder="Search events..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        {/* Фільтр за категоріями */}
        <View style={styles.categoryContainer}>
          {categories.map(cat => (
            <Chip
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.selectedChip,
              ]}
              onPress={() => setSelectedCategory(cat)}>
              {cat}
            </Chip>
          ))}
        </View>
        {/* Список подій */}
        {filteredEvents.map(event => (
          <Card key={event.id} style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>{event.title}</Title>
              <Text style={styles.infoText}>
                {event.date} - {event.time}
              </Text>
              <Text style={styles.infoText}>{event.location}</Text>
              <Text style={styles.description}>{event.description}</Text>
              <Text style={styles.price}>Price: {event.price}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => openBookingModal(event)}
                mode="contained"
                color="#D32F2F"
                style={styles.bookButton}>
                Book
              </Button>
            </Card.Actions>
          </Card>
        ))}

        {/* Модальне вікно для створення події */}
        <Modal
          visible={isCreateModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsCreateModalVisible(false)}>
          {/* Обгортка для закриття при натисканні поза модалкою */}
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPressOut={() => setIsCreateModalVisible(false)}>
            <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalTitle}>Create New Event</Text>
                <RNTextInput
                  placeholder="Event Title"
                  style={styles.input}
                  value={newEvent.title}
                  onChangeText={text => setNewEvent({...newEvent, title: text})}
                />
                <View style={styles.dateTimeContainer}>
                  <View style={styles.datePickerContainer}>
                    <Calendar color="#D32F2F" size={24} />
                    <DateTimePicker
                      value={newEvent.date}
                      mode="date"
                      display="default"
                      onChange={(event, date) =>
                        date && setNewEvent({...newEvent, date})
                      }
                      style={styles.dateTimePicker}
                    />
                  </View>
                  <View style={styles.datePickerContainer}>
                    <Clock color="#D32F2F" size={24} />
                    <DateTimePicker
                      value={newEvent.time}
                      mode="time"
                      display="default"
                      onChange={(event, time) =>
                        time && setNewEvent({...newEvent, time})
                      }
                      style={styles.dateTimePicker}
                    />
                  </View>
                </View>
                <RNTextInput
                  placeholder="Location"
                  style={styles.input}
                  value={newEvent.location}
                  onChangeText={text =>
                    setNewEvent({...newEvent, location: text})
                  }
                />
                <RNTextInput
                  placeholder="Description"
                  style={styles.multilineInput}
                  multiline
                  numberOfLines={4}
                  value={newEvent.description}
                  onChangeText={text =>
                    setNewEvent({...newEvent, description: text})
                  }
                />
                <RNTextInput
                  placeholder="Price"
                  style={styles.input}
                  keyboardType="numeric"
                  value={newEvent.price}
                  onChangeText={text => setNewEvent({...newEvent, price: text})}
                />
                <View style={styles.modalButtonContainer}>
                  <Button
                    mode="outlined"
                    onPress={() => setIsCreateModalVisible(false)}
                    style={styles.modalCancelButton}>
                    Cancel
                  </Button>
                  <Button
                    mode="contained"
                    onPress={handleCreateEvent}
                    style={styles.modalCreateButton}>
                    Create Event
                  </Button>
                </View>
              </ScrollView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </ScrollView>

      {/* Модальне вікно для бронювання квитків */}
      <Modal
        visible={isBookingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsBookingModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setIsBookingModalVisible(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                Booking Tickets for {selectedEvent?.title}
              </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                  style={styles.input}
                  value={bookingForm.name}
                  onChangeText={text => handleInputChange('name', text)}
                  placeholder="Your name"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                  style={styles.input}
                  value={bookingForm.email}
                  onChangeText={text => handleInputChange('email', text)}
                  placeholder="Your email"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tickets:</Text>
                <TextInput
                  style={styles.input}
                  value={bookingForm.tickets.toString()}
                  onChangeText={text =>
                    handleInputChange('tickets', Number(text))
                  }
                  keyboardType="numeric"
                  placeholder="Number of tickets"
                />
              </View>
              <Button
                mode="contained"
                onPress={() => {
                  setBookingForm({
                    name: '',
                    email: '',
                    tickets: 1,
                  });
                  setIsBookingModalVisible(false);
                  Alert.alert(
                    'Booking Confirmed',
                    'Your tickets have been booked!',
                  );
                }}
                style={styles.bookConfirmButton}>
                Confirm Booking
              </Button>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Плаваюча кнопка для створення нової події */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsCreateModalVisible(true)}>
        <Plus color="#fff" size={24} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDECEA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryChip: {
    margin: 4,
    borderColor: '#D32F2F',
  },
  selectedChip: {
    backgroundColor: '#D32F2F',
    color: '#fff',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D32F2F',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 2,
  },
  description: {
    color: '#444',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  bookButton: {
    margin: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#D32F2F',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D32F2F',
    borderRadius: 5,
    padding: 10,
  },
  multilineInput: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D32F2F',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  dateTimePicker: {
    flex: 1,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalCancelButton: {
    flex: 0.45,
  },
  modalCreateButton: {
    flex: 0.45,
    backgroundColor: '#D32F2F',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: '#333',
  },
  bookConfirmButton: {
    marginTop: 20,
    backgroundColor: '#D32F2F',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#D32F2F',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default EventsScreen;
