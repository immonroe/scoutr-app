import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  EnterPhoneScreen,
  VerifyOtpScreen
} from "../screens"

export type AuthNavigatorParamList = {
  EnterPhone: undefined,
  VerifyOtp: undefined,
}

const Stack = createStackNavigator<AuthNavigatorParamList>()
export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false, }}>
      <Stack.Screen name="EnterPhone" component={EnterPhoneScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
    </Stack.Navigator>
  )
}
