import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, Paper} from 'material-ui';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Album from '../album/album';
import { CSSGrid, measureItems, makeResponsive, layout} from 'react-stonecutter';


const myThemes = getMuiTheme ({
  fontFamily: 'Titillium Web',
});
// TODO: compoent did mount defines artistId

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.user = {};
    this.albums = [];
    this.user_since = "";
    let artistId;
    artistId = 1;
  };

  componentDidMount() {
    console.log(this.props.viewedUsers);
  };

  handlealbums() {
    if (this.albums.length > 0) {
      return(
        this.albums.map((album, idx) => (
          <li key={idx}>
            <Album
            id={album.id}
            userId={1}
            title={album.title}
            coverUrl={album.cover_url}
            createdAt={album.created_at}
            userId={album.user_id}/></li>
        ))
      );
    } else {
      return(
        <h1>Loading</h1>
      );
    }
  };

  render() {
    if (this.props.viewedUsers !== undefined) {
      this.user = this.props.viewedUsers;
      this.albums = this.props.albums;
      this.user_since = this.props.viewedUsers.updated_at.split("-");
    }
    const Grid = makeResponsive(measureItems(CSSGrid), {
      maxWidth: 1920,
      minPadding: 100,
      measureImages: true
    });

    return (
      <div className="user-page" >
        <div className="user-discography">
          <Grid
            component="ul"
            columns={4}
            columnWidth={400}
            itemHeight={400}
            gutterWidth={5}
            gutterHeight={5}
            duration={800}
            easing="ease-out">
            {this.handlealbums()}
          </Grid>
        </div>
          <div className="user-sidebar">
            <MuiThemeProvider muiTheme={myThemes}>
              <Card initiallyExpanded={true}>
                <CardMedia className="user-profile-picture"><img src={this.user.profile_pic_url}/></CardMedia>
                <CardTitle title={this.user.username} subtitle={`Since: ${this.user_since[0]}`}/>
                <CardText>{this.user.description}</CardText>
              </Card>
            </MuiThemeProvider>
          </div>
      </div>
    )
  }
};

export default UserDetail;
