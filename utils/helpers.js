import React from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { red, orange, blue, lightPurp, pink, white } from "./colors";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = "Flashcards:notifications";
const DB_KEY = "Flashcards:db";
const QUIZ_KEY = "Flashcards:quiz";

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20
  }
});

const dummyDecks = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  },
  Cooking: {
    title: "Cooking",
    questions: [
      {
        question: "How many liters in a gallon?",
        answer: "4"
      }
    ]
  }
};

export const dummyCard = cardCreator(
  "this is a dummy question?",
  "this is a dummy answer"
);

export function cardCreator(q, a) {
  return { question: q, answer: a };
}

export async function clearDecks() {
  return await AsyncStorage.removeItem(DB_KEY).then(() =>
    console.log("clearing deck")
  );
}

export async function initDecks() {
  const decks = await clearDecks().then(() =>
    AsyncStorage.setItem(DB_KEY, JSON.stringify(dummyDecks))
  );
  return decks;
}

// return all of the decks along with their titles, questions, and answers.
export async function getDecks() {
  const data = JSON.parse(await AsyncStorage.getItem(DB_KEY));
  return data;
}

//take in a single id argument and return the deck associated with that id.
export async function getDeck(id) {
  const data = JSON.parse(await AsyncStorage.getItem(DB_KEY));
  return data[id];
}

// take in a single title argument and add it to the decks.
export async function saveDeckTitle(title) {
  const decks = await getDecks();
  return AsyncStorage.setItem(
    DB_KEY,
    JSON.stringify({
      ...decks,
      [title]: { title: title, questions: [] }
    })
  );
}

// take in two arguments, title and card, and will add the card to the list of questions for the
// deck with the associated title.
export async function addCardToDeck(title, card) {
  console.log(`title ${title} cart ${card}`);
  const decks = await getDecks();
  if (decks[title] && decks[title].questions) {
    return AsyncStorage.setItem(
      DB_KEY,
      JSON.stringify({
        ...decks,
        [title]: {
          title: title,
          questions: [...decks[title].questions, card]
        }
      })
    );
  } else {
    return AsyncStorage.setItem(
      DB_KEY,
      JSON.stringify({
        ...decks,
        [title]: {
          title: title,
          questions: [card]
        }
      })
    );
  }
}

export function clearLocalNotification() {
  console.log("clearLocalNotification");
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Study!",
    body: "👋 don't forget to do some flashcard quizes today!",
    ios: {
      sound: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(12);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
