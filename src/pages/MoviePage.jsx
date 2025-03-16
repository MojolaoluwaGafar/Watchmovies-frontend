import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";

const MoviePage = () => {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieVideo = async () => {
      try {
        const response = await fetch(
          `https://watchmovies-backend.onrender.com/api/movies/${id}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.statusText}`);
        }

        const data = await response.json();
        setVideoUrl(data.videoUrl);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieVideo();
  }, [id]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      {videoUrl ? (
        <VideoPlayer videoUrl={videoUrl} />
      ) : (
        <p>No video available.</p>
      )}
    </div>
  );
};

export default MoviePage;
