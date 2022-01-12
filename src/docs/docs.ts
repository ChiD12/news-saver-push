import { basicinfo } from './basicinfo';
import { components } from './components';
import { pushs } from './push';
import { devices } from './devices';

export const docs = {
  ...basicinfo,
  ...components,
  paths: {
    ...pushs,
    ...devices
  }
};
