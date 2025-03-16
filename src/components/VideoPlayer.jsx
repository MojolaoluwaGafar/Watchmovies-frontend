import PropTypes from "prop-types";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }) => {
  if (!videoUrl) {
    return <p className="text-white text-center">No video available</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <ReactPlayer
        url={videoUrl}
        controls
        width="80%"
        height="auto"
        playing={false} // Set to true for autoplay
      />
    </div>
  );
};

// Define prop types
VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired, // Ensures videoUrl is a required string
};

export default VideoPlayer;
