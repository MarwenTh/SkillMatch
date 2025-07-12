import React from "react";
import { Animated, Text } from "react-native";

const JobOverlay = ({ applyOpacity, applyScale, passOpacity, passScale }) => (
  <>
    <Animated.View
      style={{
        position: "absolute",
        top: 24,
        left: 24,
        opacity: applyOpacity,
        transform: [{ scale: applyScale }, { rotate: "-5deg" }],
        zIndex: 20,
        shadowColor: "#16a34a",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Text
        className="border-4 border-green-600 text-green-700 font-extrabold text-2xl px-10 py-2 rounded-xl bg-white/90 tracking-widest uppercase shadow-md"
        style={{ letterSpacing: 3 }}
      >
        APPLY
      </Text>
    </Animated.View>
    <Animated.View
      style={{
        position: "absolute",
        top: 24,
        right: 24,
        opacity: passOpacity,
        transform: [{ scale: passScale }, { rotate: "5deg" }],
        zIndex: 20,
        shadowColor: "#dc2626",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Text
        className="border-4 border-danger-500 text-danger-600 font-extrabold text-2xl px-10 py-2 rounded-xl bg-white/90 tracking-widest uppercase "
        style={{ letterSpacing: 3 }}
      >
        PASS
      </Text>
    </Animated.View>
  </>
);

export default JobOverlay;
