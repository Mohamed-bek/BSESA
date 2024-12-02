import Research from "../models/Research.js";
import uploadToSpaces, {
  deleteFromSpaces,
} from "../utitlitis/awsDigitalOcean.js";

// Create a new research article
export const createResearch = async (req, res) => {
  try {
    const {
      title,
      abstract,
      content,
      tags,
      references,
      category,
      relatedResearches,
    } = req.body;

    const thumbnailFile =
      req.files && req.files["thumbnail"] ? req.files["thumbnail"][0] : null;

    if (!thumbnailFile) {
      return res.status(404).json({ error: "Research Must have a Thumbnail" });
    }
    let TagsList = tags;
    if (typeof tags === "string") {
      TagsList = JSON.parse(tags);
    }
    const thumbnail = await uploadToSpaces(thumbnailFile, "/ResearchThumbnail");
    const newResearch = new Research({
      title,
      abstract,
      content,
      tags: TagsList,
      references,
      category,
      relatedResearches,
      thumbnail,
    });

    const pdfFile = req.files && req.files["pdf"] ? req.files["pdf"][0] : null;

    if (pdfFile) {
      newResearch.file = await uploadToSpaces(pdfFile, "/ResearchPdf");
    }
    await newResearch.save();
    res.status(201).json({
      message: "Research created successfully",
      research: newResearch,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating research", error });
  }
};

// Get all research articles with optional filters
export const getResearches = async (req, res) => {
  try {
    const { category, title, limit = 20, page = 1 } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (title) {
      filter.$or = [
        { title: { $regex: title, $options: "i" } },
        { tags: { $regex: title, $options: "i" } },
      ];
    }

    const skip = limit * (page - 1);

    const researches = await Research.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .populate({ path: "category", select: "name" })
      .populate({ path: "relatedResearches", select: "thumbnail title" });
    const NbOfResearches = await Research.countDocuments(filter);

    res
      .status(200)
      .json({ researches, NbOfPages: Math.ceil(NbOfResearches / limit) });
  } catch (error) {
    console.error("Error fetching researches:", error);
    res.status(500).json({ message: "Error fetching researches", error });
  }
};

export const getResearchById = async (req, res) => {
  try {
    const { id } = req.params;
    const research = await Research.findById(id)
      .populate("category")
      .populate({ path: "relatedResearches", select: "thumbnail title" });

    if (!research) {
      return res.status(404).json({ message: "Research not found" });
    }

    research.views += 1;
    await research.save();

    res.status(200).json(research);
  } catch (error) {
    res.status(500).json({ message: "Error fetching research", error });
  }
};

// Update a research article
export const updateResearch = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, abstract, content, tags, category, relatedResearches } =
      req.body;

    const research = await Research.findById(id);
    if (!research) return res.status(404).json({ error: "Research not found" });
    if (title) research.title = title;
    if (category) research.category = category;
    if (content) research.content = content;
    if (abstract) research.abstract = abstract;
    if (tags) {
      let TagsList = tags;
      if (typeof tags === "string") {
        TagsList = JSON.parse(tags);
      }
      research.tags = TagsList;
    }

    const pdfFile = req.files && req.files["pdf"] ? req.files["pdf"][0] : null;

    if (pdfFile) {
      const OldPath = research.file;
      research.file = await uploadToSpaces(pdfFile, "/ResearchPdf");
      await deleteFromSpaces(OldPath);
    }

    const thumbnailFile =
      req.files && req.files["thumbnail"] ? req.files["thumbnail"][0] : null;

    if (thumbnailFile) {
      const OldPath = research.thumbnail;
      research.thumbnail = await uploadToSpaces(
        thumbnailFile,
        "/ResearchThumbnail"
      );
      await deleteFromSpaces(OldPath);
    }

    await research.save();
    res.status(200).json({ message: "Research updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating research", error });
  }
};

// Delete a research article
export const deleteResearch = async (req, res) => {
  try {
    const { id } = req.params;
    const research = await Research.findByIdAndDelete(id);

    if (!research) {
      return res.status(404).json({ message: "Research not found" });
    }

    // Optionally remove associated files
    // if (research.file) fs.unlinkSync(research.file);
    // if (research.thumbnail) fs.unlinkSync(research.thumbnail);

    res.status(200).json({ message: "Research deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting research", error });
  }
};
