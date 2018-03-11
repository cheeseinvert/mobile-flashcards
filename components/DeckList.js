import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { getDecks } from "../utils/helpers";
import { AppLoading } from "expo";
import { purple, white, gray } from "../utils/colors";

class DeckList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "All Flashcard Decks"
    };
  };
  state = {
    ready: false
  };
  componentDidMount() {
    getDecks().then(decks => {
      this.setState({
        ready: true,
        decks: decks
      });
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    const { ready, decks } = this.state;
    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <View>
        <FlatList
          data={Object.values(decks)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.container, styles.iosBtn, styles.center]}
              onPress={() => {
                navigate("DeckView", { deck: item });
              }}
            >
              <Text style={styles.deckText}>{item.title}</Text>
              <Text style={styles.btnText}>{item.questions.length} cards</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.title}
        />
      </View>
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
    fontSize: 50,
    textAlign: "center"
  },
  btnText: {
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

export default DeckList;
