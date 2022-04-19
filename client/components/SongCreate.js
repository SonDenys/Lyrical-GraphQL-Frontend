import React, { Component, useState } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongs";

/* Class Component */

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        // it reruns automatically after the mutation is successfully executed
        refetchQueries: [{ query: query }],
      })
      .then(() => hashHistory.push("/"));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

/* Functional Component */

// const SongCreate = () => {
//   const [title, setTitle] = useState("");

//   const handleSubmit = async (event) => {
//     try {
//       event.preventDefault();
//       props.mutate({
//         variables: {
//           title: title,
//         },
//       refetchQueries: [{ query: query }],
//       }).then(() => hashHistory.push("/"));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h3>Create a new song</h3>
//       <form onSubmit={handleSubmit}>
//         <label>Song Title:</label>
//         <input onChange={(event) => event.target.value} value={title} />
//       </form>
//     </div>
//   );
// };

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
