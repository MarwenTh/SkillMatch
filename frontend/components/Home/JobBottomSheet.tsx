import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { Text } from "react-native";

const JobBottomSheet = ({ bottomSheetRef, snapPoints, job }) => (
  <BottomSheet
    ref={bottomSheetRef}
    snapPoints={snapPoints}
    style={{ zIndex: 1000 }}
    index={-1}
    enablePanDownToClose={true}
  >
    <BottomSheetView>
      {job ? (
        <>
          <Text className="text-xl font-bold mb-2">{job.job_title}</Text>
          <Text className="text-lg text-blue-700 mb-2">
            {job.employer_name}
          </Text>
        </>
      ) : (
        <Text>No job selected</Text>
      )}
    </BottomSheetView>
  </BottomSheet>
);

export default JobBottomSheet;
