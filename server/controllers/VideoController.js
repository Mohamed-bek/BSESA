import Video from "../models/Video.js";
import uploadToSpaces, { GetVideoUrl } from "../utitlitis/awsDigitalOcean.js";

export const CreateVideo = async (req, res) => {
  try {
    const { title, description, links, filename, contentType } = req.body;
    const thumbnailFile = req.file;

    if (!filename || !contentType) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    if (!thumbnailFile) {
      return res.status(400).json({ message: "No thumbnail file uploaded" });
    }

    const thumbnailUrl = await uploadToSpaces(
      thumbnailFile,
      "/VideoThumbnails"
    );
    const Key = `${Date.now()}-${filename}`;
    const videoUrl = await GetVideoUrl(Key, contentType);

    const newVideo = new Video({
      title,
      description,
      url: `${process.env.DO_PRESIGNED_URL}${Key}`,
      thumbnail: thumbnailUrl,
      links: links ? JSON.parse(links) : [],
    });

    await newVideo.save();
    res.status(201).json({
      message: "Upload successful and video saved",
      url: videoUrl,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: "Uploading Error ", err: error.message });
  }
};

export const GetAllVideos = async (req, res) => {
  try {
    const { title, time, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (time) {
      const now = new Date();
      let startDate;

      switch (time) {
        case "last_day":
          startDate = new Date(now.setDate(now.getDate() - 1));
          break;
        case "last_week":
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case "last_month":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case "last_year":
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        console.log("Start date: " + startDate);
        filter.createdAt = { $gte: startDate };
      }
    }
    const videos = await Video.find(filter)
      .skip((page - 1) * NumberVideos)
      .limit(NumberVideos)
      .select("title createdAt url");

    res.status(200).json({ videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: error.message });
  }
};

export const GetVideo = async (req, res) => {
  try {
    const { videoId, courseId } = req.params;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Prepare the response
    const videoData = {
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
      pdf: video.pdf,
      links: video.links,
    };

    if (req.videoAccess) {
      videoData.url = video.url;
    }
    res.status(200).json({ video: videoData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching video" });
  }
};

// const uploadVideo = async (file, videoData) => {
//     const formData = new FormData();
//     formData.append('video', file);
//     formData.append('title', videoData.title);
//     formData.append('description', videoData.description);
//     formData.append('thumbnail', file);
//     formData.append('pdf', videoData.pdf);
//     formData.append('links', JSON.stringify(videoData.links)); // Convert links to JSON string

//     try {
//       const response = await fetch('http://localhost:3000/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await response.json();
//       console.log('Upload and save successful:', result);
//     } catch (error) {
//       console.error('Error uploading video:', error);
//     }
//   };

//   // Usage example:
//   document.getElementById('videoUpload').addEventListener('change', (e) => {
//     const file = e.target.files[0];
//     const videoData = {
//       title: 'Sample Video',
//       description: 'This is a sample description.',
//       thumbnail: 'thumbnail-url-or-path',
//       pdf: 'pdf-url-or-path',
//       links: ['https://example.com'],
//     };
//     if (file) {
//       uploadVideo(file, videoData);
//     }
//   });
