import { TFlow } from '../types';

export const flow: TFlow = {
  buttonInitialText: 'load model',
  initialState: 'initial',

  states: {
    classifyReady: {
      current: { buttonText: 'load gallery' },
      on: { next: 'galleryLoaded' },
    },
    complete: {
      current: { buttonText: 'upload image' },
      on: { next: 'imageReady' },
    },

    galleryLoaded: {
      current: { buttonText: 'start again' },
      on: { next: 'complete' },
    },
    imageReady: {
      current: { buttonText: 'identify breed' },
      on: { next: 'classifyReady' },
      showImage: true,
    },

    initial: {
      current: { buttonText: 'loading....' },
      on: { next: 'modelReady' },
    },

    modelReady: {
      current: { buttonText: 'upload image' },
      on: { next: 'imageReady' },
    },
  },
};
