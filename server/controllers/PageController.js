import Page from "../models/Page.js";
import { deleteFromSpaces, GetVideoUrl } from "../utitlitis/awsDigitalOcean.js";

export const createOrUpdateHero = async (req, res) => {
  try {
    const { asset_type, name, h1, p, link, fileName, contentType, pageNb } =
      req.body;
    const page = await Page.findOne({ name, pageNb });
    if (page) {
      h1 && (page.h1 = h1);
      p && (page.p = p);
      link && (page.link = link);
      if (fileName && contentType && asset_type) {
        const oldPath = page?.asset?.url;
        if (oldPath) await deleteFromSpaces(oldPath);
        const Key = `${Date.now()}-${fileName}`;
        const url = await GetVideoUrl(Key, contentType);
        page.asset = {
          asset_type,
          url: `${
            process.env.DO_PRESIGNED_URL ||
            "https://bsesa.lon1.cdn.digitaloceanspaces.com/"
          }${Key}`,
        };
        await page.save();
        return res.status(200).json({ message: "Updated Success", url });
      }
      await page.save();
      return res.status(200).json({ message: "Updated Success", url: null });
    }
    if (!fileName || !contentType || !asset_type || !link || !name || !p || !h1)
      return res.status(404).json({ error: "You Have To Upload All the Data" });
    const Key = `${Date.now()}-${fileName}`;
    const url = await GetVideoUrl(Key, contentType);
    await Page.create({
      name,
      link,
      p,
      h1,
      asset: {
        asset_type,
        url: `${process.env.DO_PRESIGNED_URL}${Key}`,
      },
      pageNb,
    });
    res.status(200).json({ message: "Create Hero Section Success", url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPage = async (req, res) => {
  try {
    const { name } = req.query;
    const pages = await Page.find({ name }).limit(3);
    res.status(200).json({ pages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
