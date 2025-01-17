import Video from "../models/Video.js";
import uploadToSpaces, {
  deleteFromSpaces,
  GetVideoUrl,
} from "../utitlitis/awsDigitalOcean.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

export const GetUrlForVideo = async (req, res) => {
  try {
    const { filename, contentType } = req.body;
    const Key = `${Date.now()}-${filename}`;
    const videoUrl = await GetVideoUrl(Key, contentType);
    res.status(201).json({
      message: "Upload successful and video saved",
      url: videoUrl,
      realUrl: `${
        process.env.DO_PRESIGNED_URL ||
        "https://bsesa.lon1.cdn.digitaloceanspaces.com/"
      }${Key}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const CreateVideo = async (req, res) => {
  try {
    const { title, description, links, url } = req.body;
    const thumbnailFile = req.file;

    if (!thumbnailFile) {
      return res.status(400).json({ message: "No thumbnail file uploaded" });
    }
    const thumbnailUrl = await uploadToSpaces(
      thumbnailFile,
      "/VideoThumbnails"
    );

    let linksArray = [];
    if (typeof links === "string") {
      try {
        linksArray = JSON.parse(links);
      } catch (err) {
        return res.status(400).json({ message: "Invalid links format" });
      }
    } else if (Array.isArray(links)) {
      linksArray = links;
    }

    const newVideo = new Video({
      title,
      description,
      url,
      thumbnail: thumbnailUrl,
      links: linksArray,
    });

    await newVideo.save();
    res.status(201).json({
      message: "Upload successful and video saved",
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: "Uploading Error ", err: error.message });
  }
};

export const UpdateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, links } = req.body;

    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (req.file) {
      const OldPath = video.thumbnail;
      const newThumbnail = await uploadToSpaces(req.file, "/VideoThumbnails");
      video.thumbnail = newThumbnail;
      await deleteFromSpaces(OldPath);
    }

    if (links) {
      let linksArray = [];
      if (typeof links === "string") {
        try {
          linksArray = JSON.parse(links);
        } catch (err) {
          return res.status(400).json({ message: "Invalid links format" });
        }
      } else if (Array.isArray(links)) {
        linksArray = links;
      }
      video.links = linksArray;
    }

    if (title) video.title = title;

    if (description) video.description = description;

    await video.save();

    res.status(201).json({
      message: "Upload successful and video saved",
      video,
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
        filter.createdAt = { $gte: startDate };
      }
    }
    const videos = await Video.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .select("title createdAt url thumbnail");

    const NbOfVideos = await Video.countDocuments(filter);

    res.status(200).json({ videos, NbOfPages: Math.ceil(NbOfVideos / limit) });
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

export const GetVideoForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id).select(
      "title description links thumbnail url"
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ video });
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

export const deleteVideoAndRemoveFromCourses = async (req, res) => {
  try {
    const { id } = req.params;

    const { password } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      res.status(404).json({ error: "Video not found" });
    }
    if (deletedVideo.url) {
      await deleteFromSpaces(deletedVideo.url);
    }

    await Course.updateMany(
      { "videos.video": id },
      { $pull: { videos: { video: id } } }
    );

    res.status(200).json({
      message: "Video and references removed successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
