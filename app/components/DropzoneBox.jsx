import { useContext } from "react";
import ClientCreatorContext from "../context/clientCreatorContext";

import { Icon } from "@iconify/react";

const DropzoneBox = ({}) => {
  const { setUploadImage, imageUpload, setFieldValue } =
    useContext(ClientCreatorContext);
  return (
    <div className="bg-gray-100 col-span-1 flex items-center justify-center p-3">
      <div className="w-full max-w-md p-9 bg-white rounded-lg shadow-lg">
        <div
          className="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
          id="dropzone"
        >
          <label
            htmlFor="image"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <Icon
              icon="ph:plus-square-light"
              className="text-[3rem] text-gray-500"
            />
            <span className="text-gray-600">Arrastra tu foto</span>
            <span className="text-gray-500 text-sm">
              Haz click para subirla
            </span>
            <input
              id="image"
              name="image"
              type="file"
              className="hidden"
              onChange={(event) => {
                setUploadImage(event.target.files[0].name);
                setFieldValue("image", event.target.files);
              }}
            />
          </label>
        </div>
        <div className="mt-6 text-center" id="fileList">
          {imageUpload}
        </div>
      </div>
    </div>
  );
};

const Cedula = ({}) => {
  return (
    <div className="bg-gray-100 col-span-1 flex items-center justify-center p-3">
      <div className="w-full max-w-md p-9 bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">
          File Drop and Upload
        </h1>
        <div
          className="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
          id="dropzone"
        >
          <label
            htmlFor="fileInput"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <Icon
              icon="ph:plus-square-light"
              className="text-[3rem] text-gray-500"
            />
            <span className="text-gray-600">Drag and drop your files here</span>
            <span className="text-gray-500 text-sm">(or click to select)</span>
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="hidden"
            multiple
          ></input>
        </div>
        <div className="mt-6 text-center" id="fileList"></div>
      </div>
    </div>
  );
};

DropzoneBox.Cedula = Cedula;
export default DropzoneBox;
