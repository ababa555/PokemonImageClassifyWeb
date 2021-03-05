import React from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dropzone: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    fontSize: 16
  },
});

const FileDropZone = (props) => {
  const classes = useStyles();

  const handleDrop = files => {
    const target = files[0]
    if (target) {
      const url = window.URL || window.webkitURL;
      var image = new Image();
      // ファイルがimageの場合
      image.onload = () => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target !== null && e.target?.result !== null) {
            props.onChange(e.target?.result, target)
          }
        };
        reader.readAsDataURL(target)
      };
      // ファイルがimageでない場合
      image.onerror = (e) => {
        props.onChange(null)
      };
      image.src = url.createObjectURL(target);
    }
  }

  const {getRootProps, getInputProps} = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    disabled: props.disabled
  })

  return (
    <section className="container">
      <div {...getRootProps({className: classes.dropzone})}>
        <input {...getInputProps()} />
        <p>画像を選択、または、ここに画像をドロップしてください</p>
      </div>
    </section>
  );
}

export default FileDropZone;