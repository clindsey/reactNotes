const Note = require('components/notes/Note');

const NoteList = React.createClass({
  createNoteNodes: function () {
    const noteNodes = Object.keys(this.props.data).map(function (id) {
      const note = this.props.data[id];
      return (
        <Note key={note.id} id={note.id} title={note.title} onNoteUpdate={this.props.onNoteUpdate}>
          {note.text}
        </Note>
      );
    }.bind(this));
    return noteNodes;
  }

, createEmptyNode: function () {
    return (
      <h3>No notes yet. Create one!</h3>
    );
  }

, render: function () {
    const noteNodes = this.createNoteNodes();
    let contentNode = noteNodes.length ? noteNodes : this.createEmptyNode();
    return (
      <div>
        {contentNode}
      </div>
    );
  }
});

module.exports = NoteList;
