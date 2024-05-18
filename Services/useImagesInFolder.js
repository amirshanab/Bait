import { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const useImagesInFolder = (folderPath) => {
    const [imageURLs, setImageURLs] = useState([]);
    const storage = getStorage();

    useEffect(() => {
        const folderRef = ref(storage, folderPath);

        listAll(folderRef)
            .then((res) => {
                const downloadPromises = res.items.map((itemRef) => {
                    return getDownloadURL(itemRef);
                });
                return Promise.all(downloadPromises);
            })
            .then((urls) => {
                setImageURLs(urls);
            })
            .catch((error) => {
                console.error('Error listing files in folder:', error);
            });
    }, [folderPath]);

    return imageURLs;
};

export default useImagesInFolder;
