const NoteForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    const title = React.findDOMNode(this.refs.title).value.trim();
    const text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !title) {
      return;
    }
    const id = +(new Date);
    this.props.onNoteSubmit({title, text, id});
    React.findDOMNode(this.refs.title).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  }

, render: function () {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="col-sm-12">
            <input className="form-control" type="text" placeholder="Title" ref="title" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <textarea className="form-control" placeholder="Text" ref="text"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input className="btn btn-primary" type="submit" value="Create" />
          </div>
        </div>
      </form>
    );
  }
});

module.exports = NoteForm;
