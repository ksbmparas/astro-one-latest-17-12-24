import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import MyHeader from '../components/MyHeader';

const About = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MyHeader title="About AstroOne" navigation={navigation}/>
      <ScrollView style={{padding:15}} showsVerticalScrollIndicator={false}>
        {/* App Logo or Banner Image */}
        {/* <Image
          source={{ uri: 'https://link_to_your_image.com/image.png' }}
          style={styles.bannerImage}
        /> */}
        <Text style={styles.heading}>About Astro One</Text>
      
        <Text style={styles.paragraph}>
          Astro One is a Devotional App which is dedicated to assisting millions of Indians in their spiritual and devotional journeys. It also offers precise guidance to the devotees for worshipping their beloved God.
        </Text>
      
        <Text style={styles.paragraph}>
          Astro One App is a no-cost devotional platform for the tech-savvy Hindu devotees. It enables the users to set up their own 'Virtual Temples' with just a few clicks and worship their revered deities directly from their phones anytime, and anywhere.
        </Text>
        <Text style={styles.subHeading}>What we offer on our App:</Text>
        <Text style={styles.paragraph}>
          You can set up a beautiful temple of your beloved God on your Phone.
        </Text>
        <Text style={styles.paragraph}>
          Perform daily religious rituals like Worshipping, lighting Diya, offering varieties of flowers, blowing Conch (shankhnad) and ringing Bells on Astro One.
        </Text>
        <Text style={styles.paragraph}>
          Listen to popular songs, Bhajans, and Aartis of various Hindu Gods and Goddesses.
        </Text>
        <Text style={styles.paragraph}>
          Listen and Chant Hanuman Chalisa.
        </Text>
        <Text style={styles.paragraph}>
          Share positive thoughts with your loved ones daily.
        </Text>
        <Text style={styles.paragraph}>
          Listen to 'Shubh Mantra' everyday.
        </Text>
        <Text style={styles.paragraph}>
          See 'pooja Vidhi' (step-by-step method of worship) for various auspicious occasions.
        </Text>
        <Text style={styles.paragraph}>
          Read Hindu Scriptures.
        </Text>
        <Text style={styles.paragraph}>
          Read Bhagavad Gita and its valuable teachings.
        </Text>
        <Text style={styles.paragraph}>
          Read various Hindu mythological stories.
        </Text>
        <Text style={styles.paragraph}>
          See 'Dainik Panchang'.
        </Text>
        <Text style={styles.paragraph}>
          See various Ayurvedic Remedies.
        </Text>
        <Text style={styles.paragraph}>
          Earn 'Punya Mudra' and avail all the other services offered by Astro One.
        </Text>
        <Text style={styles.paragraph}>
          Get associated with famous Temples and religious places via 'Astro One Community'.
        </Text>
        {/* Astro One Pooja Service */}
        <Text style={styles.subHeading}>Astro One Pooja Service</Text>
        <Text style={styles.paragraph}>
          In Hindu religion, worshipping Gods is considered an auspicious act that leads to attainment of peace and happiness. Thus, Astro One eases this process and devotees can organise an online Pooja through this application with just a few clicks.
        </Text>
        <Text style={styles.paragraph}>
          To host a Pooja, the user needs to choose the ‘Pooja Seva’ option of their revered deity and register their Name and Gotra. After this step, as per the available slot, a Priest will conduct a Pooja session on the registered individual/family’s behalf.
        </Text>
        <Text style={styles.paragraph}>
          Before the Pooja session begins, the names of the members who booked the Pooja will be mentioned to attain sankalp. After its conclusion, the Pooja recording will be shared with the beneficiary (ies) and the Mahaprasad (optional) will be sent too.
        </Text>
        <View style={{marginBottom:50}}></View>
      </ScrollView>
    </View>
  );
}

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',

  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
  },
});
