import React from 'react';

interface ProgressProperties {
  state: { appState: string };
}
export default function progress(props: ProgressProperties) {
  return (
    <div id="progress">
      {props.state.appState === 'modelReady' && (
        <span className="progressChild"></span>
      )}
      {props.state.appState === 'imageReady' && (
        <>
          <span className="progressChild"></span>
          <span className="progressChild"></span>
        </>
      )}
      {props.state.appState === 'classifyReady' && (
        <>
          <span className="progressChild"></span>
          <span className="progressChild"></span>
          <span className="progressChild"></span>
        </>
      )}
      {props.state.appState === 'galleryLoaded' && (
        <>
          <span className="progressChild"></span>
          <span className="progressChild"></span>
          <span className="progressChild"></span>
          <span className="progressChild"></span>
        </>
      )}
      {props.state.appState === 'complete' && (
        <>
          <span className="progressChild"></span>
          <span className="progressChild"></span>
          <span className="progressChild"></span>
          <span className="progressChild"></span>
          <span className="progressChild"></span>
        </>
      )}
    </div>
  );
}
