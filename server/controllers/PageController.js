import Page from "../models/Page.js";
import uploadToSpaces, {
  deleteFromSpaces,
} from "../utitlitis/awsDigitalOcean.js";

export const createOrUpdateHero = async (req, res) => {
  try {
    const { asset_type, name, h1, p, link } = req.body;
    const page = await Page.findOne({ name });
    const file = req.file;
    if (page) {
      h1 && (page.h1 = h1);
      p && (page.p = p);
      link && (page.link = link);
      if (file && asset_type) {
        const oldPath = page.asset?.url;
        if (oldPath) await deleteFromSpaces(oldPath);
        const url = await uploadToSpaces(file, "/heroSection", true);
        page.asset = {
          asset_type,
          url,
        };
      }
      await page.save();
      return res.status(200).json({ message: "Updated Success", page });
    }
    if (!file || !asset_type || !link || !name || !p || !h1)
      return res.status(404).json({ error: "You Have To Upload All the Data" });
    const url = await uploadToSpaces(file, "/heroSection", true);
    const newPage = await Page.create({
      name,
      link,
      p,
      h1,
      asset: { asset_type, url },
    });
    res
      .status(200)
      .json({ message: "Create Hero Section Success", page: newPage });
  } catch (error) {
    res.status(500).json({ error: error.name });
  }
};

export const getPage = async (req, res) => {
  try {
    const { name } = req.query;
    const page = await Page.findOne({ name });
    res.status(200).json({ page });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
