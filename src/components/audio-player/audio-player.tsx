import * as React from "react";

import {withAudio} from "../../hocs/with-audio/with-audio";


interface Props {
  isLoading: boolean;
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  children: React.ReactNode | React.ReactNode[];
}


const AudioPlayer: React.FunctionComponent<Props> = (props: Props) => {
  const {isLoading, isPlaying, onPlayButtonClick, children} = props;

  return (
    <React.Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}
      />
      <div className="track__status">
        {children}
      </div>
    </React.Fragment>
  );
};


const AudioPlayerWithAudio = withAudio(AudioPlayer);


export {
  AudioPlayer,
  AudioPlayerWithAudio,
};
