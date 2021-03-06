export interface Device {
  id: string;
  deviceType: string;
  externalDeviceId?: string;
  userId: string;
}

export interface DeviceInput {
  deviceType: string;
  externalDeviceId?: string;
  userId: string;
}

export interface DeviceRepo {
  insertDevice(device: DeviceInput): Promise<void>;
  fetchAllDevices(): Promise<Device[]>;
  fetchUserDevices(userId: string): Promise<Device[]>;
}

export interface Push {
  id: string;
  message: string;
  userId: string;
  sentFromDeviceId: string;
  deviceType: string;
  datePosted: string;
}

export interface PushInput {
  message: string;
  userId: string;
  sentFromDeviceId: string;
  deviceType: string;
}

export interface PushRepo {
  insertPush(push: PushInput): Promise<void>;
  fetchAllPushs(): Promise<Push[]>;
  fetchPushsFromUser(userId: string): Promise<Push[]>;
}

export interface PushService {
  postPush(push: PushInput): void;
  getAllPushs(): Promise<Push[]>;
  getPushsFromUser(userId: string): Promise<Push[]>;
  postDevice(device: DeviceInput): void;
  getAllDevices(): Promise<Device[]>;
  getAllDevices(): Promise<Device[]>;
}
