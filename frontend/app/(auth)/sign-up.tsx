import signup from "@/assets/images/signup.jpg";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);

  const [form, setForm] = useState({
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    setLoading(true);
    if (!isLoaded) return;
    try {
      await signUp.create({
        firstName: form.name.firstName,
        lastName: form.name.lastName,
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    } finally {
      setLoading(false);
    }
  };
  const onPressVerify = async () => {
    setVerificationLoading(true);
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === "complete") {
        await fetchAPI("/api/user", {
          method: "POST",
          body: JSON.stringify({
            firstname: form.name.firstName,
            lastname: form.name.lastName,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setVerificationLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Hero Section with Image */}
      <View className="relative w-full h-[250px]">
        <Image source={signup} className="w-full h-full" resizeMode="cover" />
        <View className="absolute inset-0 bg-black/30" />
        <View className="absolute bottom-8 left-6 right-6">
          <Text className="text-4xl text-white font-JakartaExtraBold mb-2">
            Join us today
          </Text>
          <Text className="text-lg text-white/90 font-JakartaLight">
            Create your account and start your journey
          </Text>
        </View>
      </View>

      {/* Form Section */}
      <View className="px-6 py-8 -mt-6 bg-white rounded-t-3xl relative z-10 flex-1">
        <View className="mb-8">
          <Text className="text-2xl font-JakartaExtraBold text-gray-900 mb-2">
            Create your account
          </Text>
          <Text className="text-base text-gray-600 font-Jakarta">
            Fill in your details to get started
          </Text>
        </View>

        <View className="space-y-6">
          <View className="flex-row space-x-4 gap-x-4">
            <View className="flex-1">
              <InputField
                label="First Name"
                placeholder="Enter first name"
                icon={icons.person}
                value={form.name.firstName}
                onChangeText={(value: any) =>
                  setForm({ ...form, name: { ...form.name, firstName: value } })
                }
                containerStyle="bg-gray-50 border-gray-200"
                inputStyle="text-gray-900"
              />
            </View>
            <View className="flex-1">
              <InputField
                label="Last Name"
                placeholder="Enter last name"
                icon={icons.person}
                value={form.name.lastName}
                onChangeText={(value: any) =>
                  setForm({ ...form, name: { ...form.name, lastName: value } })
                }
                containerStyle="bg-gray-50 border-gray-200"
                inputStyle="text-gray-900"
              />
            </View>
          </View>

          <InputField
            label="Email Address"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value: any) => setForm({ ...form, email: value })}
            containerStyle="bg-gray-50 border-gray-200"
            inputStyle="text-gray-900"
          />

          <InputField
            label="Password"
            placeholder="Create a password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value: any) => setForm({ ...form, password: value })}
            containerStyle="bg-gray-50 border-gray-200"
            inputStyle="text-gray-900"
          />
        </View>

        <CustomButton
          title={loading ? "Creating account..." : "Create Account"}
          onPress={() => onSignUpPress()}
          disabled={loading}
          className="mt-8 bg-primary-500 shadow-lg shadow-primary-500/30"
        />

        <OAuth />

        <View className="mt-8 pt-6 border-t border-gray-100">
          <Text className="text-center text-gray-600 font-Jakarta">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary-500 font-JakartaSemiBold"
            >
              Sign in
            </Link>
          </Text>
        </View>
      </View>

      {/* Verification Modal */}
      <ReactNativeModal
        isVisible={
          verification.state === "pending" || verification.state === "failed"
        }
        //</View>onBackdropPress={() =>
        //setVerification({ ...verification, state: "pending" })
        //}
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View className="bg-white px-7 py-9 rounded-3xl min-h-[320px] shadow-2xl">
          <Text className="font-JakartaExtraBold text-2xl mb-3 text-gray-900">
            Verify your email
          </Text>
          <Text className="font-Jakarta text-gray-600 mb-6 leading-6">
            We've sent a verification code to{" "}
            <Text className="font-JakartaSemiBold text-gray-900">
              {form.email}
            </Text>
          </Text>
          <InputField
            label="Verification Code"
            icon={icons.lock}
            placeholder="Enter 6-digit code"
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(code: any) =>
              setVerification({ ...verification, code })
            }
            containerStyle="bg-gray-50 border-gray-200"
            inputStyle="text-gray-900"
          />
          {verification.error && (
            <Text className="text-red-500 text-sm mt-2 font-Jakarta">
              {verification.error}
            </Text>
          )}
          <CustomButton
            title={verificationLoading ? "Verifying..." : "Verify Email"}
            onPress={onPressVerify}
            className="mt-6 bg-success-500 shadow-lg shadow-success-500/30"
            disabled={verificationLoading}
          />
        </View>
      </ReactNativeModal>

      {/* Success Modal */}
      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-3xl min-h-[320px] shadow-2xl">
          <View className="items-center mb-6">
            <View className="w-20 h-20 bg-success-100 rounded-full items-center justify-center mb-4">
              <Image source={images.check} className="w-10 h-10" />
            </View>
            <Text className="text-2xl font-JakartaExtraBold text-gray-900 text-center">
              Welcome aboard!
            </Text>
            <Text className="text-base text-gray-600 font-Jakarta text-center mt-2 leading-6">
              Your account has been successfully created and verified.
            </Text>
          </View>
          <CustomButton
            title="Get Started"
            onPress={() => {
              router.push(`/(root)/(tabs)/home`);
              setShowSuccessModal(false);
            }}
            className="bg-primary-500 shadow-lg shadow-primary-500/30"
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default SignUp;
