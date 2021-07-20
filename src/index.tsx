import './index.css';
import React, { FC, ChangeEvent, useRef, useReducer } from 'react';

import ReactDom from 'react-dom';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import Upload from './components/upload';
import Progress from './components/progress';
import { breeds } from './breeds';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Gallery from './components/gallery';
import { Action, State, StateKey } from './types';
import Error from './components/errorbox';
import { flow } from './components/flow';

tf.getBackend();

console.log(process.env.PUBLIC_URL);
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'next':
      return {
        ...state,
        appState: flow['states'][state.appState as StateKey].on.next,
        buttonText:
          flow['states'][state.appState as StateKey].current?.buttonText,
      };
    case 'identified':
      return { ...state, breed: action.breed, result: action.result };

    case 'failed':
      return { ...state, error: action.error };

    case 'navigate':
      return {
        ...state,
        appState: action.to,
        buttonText: action.buttonText,
      };
    case 'reset':
      return {
        ...state,
        result: '',
        links: [],
      };

    case 'loading':
      return { ...state, isLoading: !state.isLoading };

    case 'loadedLinks':
      return { ...state, links: action.links };

    default:
      return state;
  }
}

const App: FC = () => {
  const [link, setLink] = React.useState<string>();
  const [model, setModel] = React.useState<mobilenet.MobileNet>();
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, {
    appState: flow.initialState,
    buttonText: flow.buttonInitialText,
  });
  React.useEffect(() => {
    reset();
  }, [link]);

  const reset = () => {
    dispatch({ type: 'reset' });
    console.log('reset ....');
  };

  function handleActionButton() {
    switch (state.appState) {
      case 'initial':
        loadModel();
        next();
        break;

      case 'modelReady':
        break;

      case 'imageReady':
        handleUpload();
        break;

      case 'classifyReady':
        classify();
        break;

      case 'galleryLoaded':
        handleGallery();
        break;

      case 'complete':
        next();
        break;

      default:
        next();
    }
  }

  const parseBreedUrl = (
    s: Array<string> | RegExpMatchArray,
  ): string | undefined => {
    var path = '';

    if (s.length === 1) {
      path = s[0];
      return path;
    } else {
      let breedKeys = Object.keys(breeds);

      let breed = '';
      for (let i = 0; i < s.length; i++) {
        console.log(s[i]);
        if (breedKeys.includes(s[i].replace(',', ''))) {
          breed = s[i];

          return parseBreedUrl(
            String(breed)
              .replace(',', '')
              .split(' '),
          );
        }
      }
    }
    return '';
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLink(URL.createObjectURL(e.target.files[0]));
      dispatch({ type: 'next' });
    }
  };

  // handle file upload
  const handleUpload = () => {
    inputRef.current?.click();
  };

  // test navigate to
  const startAgain = () => {
    dispatch({ type: 'reset' });
  };

  // load the model
  const loadModel = async () => {
    dispatch({ type: 'loading' });
    try {
      const model = await mobilenet.load();
      console.log(model);
      setModel(model);

      dispatch({ type: 'next' });
      dispatch({ type: 'loading' });
    } catch (error) {
      dispatch({
        type: 'failed',
        error: "Model couldn't be loaded, are connected to the internet",
      });
    }
  };

  // classify
  const classify = async () => {
    try {
      const r = await model?.classify(imgRef.current as HTMLImageElement);

      if (r != undefined) {
        dispatch({ type: 'identified', breed: r, result: r[0].className });

        dispatch({ type: 'next' });
      }
    } catch (error) {
      dispatch({
        type: 'failed',
        error: 'Could not identify this. Is it a dog?',
      });
    }
  };

  // next
  const next = () => {
    dispatch({ type: 'next' });
  };

  const handleGallery = async () => {
    dispatch({ type: 'loading' });

    try {
      if (state.breed != undefined) {
        // remove _ and convert class name to string[]
        let dogClass = state.breed[0].className
          .replace('-', '')
          .toLowerCase()
          .split(' ');

        // parseURl
        const path = parseBreedUrl(dogClass);
        const url: string = `https://dog.ceo/api/breed/${path
          ?.replace(',', '')
          .replace('-', '')}/images`;

        let response = await fetch(url);

        if (!response.ok) {
          dispatch({ type: 'failed', error: `${response.status}` });
          dispatch({ type: 'reset' });
          startAgain();
        }

        let res = await response.json();
        if (res) {
          dispatch({ type: 'loadedLinks', links: res.message });
          dispatch({ type: 'loading' });
          dispatch({ type: 'next' });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 id="main-header">Welcome to Dog breed</h1>
      <div id="image-container">
        <img id="preview-image" src={link} ref={imgRef} />

        <Upload changeHandler={handleFileChange} inputRef={inputRef} />
      </div>
      <h1 id="result">{state.result}</h1>
      <div id="action-btn-container">
        <button
          disabled={state.isLoading}
          className="action-btn"
          id="show-breed"
          onClick={handleActionButton}
        >
          {state.buttonText}
        </button>{' '}
        <Progress state={state} />
      </div>
      <div className="galleryContainer">
        {typeof state.links === 'object' ? (
          <>
            {state.links?.map((link, key) => (
              <LazyLoadImage
                src={link}
                alt=""
                key={key}
                height="400px"
                width="520px"
                effect="blur"
                placeholder={<Gallery />}
              />
            ))}
          </>
        ) : (
          <Error errorMessage={state.error} />
        )}
      </div>
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
