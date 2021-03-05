import React from 'react'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import 'react-image-crop/lib/ReactCrop.scss';
import IconButton from '@material-ui/core/IconButton';
import { Undo as UndoIcon } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import FileDropZone from '../components/FileDropZone';
import ImageCrop from '../components/ImageCrop';
import { predictAsync } from '../repository/repository'
import FileHelper from '../helpers/FileHelper'
import PokemonHelper from '../helpers/PokemonHelper'

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

type PredictResult = {
  name: string;
  percentage: number;
}

const Main: React.FC = (props) => {
  const [file, setFile] = React.useState<string | null>(null);
  const [fileObject, setFileObject] = React.useState<File>();
  const [originalFile, setOriginalFile] = React.useState<string | null>(null);
  const [hiddenUndoIcon, setHiddenUndoIcon] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearched, setIsSearched] = React.useState(false);
  const [data, setData] = React.useState<PredictResult[]>([]);

  const useStyles = makeStyles(theme => ({
    submit: {
      width: "50%",
      margin: theme.spacing(3, 0, 2),
    },
    buttonStyle: {
      textAlign: "center"
    },
    imageStyle: {
      marginTop: "8px",
      textAlign: "center"
    },
    description: {
      marginBottom: "16px",
      textAlign: "center"
    }
  }));

  const classes = useStyles();
  return (
    <React.Fragment>
      {isLoading ? (<div><CircularProgress /></div>) : 
      (
      <React.Fragment>
        <FileDropZone 
          onChange={(file: string, fileObject: any) => {
            setFile(file)
            setFileObject(fileObject)
            setOriginalFile(file)
            setHiddenUndoIcon(true)
          }}
          disabled={isLoading ? true : false}
        />
        <div className={classes.buttonStyle}>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isLoading ? true : false}
              onClick={() => {
                if (fileObject === undefined) return
                if (file === undefined || file === null) return

                setIsLoading(true)
                const decodeFile = FileHelper.createFileFromBase64(file, fileObject.name, fileObject.type)
                predictAsync(decodeFile)
                .then(response => {
                  const data: PredictResult[] = [ 
                    { name: PokemonHelper.GetNameByNo(response.data.predicted), 
                      percentage: response.data.percentage 
                    }
                  ];
                  setData(data)
                  setIsSearched(true)
                  setIsLoading(false)
                })
                .catch(error => {
                  console.dir(error)
                })
                .finally(() => {
                  setIsLoading(false)
                });
              }}
            >
              実行
            </Button>
        </div>
        <Divider />
        <div className={classes.imageStyle}>
        <Box visibility={hiddenUndoIcon ? "hidden" : ""}>
          <IconButton onClick={() => {
              setFile(originalFile)
              setHiddenUndoIcon(true)
            }}
          >
            <UndoIcon />
          </IconButton>
        </Box>
        <Box visibility={file === null ? "hidden" : ""} className={classes.description}>画像をドラッグするとトリミングできます</Box>
        <ImageCrop 
          file={file}
          type={fileObject === undefined ? 'image/jpeg' : fileObject.type}
          onComplete={blob => {
            let reader = new FileReader();
            reader.readAsDataURL(blob);

            reader.onload = () => {
              const base64 = reader.result
              if (typeof base64 === "string") {
                setFile(base64)
                setHiddenUndoIcon(false)
              }
            };
          }}
          disabled={isLoading ? true: false}
        />
        </div>
        {isSearched && (
          <React.Fragment>
            <Divider />
            <Container maxWidth="sm" style={{ marginTop: "8px" }}>
              <Typography component="h2" variant="h5">
                判定結果
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>名前</TableCell>
                    <TableCell align="right">一致率</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">{row.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Container>
          </React.Fragment>
        )}
      </React.Fragment>
    )}
    </React.Fragment>
  )
}

export default Main;