import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './PhotoUpload.module.css';

const PhotoUpload = ({ photos, onChange, error }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const newPhotos = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    onChange([...photos, ...newPhotos]);
  }, [photos, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  });

  const removePhoto = (index) => {
    const newPhotos = [...photos];
    if (newPhotos[index].preview) {
      URL.revokeObjectURL(newPhotos[index].preview);
    }
    newPhotos.splice(index, 1);
    onChange(newPhotos);
  };

  return (
    <div className={styles.container}>
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop photos here, or click to select files</p>
        )}
      </div>
      
      {error && <p className={styles.error}>{error}</p>}
      
      {photos.length > 0 && (
        <div className={styles.preview}>
          {photos.map((photo, index) => (
            <div key={index} className={styles.imageContainer}>
              <img
                src={photo.preview || photo}
                alt={`Preview ${index + 1}`}
                className={styles.image}
              />
              <button
                onClick={() => removePhoto(index)}
                className={styles.removeButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
