// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function App() {
  const [heroes, setHeroes] = useState('');
  const [villains, setVillains] = useState('');
  const [plot, setPlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState('');

  const fetchFairyTale = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
        messages: [
          { role: 'system', content: 'You are a creative storyteller. Please create a fairy tale based on provided elements.' },
          { role: 'user', content: `Heroes: ${heroes}, Villains: ${villains}, Plot: ${plot}` },
        ],
        model: 'gpt-4o',
      });
      const { data } = response;
      setStory(data.response);
    } catch (error) {
      setStory('Sorry, something went wrong while generating your fairy tale.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Fairy Tale Generator</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Heroes"
          value={heroes}
          onChangeText={(text) => setHeroes(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Villains"
          value={villains}
          onChangeText={(text) => setVillains(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Plot"
          value={plot}
          onChangeText={(text) => setPlot(text)}
        />
        <Button title="Generate Fairy Tale" onPress={fetchFairyTale} />
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        {story ? <Text style={styles.story}>{story}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    paddingTop: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  story: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
  },
});