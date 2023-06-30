import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Book from "./src/screens/Book";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            title: "자유톡",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: 'white'
            }
          }}
        />
        <Stack.Screen
          name="book"
          component={Book}
          options={{
            title: "{title of the book}",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackVisible: true,
            animationTypeForReplace: "push",
            animation: "slide_from_right",
            contentStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              maxWidth: Dimensions.get("window").width - 100,
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
