import * as React from 'react';
import {Subtract} from "utility-types";

import {AudioPlayerWithAudio as AudioPlayer} from "../../components/audio-player/audio-player";


interface Props {
  step: number;
}

interface State {
  activePlayerId: number;
}

interface InjectingProps {
  renderPlayer: (src: string, id: number) => React.ReactNode;
}


export const withActivePlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectingProps>;

  class WithActivePlayer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    componentDidUpdate(prevProps) {
      if (prevProps.step !== this.props.step) {
        this.setState({
          activePlayerId: 0,
        });
      }
    }

    handlePlayButtonClick(id) {
      const {activePlayerId} = this.state;

      this.setState({
        activePlayerId: activePlayerId === id ? -1 : id
      });
    }

    renderPlayer(src, id) {
      const {activePlayerId} = this.state;

      return (
        <AudioPlayer
          src={src}
          isPlaying={id === activePlayerId}
          onPlayButtonClick={this.handlePlayButtonClick.bind(this, id)}
          step={this.props.step}
        />
      );

    }

    render() {
      return <Component
        {...this.props}
        renderPlayer={this.renderPlayer.bind(this)}
      />;
    }
  }


  return WithActivePlayer;
};
