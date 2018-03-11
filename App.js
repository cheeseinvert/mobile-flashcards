import React from "react";
import { Text, View, StatusBar } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import DeckList from "./components/DeckList";
import DeckEntry from "./components/DeckEntry";
import Deck from "./components/Deck";
import Quiz from "./components/Quiz";
import CardEntry from "./components/CardEntry";
import { initDecks, setLocalNotification } from "./utils/helpers";
import { AppLoading } from "expo";
import { white, gray, purple } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Notifications, Permissions, Constants } from "expo";

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      )
    }
  },
  NewDeck: {
    screen: DeckEntry,
    navigationOptions: {
      tabBarLabel: "New Deck",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckView: {
    screen: Deck
  },
  CardEntry: {
    screen: CardEntry
  },
  Quiz: {
    screen: Quiz
  }
});

export default class App extends React.Component {
  state = {
    ready: false
  };
  componentDidMount() {
    setLocalNotification();
    initDecks().then(decks => {
      this.setState({
        ready: true,
        decks: decks
      });
    });
  }

  render() {
    const { ready, decks } = this.state;
    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <View style={{ flex: 1 }}>
        <FlashcardStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}
