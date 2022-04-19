import React, { Component } from "React";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongsList from "../queries/fetchSongs";

/* Class Component */

// class SongList extends Component {
//   onSongDelete(id) {
//     this.props.mutate({ variables: { id } }).then(() => this.props.refetch());
//   }

//   renderSongs() {
//     return this.props.data.songs.map(({ id, title }) => {
//       return (
//         <li key={id} className="collection-item">
//            <Link to={`/songs/${id}`}>{title}</Link>
//
//         </li>
//       );
//     });
//   }
//   render() {
//     if (this.props.data.loading) {
//       return <div>Loading...</div>;
//     }
//     return (
//       <div>
//         <ul className="collection">{this.renderSongs(id)}</ul>;
//         <Link to="/songs/new" className="btn-floating btn-large red right">
//           <i className="material-icons">add</i>
//         </Link>
//       </div>
//     );
//   }
// }

/* Functional Component */

const SongList = (props) => {
  const onSongDelete = (id) => {
    props.mutate({ variables: { id } }).then(() => {
      props.data.refetch();
    });
  };

  if (props.data.loading) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <ul className="collection">
        {props.data.songs.map((song) => {
          return (
            <li key={song.id} className="collection-item">
              <Link to={`/songs/${song.id}`}>{song.title}</Link>

              <i
                className="material-icons"
                onClick={() => onSongDelete(song.id)}
              >
                delete
              </i>
            </li>
          );
        })}
      </ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

const mutation = gql`
  mutation deleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongsList)(SongList));
