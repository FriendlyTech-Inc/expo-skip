// app/(study)/attack/question/[questionId].tsx
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function QuestionScreen() {
  return (
    <View style={styles.container}>
      <Text>Question Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});