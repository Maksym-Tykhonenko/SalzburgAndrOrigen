import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  Button,
  Card,
  Title,
  Paragraph,
  Text,
  Chip,
  TextInput,
} from 'react-native-paper';
import {Calendar, MapPin, Clock} from 'lucide-react-native';
import Header from '../components/Header';

const TicketsScreen = () => {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    price: '',
  });

  // Updated logic: if tickets are available (availableTickets > 0) – show the booking form
  const handleBookTicket = (ticket: any) => {
    if (ticket.availableTickets > 0) {
      setSelectedTicket(ticket);
      setIsModalVisible(true);
    } else {
      Alert.alert('Sold Out', 'Sorry, no tickets available for this event.');
    }
  };

  // Handling the booking submission after the form is filled
  const processBooking = () => {
    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.cardName ||
      !paymentDetails.expiryDate ||
      !paymentDetails.price
    ) {
      Alert.alert('Error', 'Please fill in all booking details');
      return;
    }

    // Simulate successful booking request submission
    Alert.alert(
      'Booking Request Submitted',
      `Your booking for ${selectedTicket.title} has been received. We will process it and get back to you shortly.`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Since this is a booking request, we do not immediately reduce the available tickets.
            setPaymentDetails({
              cardNumber: '',
              cardName: '',
              expiryDate: '',
              price: '',
            });
            setIsModalVisible(false);
          },
        },
      ],
    );
  };

  const tickets = [
    {
      id: 1,
      title: 'Mozart Concert',
      date: 'March 15, 2025',
      time: '7:30 PM',
      venue: 'Salzburg Cathedral',
      price: 85,
      availableTickets: 10,
      image: './symphony-lights.jpg', // Placeholder image
      description:
        'Experience the timeless music of Wolfgang Amadeus Mozart in the historic Salzburg Cathedral.',
    },
    {
      id: 2,
      title: 'Symphony of Lights',
      date: 'April 22, 2025',
      time: '8:00 PM',
      venue: 'City Concert Hall',
      price: 65,
      availableTickets: 0,
      image: './symphony-lights.jpg', // Placeholder image
      description:
        'A mesmerizing evening of classical and contemporary orchestral performances.',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        {tickets.map(ticket => (
          <Card key={ticket.id} style={styles.card}>
            {/* Uncomment and use the Image component if an image is needed */}
            {/* <Card.Cover source={{ uri: ticket.image }} style={styles.cardImage} /> */}
            <Card.Content>
              <Title style={styles.title}>{ticket.title}</Title>

              <View style={styles.detailContainer}>
                <Calendar color="#FF0000" size={20} />
                <Text style={styles.detailText}>{ticket.date}</Text>
              </View>

              <View style={styles.detailContainer}>
                <Clock color="#FF0000" size={20} />
                <Text style={styles.detailText}>{ticket.time}</Text>
              </View>

              <View style={styles.detailContainer}>
                <MapPin color="#FF0000" size={20} />
                <Text style={styles.detailText}>{ticket.venue}</Text>
              </View>

              <Paragraph style={styles.description}>
                {ticket.description}
              </Paragraph>

              <View style={styles.infoContainer}>
                <Chip style={styles.priceChip} textStyle={styles.chipText}>
                  ${ticket.price}
                </Chip>
                <Chip
                  style={
                    ticket.availableTickets > 0
                      ? styles.availableChip
                      : styles.soldOutChip
                  }
                  textStyle={styles.chipText}>
                  {ticket.availableTickets > 0
                    ? `${ticket.availableTickets} Tickets Available`
                    : 'Sold Out'}
                </Chip>
              </View>

              <Button
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttonLabel}
              //onPress={() => handleBookTicket(ticket)}
              >
                Book Ticket
              </Button>
            </Card.Content>
          </Card>
        ))}

        {/* Modal for booking */}
        <Modal
          visible={isModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Title style={styles.modalTitle}>Confirm Ticket Booking</Title>
              {selectedTicket && (
                <>
                  <Text style={styles.modalText}>
                    Event: {selectedTicket.title}
                  </Text>
                  <Text style={styles.modalText}>
                    Price: ${selectedTicket.price}
                  </Text>

                  {/* Booking details form */}
                  <TextInput
                    label="First Name"
                    value={paymentDetails.cardNumber}
                    onChangeText={text =>
                      setPaymentDetails({...paymentDetails, cardNumber: text})
                    }
                    style={styles.input}
                  />
                  <TextInput
                    label="Last Name"
                    value={paymentDetails.cardName}
                    onChangeText={text =>
                      setPaymentDetails({...paymentDetails, cardName: text})
                    }
                    style={styles.input}
                  />
                  <View style={styles.paymentRowContainer}>
                    <TextInput
                      label="Contact Info"
                      value={paymentDetails.expiryDate}
                      onChangeText={text =>
                        setPaymentDetails({...paymentDetails, expiryDate: text})
                      }
                      style={[styles.input, styles.halfInput]}
                    />
                    <TextInput
                      label="Additional Info"
                      value={paymentDetails.price}
                      onChangeText={text =>
                        setPaymentDetails({...paymentDetails, price: text})
                      }
                      style={[styles.input, styles.halfInput]}
                    />
                  </View>

                  <View style={styles.modalButtonContainer}>
                    <Button
                      mode="outlined"
                      //onPress={() => {
                      //  setIsModalVisible(false);
                      //  setPaymentDetails({
                      //    cardNumber: '',
                      //    cardName: '',
                      //    expiryDate: '',
                      //    price: '',
                      //  });
                      //}}
                      style={styles.cancelButton}
                      labelStyle={styles.cancelButtonLabel}>
                      Cancel
                    </Button>
                    <Button
                      mode="contained"
                      //onPress={processBooking}
                      style={styles.payButton}
                      labelStyle={styles.payButtonLabel}>
                      Submit Booking
                    </Button>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardImage: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF0000',
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FF4C4C',
  },
  description: {
    marginTop: 10,
    marginBottom: 15,
    color: '#FF6666',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  priceChip: {
    backgroundColor: '#FF4C4C',
  },
  availableChip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF0000',
    borderWidth: 1,
  },
  soldOutChip: {
    backgroundColor: '#FF0000',
  },
  chipText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 6,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#FF0000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#FF0000',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderColor: '#FF0000',
  },
  paymentRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    width: '45%',
    borderColor: '#FF0000',
    borderWidth: 1,
    borderRadius: 8,
  },
  cancelButtonLabel: {
    color: '#FF0000',
    fontWeight: '600',
  },
  payButton: {
    width: '45%',
    backgroundColor: '#FF4C4C',
    borderRadius: 8,
  },
  payButtonLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default TicketsScreen;
