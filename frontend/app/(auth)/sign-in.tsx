import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
// import OAuth from "@/components/OAuth";
import signin from "@/assets/images/signin.jpg";
import OAuth from "@/components/OAuth";
import { icons } from "@/constants";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    setLoading(true);
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, form]);

  return (
    <View className="flex-1 bg-white">
      {/* Hero Section with Image */}
      <View className="relative w-full h-[240px]">
        <Image source={signin} className="w-full h-full" resizeMode="cover" />
        <View className="absolute inset-0 bg-black/30" />
        <View className="absolute bottom-8 left-6 right-6">
          <Text className="text-4xl text-white font-JakartaExtraBold mb-2">
            Welcome back
          </Text>
          <Text className="text-lg text-white/90 font-JakartaLight">
            Sign in to continue your journey
          </Text>
        </View>
      </View>

      {/* Form Section */}
      <View className="px-6 py-8 -mt-6 bg-white rounded-t-3xl relative z-10 flex-1">
        <View className="mb-8">
          <Text className="text-2xl font-JakartaExtraBold text-gray-900 mb-2">
            Sign in to your account
          </Text>
          <Text className="text-base text-gray-600 font-Jakarta">
            Enter your credentials to access your account
          </Text>
        </View>

        <View className="space-y-6">
          <InputField
            label="Email Address"
            placeholder="Enter your email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value: any) => setForm({ ...form, email: value })}
            containerStyle="bg-gray-50 border-gray-200"
            inputStyle="text-gray-900"
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
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
          title={loading ? "Signing in..." : "Sign In"}
          onPress={onSignInPress}
          className="mt-8 bg-primary-500 shadow-lg shadow-primary-500/30"
          disabled={loading}
        />

        <OAuth />

        <View className="mt-8 pt-6 border-t border-gray-100">
          <Text className="text-center text-gray-600 font-Jakarta">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary-500 font-JakartaSemiBold"
            >
              Sign up now
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
