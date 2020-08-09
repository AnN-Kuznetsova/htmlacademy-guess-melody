import * as React from "react";


interface Props {
  src: string;
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  step: number;
};

interface State {
  progress: number;
  isLoading: boolean;
  isPlaying: boolean;
  step: number;
};


export const withAudio = (Component) => {
  class WithAudio extends React.PureComponent<Props, State> {
    private audioRef: React.RefObject<HTMLAudioElement>;

    constructor(props) {
      super(props);

      this.audioRef = React.createRef();

      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying,
        step: null,
      };

      this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this.audioRef.current;

      audio.src = src;

      audio.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

      audio.onplay = () => this.setState({
        isPlaying: true,
      });

      audio.onpause = () => this.setState({
        isPlaying: false,
      });

      audio.ontimeupdate = () => this.setState({
        progress: Math.floor(audio.currentTime),
      });
    }

    componentDidUpdate() {
      const audio = this.audioRef.current;

      if (this.state.step !== this.props.step) {
        audio.src = this.props.src;
        this.setState({
          step: this.props.step,
          isPlaying: false,
        });
      }

      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWillUnmount() {
      const audio = this.audioRef.current;

      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }

    handlePlayButtonClick() {
      const {onPlayButtonClick} = this.props;

      this.setState((prevState) => ({
        isPlaying: !prevState.isPlaying,
      }),
      onPlayButtonClick);
    }

    render() {
      const {isLoading, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
          onPlayButtonClick={this.handlePlayButtonClick}
        >
          <audio ref={this.audioRef} />
        </Component>
      );
    }
  }


  return WithAudio;
};
