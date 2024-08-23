import { useContext, useEffect } from "react";
import ClientCreatorContext from "../context/clientCreatorContext";
import { Icon } from "@iconify/react";

const DropzoneBox = ({ children }) => {
  const { setUploadImage, imageUpload, setFieldValue, values } =
    useContext(ClientCreatorContext);
  return (
    <div className="flex  justify-center">
      <div className="w-full max-w-xs p-9 bg-white rounded-md shadow flex border border-black/50 shadow-black/20 flex-col items-center">
        <h1 className="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">
          Foto de usuario
        </h1>
        <div
          className="bg-gray-50 p-8 text-center rounded-md border-dashed border-2 border-gray-200 hover:border-blue-500  duration-100 ease-in transform hover:scale-[1.02] hover:shadow-md hover:shadow-blue-100"
          id="dropzone"
        >
          <label
            htmlFor="image"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <Icon
              icon="ph:plus-square-light"
              className="text-[2.5rem] text-gray-500"
            />
            <div className="flex flex-col">
              <span className="text-gray-700 font-bold">Arrastra tu foto</span>
              <span className="  font-bold text-blue-500">O</span>
              <span className="  font-bold text-blue-500">
                busca tu archivo.
              </span>
            </div>
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
        <div
          className="mt-6 flex  flex-wrap w-fit justify-center"
          id="fileList"
        >
          <span className="flex flex-wrap text-xs ">
            <span className="text-gray-800 font-bold flex w-fit">
              {values["image"] && imageUpload?.foto}
            </span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};
const Cedula = ({ children }) => {
  const { setUploadImage, imageUpload, setFieldValue, values } =
    useContext(ClientCreatorContext);
  return (
    <div className=" flex  justify-center  ">
      <div className="w-full max-w-xs p-9 bg-white rounded-md shadow  border-black/50 border shadow-black/20">
        <h1 className="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">
          Fotos de la cedula
        </h1>
        <div
          className="bg-gray-50 p-8 text-center rounded-md border-dashed border-2 border-black/50 shadow-black/20 hover:border-blue-500  duration-100 ease-in transform hover:scale-[1.02] hover:shadow-md hover:shadow-blue-100"
          id="dropzone"
        >
          <label
            htmlFor="dni_images"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <Icon
              icon="ph:plus-square-light"
              className="text-[2.5rem] text-gray-500"
            />
            <div className="flex flex-col">
              <span className="text-gray-700 font-bold">
                Arrastra la cedula
              </span>
              <span className="  font-bold text-blue-500">O</span>
              <span className="  font-bold text-blue-500">
                busca tus archivo.
              </span>
            </div>
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
        <div
          className="mt-6 flex  flex-wrap w-fit justify-center"
          id="fileList"
        >
          {values["dni_images"].length > 0 &&
            imageUpload?.dni_images.map((imageName, index) => (
              <span className="flex flex-wrap text-xs " key={index}>
                <span className="text-gray-800 font-bold flex w-fit">
                  {imageName}{" "}
                  {index + 1 !== values["dni_images"].length && (
                    <span className="text-blue-500">|</span>
                  )}
                </span>
              </span>
            ))}
        </div>
        {children}
      </div>
    </div>
  );
};

DropzoneBox.Cedula = Cedula;
export default DropzoneBox;
