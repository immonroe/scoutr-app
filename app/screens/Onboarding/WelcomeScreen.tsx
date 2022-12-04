import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button, 
  Text,
} from "../../components"
import { AppStackScreenProps } from "../../navigators" 
import { colors, spacing } from "../../theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("../../../assets/images/logo.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {} 

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props, 
) {
  const { navigation } = _props

  function goNext() {
    navigation.navigate("Onboarding", { screen: "EnterPhone" })
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="common.title"
          preset="heading"
        />
        <Text style={$welcomeSubHeading} tx="welcomeScreen.slogan" preset="subheading" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen.button"
          onPress={goNext}
          style={{ backgroundColor: colors.palette.primary600 }}
        />
        <Text style={$bottomText} text="v 1.0" preset="subheading" />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.huge,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
  textAlign: "center",
}

const $welcomeSubHeading: TextStyle = {
  marginBottom: spacing.large,
  textAlign: "center",
}

const $bottomText: TextStyle = {
  textAlign: "center",
  color: colors.palette.neutral400,
}
