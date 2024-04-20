// react imports
import { useEffect, useState } from "react";

// components
import ArchiveTree from "../../components/ArchiveTree";

// redux imports
import { useSelector } from "react-redux";

// library imports
import imageType from "image-type";

function ElectronicCaseSection() {
  const [previewImage, setPreviewImage] = useState(null);
  const { selectedImageData } = useSelector((state) => state.archiveData);

  useEffect(() => {
    if (selectedImageData?.attachment) {
      // Convert base64 string to Uint8Array
      const base64String = selectedImageData.attachment;
      const bytes = new Uint8Array(
        base64String.match(/[\s\S]/g).map((ch) => ch.charCodeAt(0))
      );

      // Detect the image type
      const detectedType = imageType(bytes);

      if (detectedType) {
        // If the image type is detected, set the appropriate MIME type and prefix
        const mimeType = `image/${detectedType.ext}`;
        const prefix = `data:${mimeType};base64,`;

        // Set the base64 image data as the source of the image element
        setPreviewImage(`${prefix}${selectedImageData.attachment}`);
      } else {
        console.error("Unable to detect image type.");
      }
    }
  }, [selectedImageData]);

  const content = (
    <section className="flex-col">
      <div className="flex-row">
        <ArchiveTree />
        {previewImage && (
          <img src={previewImage} alt="پیش نمایش" style={{ width: "400px" }} />
        )}
      </div>
    </section>
  );

  return content;
}

export default ElectronicCaseSection;
