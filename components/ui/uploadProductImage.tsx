"use state";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface ProductImage {
  imageURLs: string[];
  setImageURLs: React.Dispatch<React.SetStateAction<string[]>>;
}
const UploadProductImage: React.FC<ProductImage> = ({
  imageURLs,
  setImageURLs,
}) => {
  const handleUpload = async (results: any) => {
    setImageURLs((prevURLs) => [...prevURLs, results.info.secure_url]);
  };
  return (
    <div>
      <CldUploadWidget
        uploadPreset="image-product-store"
        onSuccess={(result) => {
          handleUpload(result);
        }}
      >
        {({ open }) => (
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <button
              type="button"
              color="blue"
              onClick={() => open()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
            >
              Upload Gambar
            </button>
          </div>
        )}
      </CldUploadWidget>

      {imageURLs.length > 0 && (
        <div className="mt-4">
          <h3>Uploaded Images:</h3>
          <div className="flex gap-4 flex-wrap">
            {imageURLs.map((url, index) =>
              url ? (
                <Image
                  key={index}
                  src={url}
                  alt={`Product Image ${index}`}
                  className="w-32 h-32 object-cover"
                  width={50}
                  height={50}
                />
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadProductImage;
