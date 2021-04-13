import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  input: {
    borderRadius: '5px',
    padding: '5px'
  },
  chatId: {
    backgroundColor: "#dddddd",
    color: "#000000",
    fontSize: '1.1em',
    padding: "5px",
    border: "5px solid #7200de",
    borderRadius: '5px'
  },
  videoCallDiv: {
    padding: '0px',
    margin: '0px'
  },
  callActionNavbar: {
    backgroundColor: 'rgba(44, 44, 44, 0.7)',
    justifyContent: 'center'
  },
  video: {
    maxHeight: '50vh',
    maxWidth: '90vw',
    width: 'auto',
    overflow: 'hidden',
    margin: '0px',
    padding: '0px',
    WebkitTransform: 'scaleX(-1)',
    transform: 'scaleX(-1)'
  }
}));