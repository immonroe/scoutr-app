import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, Image } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { useHeader } from "../utils/useHeader"
import { colors } from "../theme"


export const NotificationScreen: FC<StackScreenProps<AppStackScreenProps, "Notification">> = observer(function NotificationScreen() {

  const navigation = useNavigation()

  const emptyBgImage = require('../../assets/images/meditating.png')

  useHeader({
    titleTx: 'headers.notification',
    leftIcon: 'caretLeft',
    titleStyle: $title,
    leftIconColor: colors.palette.primary600,
    onLeftPress: () => navigation.goBack(),
  })

  return (
    <Screen style={$root} preset="scroll">
      <View style={$imageContainer}>
        <Image source={emptyBgImage} />
        <Text tx="notificationScreen.empty" style={$empty} />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $title: TextStyle = {
  fontSize: 33,
  fontWeight: "bold",
  lineHeight: 50,
  fontStyle: "normal",
  textAlign: "left",
  paddingLeft: 60
}

const $imageContainer: ViewStyle = {
  alignItems: "center",
  top: '28.45%'
}

const $empty: TextStyle = {
  fontSize: 20,
  fontWeight: "700",
  lineHeight: 30,
  textAlign: "center",
  marginTop: 20
}