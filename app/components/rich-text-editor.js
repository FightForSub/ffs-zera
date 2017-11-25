import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


class EditorConvertToHTML extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: this.buildEditorState(this.props.value)
        }
        this.customOnChange = this.customOnChange.bind(this);
        this.catchEvent = this.catchEvent.bind(this);
    }

    buildEditorState(value) {
        const contentBlock = htmlToDraft(value || '');
        const contentState = contentBlock ? ContentState.createFromBlockArray(contentBlock.contentBlocks) : ContentState.createFromText('');
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
    }

    componentWillReceiveProps({ value }) {
        if ((value && !this.props.value) || (!this.props.isEdit && value !== !this.props.value)) {
            this.setState({ editorState: this.buildEditorState(value) });
        }
    }

    customOnChange(editorState) {
        this.setState({
            editorState: editorState
        });
        this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }

    catchEvent(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }

    render() {
        return (
            <div onKeyUp={this.catchEvent} >
                <Editor
                    toolbarHidden={!this.props.isEdit}
                    editorState={this.state.editorState}
                    wrapperClassName='rich-text-wrapper'
                    editorClassName='rich-text-editor'
                    onEditorStateChange={this.customOnChange}
                    readOnly={!this.props.isEdit}
                />
            </div>
        );
    }
}

export default EditorConvertToHTML;