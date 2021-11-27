import AsyncStorage from '@react-native-async-storage/async-storage';

const COMPLETED_TASKS_KEY = 'COMPLETED_TASKS';
const BREAK_MINUTES_KEY = 'BREAK_MINUTES_KEY';
const WORK_MINUTES_KEY = 'WORK_MINUTES_KEY';
const VIBRATION_ENABLED_KEY = 'VIBRATION_ENABLED_KEY';

export const getVibrationEnabled = async () => {
  try {
    const enabled = await AsyncStorage.getItem(VIBRATION_ENABLED_KEY);
    return enabled === null ? null : enabled === 'true' ? true : false;
  } catch (e) {
    console.log(e);
  }
};
const a = async () => {
  console.log(await getVibrationEnabled());
};
a();

export const saveVibrationEnabled = async (enabled: boolean) => {
  try {
    await AsyncStorage.setItem(VIBRATION_ENABLED_KEY, enabled.toString());
  } catch (error) {
    console.log(error);
  }
};

export const getBreakMinutes = async () => {
  try {
    const breakMinutes = await AsyncStorage.getItem(BREAK_MINUTES_KEY);
    return breakMinutes ? breakMinutes : null;
  } catch (e) {
    console.log(e);
  }
};

export const saveBreakMinutes = async (breakMinutes: number) => {
  try {
    await AsyncStorage.setItem(BREAK_MINUTES_KEY, breakMinutes.toString());
  } catch (error) {
    console.log(error);
  }
};

export const getWorkMinutes = async () => {
  try {
    const workMinutes = await AsyncStorage.getItem(WORK_MINUTES_KEY);
    return workMinutes ? workMinutes : null;
  } catch (e) {
    console.log(e);
  }
};

export const saveWorkMinutes = async (workMinutes: number) => {
  try {
    await AsyncStorage.setItem(WORK_MINUTES_KEY, workMinutes.toString());
  } catch (error) {
    console.log(error);
  }
};

export const getCompletedTasksFromStorage = async () => {
  try {
    const tasks = await AsyncStorage.getItem(COMPLETED_TASKS_KEY);
    return tasks ? JSON.parse(tasks) : null;
  } catch (e) {
    console.log(e);
  }
};

export const addCompletedTaskToStorage = async (dateTime: string) => {
  try {
    const prevTasks = await getCompletedTasksFromStorage();
    let newTasks = [dateTime];
    if (prevTasks) {
      newTasks = [...prevTasks, ...newTasks];
    }

    await AsyncStorage.setItem(COMPLETED_TASKS_KEY, JSON.stringify(newTasks));
  } catch (error) {
    console.log(error);
  }
};
