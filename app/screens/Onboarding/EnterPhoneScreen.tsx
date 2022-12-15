import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AuthStackScreenProps } from "../../navigators"
import { Screen, TextField, Button } from "../../components"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../utils/useHeader"
import { useStores } from "../../models"
// import { api } from "../../services/api"

export const EnterPhoneScreen: FC<StackScreenProps<AuthStackScreenProps, "EnterPhone">> = observer(
  function EnterPhoneScreen({ navigation }) {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const {
      authenticationStore: { 
        authPhone, 
        setAuthPhone, 
        validationErrors 
      },
    } = useStores()


    const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)

    const sendOtp = () => {
      setIsSubmitted(true)
      if (Object.values(validationErrors).some((v) => !!v)) return

      // const response = await api.auth.sendOtp(authPhone)
      // if (response.kind === "ok") {
      //   navigation.navigate("Onboarding", { screen: "VerifyOtp" })
      // }

      navigation.navigate("Onboarding", { screen: "VerifyOtp" })
    }

    useHeader({
      titleTx: "enterPhoneScreen.title",
      titleStyle: $title,
      rightIcon: "x",
      rightIconColor: colors.palette.primary600,
      onRightPress: () => navigation.goBack(),
    })

    useEffect(() => {
      return () => {
        setAuthPhone("")
      }
    }, [])

    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]}>
        <View style={$content}>
          <TextField
            value={authPhone}
            onChangeText={setAuthPhone}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="tel"
            maxLength={10}
            autoCorrect={false}
            keyboardType="phone-pad"
            placeholderTx="enterPhoneScreen.phoneFieldPlaceholder"
            helper={errors?.authPhone}
            status={errors?.authPhone ? "error" : undefined}
          />
          <Button
            testID="enter-phone-button"
            tx="common.nextBtn"
            style={$btn}
            preset="reversed"
            onPress={sendOtp}
          />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  fontSize: 48,
  fontWeight: "bold",
  lineHeight: 72,
  fontStyle: "normal",
  textAlign: "left",
  top: 0,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $btn: ViewStyle = {
  marginTop: spacing.extraSmall,
}

const $content: ViewStyle = {
  top: "90%",
}
