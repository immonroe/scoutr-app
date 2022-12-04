import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Screen, TextField, Button, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { useHeader } from "../../utils/useHeader"
import { useStores } from "../../models"

export const VerifyOtpScreen: FC<StackScreenProps<AppStackScreenProps, "VerifyOtp">> = observer(function VerifyOtpScreen() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigation = useNavigation()

  const {
    authenticationStore: { 
      authPhone,
      otpCode, 
      setOtpCode, 
      validationErrors,
      setAuthToken, 
    },
  } = useStores()

  const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)

  useHeader({
    titleTx: "verifyOtpScreen.title",
    titleStyle: $title,
    rightIcon: "x",
    rightIconColor: colors.palette.primary600,
    onRightPress: () => navigation.goBack(),
  })

  const verifyOtp = async () => {
    setIsSubmitted(true)
    if (Object.values(validationErrors).some((v) => !!v)) return

    // const response = await api.auth.verifyOtp(otpCode)
    // if (response.kind === "ok") {
    //   navigation.navigate("Onboarding", { screen: "VerifyOtp" })
    // }
    setAuthToken(String(Date.now()))
    navigation.navigate("Root", { screen: "Feed" })
  }



  useEffect(() => {
    return () => {
      setOtpCode("")
    }
  }, [])

  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]}>
    <View style={$content}>
      <View style={$row}>
        <Text text={authPhone} style={$label} />
        <Text tx="common.change" style={$highlight} />
      </View>
      <TextField
        value={otpCode}
        onChangeText={setOtpCode}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="sms-otp"
        maxLength={6}
        autoCorrect={false}
        keyboardType="number-pad"
        placeholderTx="verifyOtpScreen.otpFieldLabel"
        helper={errors?.otpCode}
        status={errors?.otpCode ? "error" : undefined}
        // onSubmitEditing={() => authPasswordInput.current?.focus()}
      />
      <Button
        testID="enter-phone-button"
        tx="common.nextBtn"
        style={$btn}
        preset="reversed"
        onPress={verifyOtp}
      />
    </View>
  </Screen>
  )
})

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
  borderRadius: 10,
}

const $btn: ViewStyle = {
  marginTop: spacing.extraSmall,
}

const $content: ViewStyle = {
  top: "70%",
}

const $row: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}

const $label: TextStyle = {
  textAlign: "center",
  fontSize: 24,
  fontWeight: "bold",
}

const $highlight: TextStyle = {
  textAlign: "center",
  fontSize: 16,
  fontWeight: "bold",
  color: colors.palette.primary600,
}
