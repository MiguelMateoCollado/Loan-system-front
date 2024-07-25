import { useContext, useEffect } from "react";
import ClientCreatorContext from "../context/clientCreatorContext";
import { Icon } from "@iconify/react";

const DropzoneBox = () => {
  const { setUploadImage, imageUpload, setFieldValue, values } =
    useContext(ClientCreatorContext);
  return (
    <div className="bg-gray-100 col-span-1 flex items-center justify-center p-3">
      <div className="w-full max-w-md p-9 bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">
          Foto de usuario
        </h1>
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
              (o clickea para seleccionar)
            </span>
            <input
              id="image"
              name="image"
              type="file"
              value={values.images?.[0]}
              className="hidden"
              onChange={(event) => {
                setUploadImage({
                  ...imageUpload,
                  foto: event.target.files[0]?.name,
                });
                setFieldValue("image", event.target.files);
              }}
            />
          </label>
        </div>
        <div className="mt-6 text-center" id="fileList">
          {values["image"] && imageUpload?.foto}
        </div>
      </div>
    </div>
  );
};

const Cedula = ({}) => {
  const { setUploadImage, imageUpload, setFieldValue, values } =
    useContext(ClientCreatorContext);


  return (
    <div className="bg-gray-100 col-span-1 flex items-center justify-center p-3">
      <div className="w-full max-w-md p-9 bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">
          Fotos de la cedula
        </h1>
        <div
          className="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
          id="dropzone"
        >
          <label
            htmlFor="dni_images"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <Icon
              icon="ph:plus-square-light"
              className="text-[3rem] text-gray-500"
            />
            <span className="text-gray-600">Arrastra la cedula</span>
            <span className="text-gray-500 text-sm">
              (o clickea para seleccionar)
            </span>
            <input
              type="file"
              id="dni_images"
              name="dni_images"
              className="hidden"
              multiple
              onChange={(event) => {
                let images = [];
                for (const value of event.target.files) {
                  images = [...images, value.name];
                }
                setUploadImage({
                  ...imageUpload,
                  dni_images: images,
                });
                setFieldValue("dni_images", event.target.files);
              }}
            ></input>
          </label>
        </div>
        <div className="mt-6 text-center" id="fileList">
          {values["dni_images"].length > 0 &&
            imageUpload?.dni_images.map((imageName, index) => (
              <p key={index}>
                {imageName} <span className="text-red-500 font-bold">|</span>
              </p>
            ))}
        
        </div>
      </div>
    </div>
  );
};

DropzoneBox.Cedula = Cedula;
export default DropzoneBox;
