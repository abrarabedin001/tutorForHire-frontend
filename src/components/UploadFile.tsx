import { type FunctionComponent } from 'react';
import { type FormikErrors } from 'formik';

interface IUploadFile {
  data: { image?: File };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<FormikErrors<{ image?: File }>> | Promise<void>;
  errors: FormikErrors<{ image?: File }>;
}

const UploadFile: FunctionComponent<IUploadFile> = ({
  data,
  setFieldValue,
  errors,
}) => {
  return (
    <div>
      <input
        type="file"
        name="image"
        // set supported file types here,
        // could also check again within formik validation or backend
        accept="image/png, .svg"
        onChange={(e) => {
          // Object is possibly null error w/o check
          if (e.currentTarget.files) {
            setFieldValue('image', e.currentTarget.files[0]);
          }
        }}
      />
      {errors.image && (
        <>
          <br />
          <span id="error " className="mt-6 bg-red-500 p-1 text-white">
            {errors.image}
          </span>
          <br />
        </>
      )}
    </div>
  );
};

export default UploadFile;
