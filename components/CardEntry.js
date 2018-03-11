import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import { saveDeckTitle, getDeck, addCardToDeck } from "../utils/helpers";
import { purple, white, gray } from "../utils/colors";

class CardEntry extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add New Flashcard"
    };
  };

  state = { quesition: "", answer: "" };

  render() {
    const { navigate, state } = this.props.navigation;
    const { deck } = state.params;

    return (
      <View style={styles.container}>
        <Text style={styles.deckText}>Question</Text>
        <TextInput
          style={styles.input}
          value={this.state.question}
          onChangeText={question => {
            this.setState({ question });
          }}
        />
        <Text style={styles.deckText}>Answer:</Text>
        <TextInput
          style={styles.input}
          value={this.state.answer}
          onChangeText={answer => {
            this.setState({ answer });
          }}
        />
        <TouchableOpacity
          style={styles.iosSubmitBtn}
          onPress={() => {
            const card = {
              question: this.state.question,
              answer: this.state.answer
            };
            addCardToDeck(deck.title, card).then(() => navigate("Home"));
          }}
        >
          <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    marginBottom: 30
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 40
  },
  deckText: {
    color: purple,
    fontSize: 25,
    textAlign: "left"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  }
});

export default CardEntry;
