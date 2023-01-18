//add styles for our app bar and headings
//gotten from github

import { makeStyles } from "@material-ui/core";

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
}));