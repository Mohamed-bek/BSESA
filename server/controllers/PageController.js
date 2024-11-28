import { fstat } from "fs";
import Page from "../models/Page.js";
import uploadToSpaces, {
  deleteFromSpaces,
  GetVideoUrl,
} from "../utitlitis/awsDigitalOcean.js";
import fs from "fs";

export const createOrUpdateHero = async (req, res) => {
  try {
    const { asset_type, name, h1, p, link, fileName, contentType } = req.body;
    console.log(asset_type, name, h1, p, link, fileName, contentType);
    const page = await Page.findOne({ name });
    if (page) {
      h1 && (page.h1 = h1);
      p && (page.p = p);
      link && (page.link = link);
      if (fileName && contentType && asset_type) {
        const oldPath = page.asset?.url;
        if (oldPath) await deleteFromSpaces(oldPath);
        const url = await GetVideoUrl(fileName, contentType, false, "/pages");
        page.asset = {
          asset_type,
          url,
        };
      }
      await page.save();
      return res.status(200).json({ message: "Updated Success", url });
    }
    if (!fileName || !contentType || !asset_type || !link || !name || !p || !h1)
      return res.status(404).json({ error: "You Have To Upload All the Data" });
    const url = await GetVideoUrl(fileName, contentType, false, "/pages");
    const newPage = await Page.create({
      name,
      link,
      p,
      h1,
      asset: { asset_type, url },
    });
    res.status(200).json({ message: "Create Hero Section Success", url });
  } catch (error) {
    res.status(500).json({ error: error });
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
