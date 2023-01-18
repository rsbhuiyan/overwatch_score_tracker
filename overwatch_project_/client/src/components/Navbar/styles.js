
//add styles for our app bar and headings
//gotten from github

import { makeStyles } from "@material-ui/core";
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.65)',
  },
  heading: {
    color: 'rgba(255,165,0, 1)',
    italic: {fontStyle: 'arial'},

  },
  image: {
    marginLeft: '15px',
  },
        
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    backgroundColor: deepPurple[500],
  },
}));