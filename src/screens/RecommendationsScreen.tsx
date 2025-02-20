import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Card, Title, Paragraph, Text, Button, FAB} from 'react-native-paper';
import {Calendar, MapPin, Star, Heart, Share2, Info} from 'lucide-react-native';
import Header from '../components/Header';
import { Background } from '../components/background';

const RecommendationsScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const recommendations = [
    {
      id: 1,
      title: 'Salzburg Festival',
      date: 'March 20-30, 2025',
      description:
        "Annual music and drama festival celebrating Mozart's legacy.",
      location: 'Salzburg, Austria',
      rating: 4.8,
      image: './salzburg-festival.jpg', // Placeholder image
      details:
        'Experience world-class performances across multiple venues, featuring classical music, opera, and theater. A must-visit event for music and culture enthusiasts.',
    },
    {
      id: 2,
      title: 'Vienna Philharmonic Concert',
      date: 'April 15, 2025',
      description: "Legendary orchestra's spring performance",
      location: 'Vienna Concert Hall',
      rating: 4.9,
      image: './vienna-philharmonic.jpg', // Placeholder image
      details:
        "An extraordinary evening of classical masterpieces performed by one of the world's most renowned orchestras. Conducted by a internationally acclaimed maestro.",
    },
    {
      id: 3,
      title: 'Mozart Summer Academy',
      date: 'July 1-15, 2025',
      description: 'Intensive music education program',
      location: 'Mozarteum University',
      rating: 4.7,
      image: './mozart-academy.jpg', // Placeholder image
      details:
        "A unique opportunity for young musicians to study and perform Mozart's works under guidance of world-class instructors and performers.",
    },
  ];

  const toggleFavorite = (recommendation: any) => {
    setFavorites((current: any) =>
      current.some((fav: any) => fav.id === recommendation.id)
        ? current.filter((fav: any) => fav.id !== recommendation.id)
        : [...current, recommendation],
    );
  };

  const showMoreDetails = (recommendation: any) => {
    setSelectedRecommendation(recommendation);
    setIsModalVisible(true);
  };

  const shareRecommendation = (recommendation: any) => {
    Alert.alert(
      'Share Recommendation',
      `Sharing details about ${recommendation.title}`,
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Background />
      <Header />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {recommendations.map(recommendation => (
            <Card key={recommendation.id} style={styles.card}>
              <Card.Content>
                {/* Заголовок та іконки */}
                <View style={styles.cardHeader}>
                  <Title numberOfLines={1} style={styles.title}>
                    {recommendation.title}
                  </Title>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                      onPress={() => toggleFavorite(recommendation)}
                      style={styles.iconButton}>
                      <Heart
                        color={
                          favorites.some(
                            (fav: any) => fav.id === recommendation.id,
                          )
                            ? '#FF0000'
                            : '#FF0000'
                        }
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => shareRecommendation(recommendation)}
                      style={styles.iconButton}>
                      <Share2 color="#FF0000" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Деталі заходу */}
                <View style={styles.detailContainer}>
                  <Calendar color="#FF0000" size={20} />
                  <Text style={styles.detailText}>{recommendation.date}</Text>
                </View>
                <View style={styles.detailContainer}>
                  <MapPin color="#FF0000" size={20} />
                  <Text style={styles.detailText}>
                    {recommendation.location}
                  </Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Star color="#FFD700" size={20} />
                  <Text style={styles.ratingText}>
                    {recommendation.rating} / 5.0
                  </Text>
                </View>

                {/* Опис */}
                <Paragraph style={styles.description}>
                  {recommendation.description}
                </Paragraph>

                {/* Кнопка "More Details" */}
                <Button
                  mode="contained"
                  onPress={() => showMoreDetails(recommendation)}
                  style={styles.moreInfoButton}
                  labelStyle={styles.moreInfoButtonLabel}>
                  More Details
                </Button>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        {/* FAB для перегляду улюблених */}
        <FAB
          style={styles.fab}
          icon="heart"
          label={`Favorites (${favorites.length})`}
          onPress={() => {
            if (favorites.length > 0) {
              Alert.alert(
                'Favorite Recommendations',
                favorites.map((f: any) => f.title).join('\n'),
              );
            } else {
              Alert.alert(
                'No Favorites',
                'Add recommendations to your favorites',
              );
            }
          }}
        />

        {/* Модальне вікно для розгорнутих деталей */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedRecommendation && (
                <>
                  <Title style={styles.modalTitle}>
                    {selectedRecommendation.title}
                  </Title>
                  <View style={styles.modalDetailContainer}>
                    <Info color="#FF0000" size={20} />
                    <Text style={styles.modalDetailText}>
                      {selectedRecommendation.details}
                    </Text>
                  </View>
                  <Button
                    mode="contained"
                    onPress={() => setIsModalVisible(false)}
                    style={styles.modalCloseButton}
                    labelStyle={styles.modalCloseButtonLabel}>
                    Close
                  </Button>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 12,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FF0000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FFD700',
  },
  description: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 16,
    color: '#FF3333',
  },
  moreInfoButton: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    paddingVertical: 6,
  },
  moreInfoButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#FF0000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  modalDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalDetailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  modalCloseButton: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    paddingVertical: 8,
  },
  modalCloseButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RecommendationsScreen;
