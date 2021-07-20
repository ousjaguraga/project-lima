import { IBreed } from './interfaces';

export type Action =
  | { type: 'next' }
  | { type: 'failed'; error: string }
  | { type: 'loadedLinks'; links: [] }
  | { type: 'identified'; breed: IBreed[] | undefined; result?: string }
  | { type: 'loading' }
  | { type: 'navigate'; to: StateKey; buttonText: string }
  | { type: 'reset' };

export interface APPevent {
  on: { next: string };
  showImage?: boolean;
  showResults?: boolean;
  current?: { buttonText?: string; action?: string };
}

export interface APPstate {
  initial: APPevent;
  modelReady: APPevent;
  imageReady: APPevent;
  classifyReady: APPevent;
  galleryLoaded: APPevent;
  complete: APPevent;
}

export interface TFlow {
  initialState: string;
  buttonInitialText: string;
  states: APPstate;
}

export interface State {
  appState: string;
  buttonText?: string;
  error?: string;
  isLoading?: boolean;
  links?: [];
  breed?: IBreed[] | undefined;
  result?: string;
}

export type StateKey =
  | 'initial'
  | 'modelReady'
  | 'imageReady'
  | 'classifyReady'
  | 'galleryLoaded'
  | 'complete';
