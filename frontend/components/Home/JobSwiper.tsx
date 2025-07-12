import useFetchJSearch from "@/hooks/useFetchJSearch";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Button,
  Dimensions,
  Linking,
  PanResponder,
  Text,
  View,
} from "react-native";
import JobBottomSheet from "./JobBottomSheet";
import JobCard from "./JobCard";
import JobOverlay from "./JobOverlay";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const CARD_WIDTH = SCREEN_WIDTH * 0.92;

const MAX_FETCH_ATTEMPTS = 3;

const JobSwiper = ({ filters = {} }) => {
  const {
    data: jobs,
    isLoading,
    error,
    fetchNextJob,
    reset,
    query,
  } = useFetchJSearch("search", {
    ...filters,
    query: filters && "query" in filters ? filters.query : "part time",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pending, setPending] = useState(false);
  const [fetchAttempts, setFetchAttempts] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "99%"], []);

  // Fetch the first job on mount or when filters change
  useEffect(() => {
    reset({
      ...filters,
      query: filters && "query" in filters ? filters.query : "part time",
    });
    setCurrentIndex(0);
    setPending(false);
    setFetchAttempts(0);
    fetchNextJob({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  // Fetch next job when needed (keep at least 2 jobs in the stack)
  useEffect(() => {
    if (jobs.length - currentIndex < 2 && !isLoading) {
      setPending(true);
      setFetchAttempts((prev) => prev + 1);
      fetchNextJob({});
    } else if (jobs.length - currentIndex >= 1) {
      setPending(false);
      setFetchAttempts(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs, currentIndex]);

  // If after several fetch attempts there are still no jobs, stop pending and show 'No jobs found'
  useEffect(() => {
    if (
      pending &&
      fetchAttempts >= MAX_FETCH_ATTEMPTS &&
      jobs.length - currentIndex < 1 &&
      !isLoading
    ) {
      setPending(false);
    }
  }, [pending, fetchAttempts, jobs, currentIndex, isLoading]);

  const openSheet = () => bottomSheetRef.current?.expand();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          handleApply();
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
      onPanResponderTerminate: () => {},
    })
  ).current;

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      setCurrentIndex((prev) => prev + 1);
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
      friction: 5,
    }).start();
  };

  // Open job apply link on swipe right
  const handleApply = () => {
    const job = jobs[currentIndex];
    if (job && job.job_apply_link) {
      Linking.openURL(job.job_apply_link);
    }
  };

  // Animated values for overlay text
  const applyOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const applyScale = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0.8, 1],
    extrapolate: "clamp",
  });
  const passOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const passScale = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const renderJobs = () => {
    if (isLoading && jobs.length === 0) {
      return (
        <View className="w-full h-full flex items-center justify-center rounded-3xl bg-gray-100 shadow-lg">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      );
    }
    if (error && jobs.length === 0) {
      return (
        <View className="w-full h-full flex items-center justify-center rounded-3xl bg-gray-100 shadow-lg">
          <Text className="text-2xl text-red-400 font-semibold">
            Error loading jobs
          </Text>
        </View>
      );
    }
    if (pending && jobs.length - currentIndex < 1) {
      return (
        <View className="w-full h-full flex items-center justify-center rounded-3xl bg-gray-100 shadow-lg">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      );
    }
    if (
      (!pending && jobs.length - currentIndex < 1) ||
      (!pending &&
        fetchAttempts >= MAX_FETCH_ATTEMPTS &&
        jobs.length - currentIndex < 1)
    ) {
      return (
        <View className="w-full h-full flex items-center justify-center rounded-3xl bg-gray-100 shadow-lg">
          <Text className="text-2xl text-gray-400 font-semibold">
            No more jobs
          </Text>
        </View>
      );
    }

    const job = jobs[currentIndex];
    const nextJob = jobs[currentIndex + 1];

    return (
      <>
        {/* Next card preview */}
        {nextJob && (
          <JobCard
            job={nextJob}
            animatedStyle={{
              transform: [
                {
                  scale: position.x.interpolate({
                    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                    outputRange: [1, 0.96, 1],
                    extrapolate: "clamp",
                  }),
                },
                {
                  translateY: position.x.interpolate({
                    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                    outputRange: [0, 12, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
            panHandlers={{}}
            children={null}
          />
        )}

        {/* Top card */}
        <JobCard
          job={job}
          animatedStyle={{
            transform: [
              ...position.getTranslateTransform(),
              {
                rotate: position.x.interpolate({
                  inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                  outputRange: ["-18deg", "0deg", "18deg"],
                }),
              },
            ],
          }}
          panHandlers={panResponder.panHandlers}
        >
          <JobOverlay
            applyOpacity={applyOpacity}
            applyScale={applyScale}
            passOpacity={passOpacity}
            passScale={passScale}
          />
          <Button title="Read More" onPress={openSheet} />
        </JobCard>
      </>
    );
  };

  return (
    <View className="flex-1 w-full items-center justify-center mt-3">
      <View className="flex-1 w-full items-center justify-center">
        {renderJobs()}
      </View>
      <JobBottomSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        job={jobs && jobs[currentIndex]}
      />
    </View>
  );
};

export default JobSwiper;
