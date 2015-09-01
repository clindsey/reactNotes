const NoteList = require('components/notes/NoteList');
const NoteForm = require('components/notes/NoteForm');

const NoteBox = React.createClass({
  getInitialState: function () {
    let data = JSON.parse(localStorage.getItem(this.props.localStorageKey));
    data = data || {};
    return {
      data
    };
  }

, saveNote: function (note) {
    const notes = this.state.data;
    notes[note.id] = note;
    this.setState({data: notes});
    localStorage.setItem(this.props.localStorageKey, JSON.stringify(notes));
  }

, render: function () {
    return (
      <div className="row">
        <div className="col-lg-8">
          <h1>Notes</h1>
          <NoteList data={this.state.data} onNoteUpdate={this.saveNote} />
        </div>
        <div className="col-lg-4">
          <h1>New Note</h1>
          <NoteForm onNoteSubmit={this.saveNote} />
        </div>
      </div>
    );
  }
});

module.exports = NoteBox;
