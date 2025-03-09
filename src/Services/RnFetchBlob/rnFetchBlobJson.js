import RNFetchBlob from "rn-fetch-blob";
import { CAHCE_DIRECTORY_PATH } from "../Constants";


export const fetchFromJson = async (fileName) => {
    try {

      const directoryPath = CAHCE_DIRECTORY_PATH;
      const cachePath = `${directoryPath}/${fileName}`;
      const fileExists = await RNFetchBlob.fs.exists(cachePath);
      if (fileExists) {
        // console.log('JSON foiund i ncache');
        const data = await RNFetchBlob.fs.readFile('file://' + `${directoryPath}/${fileName}`, 'utf-8');
        const newData = JSON.parse(data);
        return newData;
      } else {
        const res = await RNFetchBlob.config({
          fileCache: true,
          path: `${directoryPath}/${fileName}`, // Set the cache directory and file name
        }).fetch('GET', fileName);
    
        //  console.log('JSON file saved to', res.path());
        const jsonText = await res.readFile('utf8'); // Read the JSON file as text
        const jsonData = JSON.parse(jsonText); // Parse the JSON text
        return jsonData;
      }
    } catch (error) {
      // console.log('File not found or error reading file:', error);
      throw error; // Re-throw the error so it can be caught by the caller
    }
  };


