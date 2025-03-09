import RNFetchBlob from 'rn-fetch-blob';

export const fetchImageFromCache = async (imageUrl) => {
  console.log("imagekkkkkkkkkkkk", imageUrl)
    const directoryPath = `${RNFetchBlob.fs.dirs.CacheDir}`;

    const cachePath = `${directoryPath}/${imageUrl}`;

    const fileExists = await RNFetchBlob.fs.exists(cachePath);

    if (fileExists) {
        console.log("available", `file://${cachePath}`)
      return `file://${cachePath}`;
    }

  try {
    const response = await RNFetchBlob.config({
      fileCache: true,
      path: `${directoryPath}/${imageUrl}`,
    }).fetch('GET', imageUrl);

    const cachePath = response.path();

    return `file://${cachePath}`;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};
