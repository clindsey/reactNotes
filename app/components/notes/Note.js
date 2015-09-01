const Note = React.createClass({
  componentDidMount: function () {
    const titleEl = React.findDOMNode(this.refs.title);
    $(titleEl).editable({
      title: 'Edit Title'
    , success: function (response, newValue) {
        const title = newValue;
        const text = this.props.children.toString();
        const id = this.props.id;
        this.props.onNoteUpdate({id, title, text});
      }.bind(this)
    , display: function () {
        $(this).removeClass('editable-unsaved editable-pre-wrapped');
      }
    });
    const textEl = React.findDOMNode(this.refs.text);
    $(textEl).editable({
      title: 'Edit Text'
    , success: function (response, newValue) {
        const title = this.props.title;
        const text = newValue;
        const id = this.props.id;
        this.props.onNoteUpdate({id, title, text});
      }.bind(this)
    , display: function () {
        $(this).removeClass('editable-unsaved editable-pre-wrapped');
      }
    });
  }

, render: function () {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title" data-type="text" ref="title">{this.props.title}</h3>
        </div>
        <div className="panel-body">
          <p ref="text" data-type="textarea">
            {this.props.children}
          </p>
        </div>
      </div>
    );
  }
});

module.exports = Note;
