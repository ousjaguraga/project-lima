import { flow } from './flow';

// Test the application state machine works correctly

describe('app flow', (): void => {
  it('initial', (): void => {
    expect.assertions(1);
    expect(flow.states.initial.on.next).toStrictEqual('modelReady');
  });

  it('initial button text', (): void => {
    expect.assertions(1);
    expect(flow.states.initial.current?.buttonText).toStrictEqual(
      'loading....',
    );
  });

  it('modelReady', (): void => {
    expect.assertions(1);
    expect(flow.states.modelReady.on.next).toStrictEqual('imageReady');
  });

  it('modelReady button text', (): void => {
    expect.assertions(1);
    expect(flow.states.modelReady.current?.buttonText).toStrictEqual(
      'upload image',
    );
  });

  it('imageReady', (): void => {
    expect.assertions(1);
    expect(flow.states.imageReady.on.next).toStrictEqual('classifyReady');
  });

  it('imageReady button text', (): void => {
    expect.assertions(1);
    expect(flow.states.modelReady.current?.buttonText).toStrictEqual(
      'upload image',
    );
  });

  //

  it('classifyReady', (): void => {
    expect.assertions(1);
    expect(flow.states.classifyReady.on.next).toStrictEqual('galleryLoaded');
  });

  it('classify ready  button text', (): void => {
    expect.assertions(1);
    expect(flow.states.classifyReady.current?.buttonText).toStrictEqual(
      'load gallery',
    );
  });

  it('galleryLoaded', (): void => {
    expect.assertions(1);
    expect(flow.states.galleryLoaded.on.next).toStrictEqual('complete');
  });

  it('gallery loaded  button text', (): void => {
    expect.assertions(1);
    expect(flow.states.galleryLoaded.current?.buttonText).toStrictEqual(
      'start again',
    );
  });

  it('complete', (): void => {
    expect.assertions(1);
    expect(flow.states.complete.on.next).toStrictEqual('imageReady');
  });
});
