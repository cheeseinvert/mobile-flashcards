import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { purple, white, black } from "../utils/colors";

export default function Deck({ navigation }) {
  const { navigate, state } = navigation;
  const { deck } = state.params;

  return (
    <View>
      <Text style={styles.deckText}>{deck.title}</Text>
      <Text style={[styles.btnText, { color: black }]}>
        {deck.questions.length} cards
      </Text>
      <TouchableOpacity
        style={styles.iosBtn}
        onPress={() => {
          navigate("CardEntry", { deck: deck });
        }}
      >
        <Text style={styles.btnText}>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iosBtn}
        onPress={() => {
          navigate("Quiz", { deck: deck });
        }}
      >
        <Text style={styles.btnText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  iosBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    padding: 10,
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
