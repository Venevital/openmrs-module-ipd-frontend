import axios from "axios";
import moment from "moment";
import {
  GET_SLOTS_FOR_PATIENTS_URL,
  LIST_OF_WARDS_URL,
  WARD_SUMMARY_URL,
  GET_TASKS_FOR_PATIENTS_URL,
} from "../../../constants";
import { getDateTime } from "../../DisplayControls/DrugChart/utils/DrugChartUtils";

const fetchSlots = async (url) => {
  try {
    return await axios.get(url);
  } catch (e) {
    return e;
  }
};

export const getColumnData = (slot, startTime, endTime) => {
  const columnData = [];
  slot.currentSlots.forEach((slotItem) => {
    if (slotItem.startTime >= startTime && slotItem.startTime < endTime) {
      columnData.push(slotItem);
    }
  });
  return columnData;
};

export const getTaskColumnData = (tasks, startTime, endTime) => {
  let columnData = [];
  tasks?.forEach((task) => {
    const taskStartTime = task.requestedStartTime / 1000;
    if (taskStartTime >= startTime && taskStartTime < endTime) {
      columnData.push({
        ...task,
        startTime: taskStartTime,
        isNonMedication: true,
      });
    }
  });
  return columnData;
};

export const getSlotsForPatients = async (
  patientUuids,
  startTime,
  endTime,
  includePreviousSlot = true,
  includeSlotDuration = true
) => {
  const patientUuidParams = patientUuids
    .map((uuid) => `patientUuids=${uuid}`)
    .join("&");
  const FETCH_SLOTS_URL = `${GET_SLOTS_FOR_PATIENTS_URL}?${patientUuidParams}&startTime=${startTime}&endTime=${endTime}&includePreviousSlot=${includePreviousSlot}&includeSlotDuration=${includeSlotDuration}`;
  const response = await fetchSlots(FETCH_SLOTS_URL);
  if (response.status === 200) {
    return response.data;
  }
  return [];
};

export const getTasksForPatients = async (patientUuids, startTime, endTime) => {
  const patientUuidParams = patientUuids
    .map((uuid) => `patientUuids=${uuid}`)
    .join("&");
  const TASK_URL = `${GET_TASKS_FOR_PATIENTS_URL}?${patientUuidParams}&startTime=${startTime}&endTime=${
    endTime - 60 * 1000
  }`;
  const response = await axios.get(TASK_URL);
  if (response.status === 200) {
    return response.data;
  }
  return {};
};

export const getWardOptions = async () => {
  try {
    const response = await axios.get(LIST_OF_WARDS_URL);
    if (response.status === 200) {
      const wardList = response.data.results;
      const wardOptions = wardList.map((ward) => ({
        label: ward.ward.display,
        value: ward.ward.uuid,
      }));
      return wardOptions;
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const getSelectedWard = (
  existingSelectedWards = {},
  providerUuid,
  wardOptions
) => {
  const ward = existingSelectedWards[providerUuid];
  return ward ? ward : wardOptions[0];
};

export const getWardSummary = async (selectedWardId, providerUuid) => {
  if (selectedWardId === null || selectedWardId === undefined) {
    return {};
  }
  try {
    const response = await axios.get(
      WARD_SUMMARY_URL.replace("{wardId}", selectedWardId),
      {
        params: { providerUuid },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    return {};
  } catch (error) {
    return {};
  }
};
/**
NOTE: The below function calculates the number of slides to show based on screen resolution.
 For mobile View We are expecting to show 2 tiles at a time.
 The calculation is for the Tablet View to show as many tiles possible based the parent component size.
 The size of each tile is 142 px and the width of the parent component is 90% of the Screen so the window.outerWidth *0.9 which is the parent component's width
 and dividing by 142 gives the number of Tiles which can fit in the parent.
 */
export const getSlidesPerView = (isMobileView, isTabletView) => {
  if (isMobileView) {
    return 2;
  } else if (isTabletView) {
    return Math.floor((window.outerWidth * 0.9) / 142);
  }
};

export const getPreviousShiftDetails = (
  rangeArray,
  shiftIndex,
  startDate,
  endDate
) => {
  const previousShiftIndex =
    shiftIndex - 1 < 0 ? rangeArray.length - 1 : shiftIndex - 1;
  const previousShiftRange = rangeArray[previousShiftIndex];
  const [previousStartTime, previousEndTime] = previousShiftRange.split("-");
  const previousStartTimeMoment = moment(
    getDateTime(new Date(startDate), previousStartTime)
  );
  const previousEndTimeMoment = moment(
    getDateTime(new Date(endDate), previousEndTime)
  );

  const currentShiftRange = rangeArray[shiftIndex];
  const [currentStartTime, currentEndTime] = currentShiftRange.split("-");
  const currentStartTimeMoment = moment(
    getDateTime(new Date(startDate), currentStartTime)
  );
  const currentEndTimeMoment = moment(
    getDateTime(new Date(endDate), currentEndTime)
  );

  let previousStartDate =
    previousStartTimeMoment.diff(currentStartTimeMoment, "hours", true) > 0
      ? previousStartTimeMoment.subtract(1, "days")
      : previousStartTimeMoment;
  let previousEndDate =
    previousEndTimeMoment.diff(currentEndTimeMoment, "hours", true) > 0
      ? previousEndTimeMoment.subtract(1, "days")
      : previousEndTimeMoment;

  const previousShiftDetails = {
    startDateTime: +previousStartDate,
    endDateTime: +previousEndDate,
    previousShiftIndex,
  };
  return previousShiftDetails;
};
