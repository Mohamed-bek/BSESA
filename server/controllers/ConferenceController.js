import Conference from "../models/Conference.js";
import uploadToSpaces from "../utitlitis/awsDigitalOcean.js";

export const CreateConference = async (req, res) => {
  try {
    const { name, description, location, startDate, endDate, speakers } =
      req.body;
    const files = req.files;

    // Validation checks
    if (!name) {
      return res.status(400).json({ error: "Conference name is required" });
    }

    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }

    if (!startDate) {
      return res.status(400).json({ error: "Start date is required" });
    }

    // Check for main image
    if (!files || !files.image) {
      return res.status(400).json({ error: "Conference image is required" });
    }

    // Upload main image
    const mainImage = await uploadToSpaces(files.image[0], "/Conference");

    // Process speakers
    const processedSpeakers = [];

    // Check if speakers exist and is an array
    if (speakers && Array.isArray(speakers)) {
      for (let i = 0; i < speakers.length; i++) {
        const speaker = JSON.parse(speakers[i]); // Assuming speakers are sent as stringified JSON

        // Prepare speaker data
        const speakerData = {
          firstName: speaker.firstName || "",
          lastName: speaker.lastName || "",
          image: null,
        };

        // Check if speaker image exists
        if (files.speakerImages && files.speakerImages[i]) {
          speakerData.image = await uploadToSpaces(
            files.speakerImages[i],
            "/Speakers"
          );
        }

        processedSpeakers.push(speakerData);
      }
    }

    // Create conference
    const conference = await Conference.create({
      name,
      description,
      location,
      startDate,
      endDate,
      mainImage,
      speakers: processedSpeakers,
    });

    // Check if conference was successfully created
    if (!conference) {
      return res.status(500).json({
        message: "Failed to create conference",
      });
    }

    // Successful response
    res.status(201).json({
      message: "Conference created successfully",
      conference,
    });
  } catch (error) {
    // Detailed error handling
    console.error("Conference creation error:", error);
    res.status(error.status || 500).json({
      error: error.message || "An unexpected error occurred",
      details: error.toString(),
    });
  }
};

export const GetConferences = async (req, res) => {
  try {
    const conferences = await Conference.find();
    res.status(200).json({ conferences });
  } catch (error) {
    res.status(error.status || 500).json({ err: error.message });
  }
};

export const GetConference = async (req, res) => {
  try {
    const { id } = req.params;
    const conference = await Conference.findById(id);
    if (!conference) {
      res.status(404).json({ err: "Conference Not Found" });
    }
    res.status(200).json({ conference });
  } catch (error) {
    res.status(error.status || 500).json({ err: error.message });
  }
};

export const UpdateConference = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;
    const conference = await Conference.findById(id);
    if (!conference) {
      res.status(404).json({ err: "Conference Not Found" });
    }
    conference.date = date;
    await conference.save();
    res.status(200).json({ message: "Conference Date Update Successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ err: error.message });
  }
};

export const CancelConference = async (req, res) => {
  try {
    const { id } = req.params;
    const conference = await Conference.findById(id);
    if (!conference) {
      res.status(404).json({ err: "Conference Not Found" });
    }
    await conference.deleteOne();
    res.status(200).json({ message: "Conference Canceled Successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ err: error.message });
  }
};
