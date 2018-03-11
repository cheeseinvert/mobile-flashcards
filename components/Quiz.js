import React, { Component } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { purple, white, gray, green, red } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;
    return {
      title: `${deck.title} Quiz`
    };
  };
  state = {
    display: "question",
    correct: 0,
    incorrect: 0,
    questionIndex: 0
  };

  updateCorrect() {
    const { correct, questionIndex } = this.state;
    this.setState({
      correct: correct + 1,
      questionIndex: questionIndex + 1,
      display: "question"
    });
  }

  updateIncorrect() {
    const { incorrect, questionIndex } = this.state;
    this.setState({
      incorrect: incorrect + 1,
      questionIndex: questionIndex + 1,
      display: "question"
    });
  }

  render() {
    const { display, questionIndex, correct, incorrect } = this.state;
    const { navigate } = this.props.navigation;
    const { deck } = this.props.navigation.state.params;

    if (deck.questions.length === questionIndex) {
      clearLocalNotification().then(setLocalNotification);
      return (
        <View style={styles.container}>
          <Text
            style={[styles.deckText, { marginBottom: 40 }]}
          >{`You answered ${correct}/${questionIndex} correct [${correct /
            questionIndex *
            100}%]`}</Text>
          <TouchableOpacity
            style={styles.iosBtn}
            onPress={() => {
              navigate("Quiz", { deck: deck });
            }}
          >
            <Text style={styles.btnText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iosBtn}
            onPress={() => {
              navigate("DeckView", { deck: deck });
            }}
          >
            <Text style={styles.btnText}>Back To Deck</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const { question, answer } = deck.questions[questionIndex];

    return (
      <ScrollView style={styles.container}>
        <Text>
          {questionIndex + 1}/{deck.questions.length}
        </Text>
        {display === "question" ? (
          <View style={{ margin: 30 }}>
            <Text style={styles.deckText}>{question}</Text>
            <Text
              style={[styles.btnText, { color: red, margin: 30 }]}
              onPress={() => this.setState({ display: "answer" })}
            >
              Answer
            </Text>
          </View>
        ) : (
          <View style={{ margin: 30 }}>
            <Text style={styles.deckText}>{answer}</Text>
            <Text
              style={[styles.btnText, { color: red, margin: 30 }]}
              onPress={() => this.setState({ display: "question" })}
            >
              Question
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.iosBtn, { backgroundColor: green }]}
          onPress={() => {
            this.updateCorrect();
          }}
        >
          <Text style={styles.btnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iosBtn, { backgroundColor: red }]}
          onPress={() => {
            this.updateIncorrect();
          }}
        >
          <Text style={styles.btnText}>Incorrect</Text>
        </TouchableOpacity>
        {}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  iosBtn: {
    backgroundColor: gray,
    padding: 10,
    borderRadius: 7,
    margin: 20
  },
  deckText: {
    color: purple,
    fontSize: 25,
    textAlign: "center"
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  }
});
export default Quiz;
