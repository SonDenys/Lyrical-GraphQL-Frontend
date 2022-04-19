import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

/* Class Component */

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id: id },
      optimisticResponse: {
        __typename: "Mutation",
      },
      likeLyric: {
        id: id,
        __typename: "LyricType",
        likes: likes + 1,
      },
    });
  }
  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i
              className="material-icons"
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }
  render() {
    return <div className="collection">{this.renderLyrics()}</div>;
  }
}

/* Functional Component */

// const LyricList = ({ lyrics }) => {
//   const onLike = (id) => {
//     console.log("id:", id);
//   };
//   console.log("lyrics data", lyrics);
//   return (
//     <div className="collection">
//       {lyrics.map((lyric) => {
//         return (
//           <li key={lyric.id} className="collection-item">
//             {lyric.content}
//             <i className="material-icons" onClick={() => onLike(lyric.id)}>
//               thumb_up
//             </i>
//           </li>
//         );
//       })}
//     </div>
//   );
// };

/* Functional Component with destructuration  */

// const LyricList = ({ lyrics }) => {
//   const onLike = async (event) => {
//     try {
//       event.preventDefault();
//       props.mutate({
//         variables: { id: id },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="collection">
//       {lyrics.map(({ id, content }) => {
//         return (
//           <li key={id} className="collection-item">
//             {content}
//             <i className="material-icons" onClick={() => onLike(id)}>
//               thumb_up
//             </i>
//           </li>
//         );
//       })}
//     </div>
//   );
// };

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
