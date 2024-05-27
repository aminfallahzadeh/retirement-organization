// react imports
import { useEffect, useState } from "react";

// components
import ArchiveTree from "../../components/ArchiveTree";

// redux imports
import { useSelector } from "react-redux";

// mui imports
import { Button } from "@mui/material";
import { RemoveRedEyeOutlined as ViewIcon } from "@mui/icons-material";

// library imports
import { RViewer, RViewerTrigger } from "react-viewerjs";

function ElectronicCaseSection() {
  const [previewImage, setPreviewImage] = useState(null);
  const { selectedImageData } = useSelector((state) => state.archiveData);

  const options = {
    toolbar: {
      prev: false,
      next: false,
    },

    title: (imageData) =>
      `(${imageData.naturalWidth} × ${imageData.naturalHeight})`,
  };

  useEffect(() => {
    if (selectedImageData?.attachment) {
      // Convert base64 string to ArrayBuffer
      const base64String = selectedImageData.attachment;
      const binaryString = window.atob(base64String);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Detect the image type based on its signature
      const signature = bytes[0] * 256 + bytes[1];
      let mimeType;
      switch (signature) {
        case 0xffd8: // JPEG
          mimeType = "image/jpeg";
          break;
        case 0x8950: // PNG
          mimeType = "image/png";
          break;
        case 0x4749: // GIF
          mimeType = "image/gif";
          break;
        case 0x424d: // BMP
          mimeType = "image/bmp";
          break;
        default:
          console.error("Unsupported image type.");
          return;
      }

      // Set the appropriate MIME type and prefix
      const prefix = `data:${mimeType};base64,`;

      // Set the base64 image data as the source of the image element
      setPreviewImage(`${prefix}${selectedImageData.attachment}`);
    }
  }, [selectedImageData]);

  const content = (
    <section className="flex-col">
      <div className="flex-row">
        <ArchiveTree />
        {previewImage && (
          <>
            <img
              src={previewImage}
              alt="پیش نمایش"
              style={{ width: "400px" }}
            />
            <div className="flex-center">
              <RViewer options={options} imageUrls={previewImage}>
                <RViewerTrigger>
                  <Button
                    dir="ltr"
                    endIcon={<ViewIcon />}
                    variant="contained"
                    color="primary"
                    sx={{ fontFamily: "sahel" }}
                  >
                    <span>مشاهده</span>
                  </Button>
                </RViewerTrigger>
              </RViewer>
            </div>
          </>
        )}
      </div>
    </section>
  );

  return content;
}

export default ElectronicCaseSection;
