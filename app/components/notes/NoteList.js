const Note = require('components/notes/Note');

const NoteList = React.createClass({
  render: function () {
    const noteNodes = Object.keys(this.props.data).map(function (id) {
      const note = this.props.data[id];
      return (
        <Note key={note.id} id={note.id} title={note.title} onNoteUpdate={this.props.onNoteUpdate}>
          {note.text}
        </Note>
      );
    }.bind(this));
    return (
      <div>
        {noteNodes}
      </div>
    );
  }
});

module.exports = NoteList;
