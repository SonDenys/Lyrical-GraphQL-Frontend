import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

/* Class Component */

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }

  onSubmit(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId,
        },
      })
      .then(() => this.setState({ content: "" }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a lyric</label>
        <input
          onChange={(event) => this.setState({ content: event.target.value })}
          value={this.state.content}
        />
      </form>
    );
  }
}

/* Functional Component  */

// const LyricCreate = ({ songId }) => {
//   const [content, setContent] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     this.props.mutate({
//       variables: {
//         content: content,
//         songId: songId,
//       },
//     }).then(() => setContent("");
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Add a lyric</label>
//       <input
//         onChange={(event) => setContent(event.target.value)}
//         value={content}
//       />
//     </form>
//   );
// };

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
