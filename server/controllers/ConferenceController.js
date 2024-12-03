import Conference from "../models/Conference.js";
import uploadToSpaces from "../utitlitis/awsDigitalOcean.js";

export const CreateConference = async (req, res) => {
  try {
    const { name, description, location, startDate, endDate, speakers } =
      req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: "Conference name is required" });
    }

    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }

    if (!startDate) {
      return res.status(400).json({ error: "Start date is required" });
    }

    // Validate main image
    if (!req.file) {
      return res.status(400).json({ error: "Conference image is required" });
    }

    // Upload main image
    const mainImage = await uploadToSpaces(req.file, "/Conference");

    // Prepare speakers data
    const processedSpeakers = speakers
      ? speakers.map((speaker) => ({
          firstName: speaker.firstName || "",
          lastName: speaker.lastName || "",
          image: speaker.image
            ? uploadToSpaces(speaker.image, "/Speakers")
            : null,
        }))
      : [];

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
    // Error handling
    console.error("Conference creation error:", error);
    res.status(error.status || 500).json({
      error: error.message || "An unexpected error occurred",
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
