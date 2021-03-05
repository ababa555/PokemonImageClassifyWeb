import React from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

type ContentProps = {
  file: string | null;
  type: string;
  onComplete: (croppedImageUrl: any) => void;
  disabled: boolean;
}

const ImageCrop: React.FC<ContentProps> = (props) => {
  const [crop, setCrop] = React.useState<ReactCrop.Crop>();
  const [imageRef, setImageRef] = React.useState<any>(null);

  const makeClientCrop = async (crop: ReactCrop.Crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        'temp.jpeg'
      );
      return croppedImageUrl
    }
  }
  
  const getCroppedImg = (image: any, crop: any, fileName: any) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          return;
        }
        const fileUrl = window.URL.createObjectURL(blob);
        resolve(fileUrl);
      }, props.type);
    });
  }

  return (
    <ReactCrop
      src={props.file ?? ""}
      crop={crop}
      onImageLoaded={image => {
        setImageRef(image)
      }}
      onChange={crop => setCrop(crop)}
      onComplete={crop => {
        makeClientCrop(crop).then(async (croppedImageUrl) => {
          if (croppedImageUrl) {
            setCrop(undefined)
            
            let blob = await fetch(String(croppedImageUrl)).then(r => r.blob());
            props.onComplete(blob)
          }
        });
      }}
      disabled={props.disabled}
    />
  )
}

export default ImageCrop;