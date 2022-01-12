/* eslint-disable no-use-before-define */
import { DeviceRepo, PushRepo, DeviceInput, PushInput, PushService } from './interfaces/interfaces';
import { sendPushToFirebase } from './firebase';

export const createPushService = (pushRepo: PushRepo, deviceRepo: DeviceRepo): PushService => {
  const postPush = async (push: PushInput) => {
    pushRepo.insertPush(push).catch(console.dir);
    sendPush(push.message, push.userId, deviceRepo);
  };

  const getAllPushs = () => {
    return pushRepo.fetchAllPushs();
  };

  const postDevice = (device: DeviceInput) => {
    deviceRepo.insertDevice(device).catch(console.dir);
  };

  const getAllDevices = () => {
    return deviceRepo.fetchAllDevices();
  };

  return { postPush, getAllPushs, postDevice, getAllDevices };
};

export const sendPush = async (message: string, userId: string, deviceRepo: DeviceRepo) => {
  const usersDevices = await deviceRepo.fetchUserDevices(userId);
  usersDevices.forEach(device => {
    if (device.deviceType === 'android' && device.externalDeviceId) {
      sendPushToFirebase(message, device.externalDeviceId);
    }
  });
};
