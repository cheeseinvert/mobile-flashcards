import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet
} from "react-native";
import { saveDeckTitle } from "../utils/helpers";
import { purple, white, gray } from "../utils/colors";

class DeckEntry extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add New Flashcard Deck"
    };
  };
  state = { input: "" };

  render() {
    const { navigate } = this.props.navigation;
    const { input } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.deckText}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          value={this.state.input}
          onChangeText={input => this.setState({ input })}
        />
        <TouchableOpacity
          style={styles.iosSubmitBtn}
          onPress={() => saveDeckTitle(input).then(() => navigate("Home"))}
        >
          <Text style={styles.submitBtnText}>Create Deck</Text>
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
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  deckText: {
    color: purple,
    fontSize: 25,
    textAlign: "center"
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    padding: 10,
    margin: 20
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  }
});

export default DeckEntry;
