import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full">
          <Text
            className={`text-sm font-JakartaSemiBold text-gray-700 mb-2 ${labelStyle}`}
          >
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative rounded-xl mb-2 border transition-colors h-14 ${containerStyle || "bg-gray-50 border-gray-200"}`}
          >
            {icon && (
              <Image
                source={icon}
                className={`w-5 h-5 ml-4 opacity-60 ${iconStyle}`}
              />
            )}
            <TextInput
              className={`rounded-xl font-Jakarta text-[15px] flex-1 ${inputStyle || "text-gray-900"} text-left ${icon ? "ml-2" : "ml-4"} mr-4`}
              secureTextEntry={secureTextEntry}
              placeholderTextColor="#9CA3AF"
              style={{ height: "100%", textAlignVertical: "center" }}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
