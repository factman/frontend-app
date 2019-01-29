import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw, // convert the editor state to JSON
  convertFromRaw,
  ContentState,
} from "draft-js";
import FormatUnderlined from "@material-ui/icons/FormatUnderlined";
import FormatItalic from "@material-ui/icons/FormatItalic";
import FormatBold from "@material-ui/icons/FormatBold";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import FormatListNumbered from "@material-ui/icons/FormatListNumbered";
import FormatAlignCenter from "@material-ui/icons/FormatAlignCenter";
import FormatAlignLeft from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRight from "@material-ui/icons/FormatAlignRight";
import FormatQuote from "@material-ui/icons/FormatQuote";
import Code from "@material-ui/icons/Code";
// import PropTypes from "prop-types";
import StyleButton from "./SubComponent/StyleButton";
import { IsJsonString } from "../../helpers/logic";

import "./css/editorStyle.css";

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: "'Inconsolata', 'Menlo', 'Consolas', monospace",
    fontSize: 16,
    padding: 2,
  },
};
/**
 *@description The getBlockStyle function get the style to using block type
 *
 * @param {Object} block each row of the text editor
 * @returns class name associated with the block type
 */
function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote": return "RichEditor-blockquote";
    case "align-left": return "RichEditor-align-left";
    case "align-center": return "RichEditor-align-center";
    case "align-right": return "RichEditor-align-right";
    default: return null;
  }
}

export default class BezopEditor extends React.Component {
  constructor(props) {
    super(props);
    const { returnJson } = this.props;
    this.state = {
      editorState: returnJson === null
        ? EditorState.createEmpty()
        : this.initializedContent(returnJson),
    };
    this.editor = React.createRef();
    this.focus = () => this.editor.current.focus();
  }

  initializedContent = (str) => {
    switch (IsJsonString(str)) {
      case "string":
        return EditorState.createWithContent(ContentState.createFromText(str));
      default:
        return EditorState.createWithContent(convertFromRaw(JSON.parse(str)));
    }
  }

  /**
   *@description handleKeyCommand is handle all key binding of the editor
   *@param {String} command the command that is bind with key eg Command/Ctrl B to Bold
   *@param {Object} editorState the current editor state
   *@return {Boolean} if true then custom key binding will be use
   * else fallback to default key binding
   * @memberof BezopEditor
   */
  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  onChange = (editorState) => {
    const { getJsonContent } = this.props;
    this.setState({ editorState });
    if (getJsonContent) {
      getJsonContent(convertToRaw(editorState.getCurrentContent()));
    }
  }

  mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const { editorState } = this.state;
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== editorState) {
        this.onChange(newEditorState);
      }
    }
    return getDefaultKeyBinding(e);
  }

  toggleBlockType = (blockType) => {
    const { editorState } = this.state;
    this.onChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType,
      ),
    );
  }

  toggleInlineStyle = (inlineStyle) => {
    const { editorState } = this.state;
    this.onChange(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle,
      ),
    );
  }

  render() {
    const { editorState } = this.state;
    const { placeholder, themeEditor } = this.props;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let"s just hide it now.
    let className = `RichEditor-editor ${themeEditor}`;
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }
    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div
          className={className}
          onClick={this.focus}
          role="button"
          tabIndex="0"
          onKeyDown={this.focus}
        >
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder={placeholder !== undefined ? placeholder : "Tell your story..."}
            ref={this.editor}
            spellCheck
          />
        </div>
      </div>
    );
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one", icon: false },
  { label: "H2", style: "header-two", icon: false },
  { label: "H3", style: "header-three", icon: false },
  { label: "H4", style: "header-four", icon: false },
  { label: "H5", style: "header-five", icon: false },
  { label: "H6", style: "header-six", icon: false },
  { label: FormatQuote, style: "blockquote", icon: true },
  { label: FormatAlignLeft, style: "align-left", icon: true },
  { label: FormatAlignCenter, style: "align-center", icon: true },
  { label: FormatAlignRight, style: "align-right", icon: true },
  { label: FormatListBulleted, style: "unordered-list-item", icon: true },
  { label: FormatListNumbered, style: "ordered-list-item", icon: true },
  { label: Code, style: "code-block", icon: true },
];
const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  let counter = 0;
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => {
        counter += 1;
        return (
          <StyleButton
            key={counter}
            active={type.style === blockType}
            LabelIcon={type.label}
            onToggle={props.onToggle}
            style={type.style}
            icon={type.icon}
          />
        );
      })}
    </div>
  );
};
const INLINE_STYLES = [
  { label: FormatBold, style: "BOLD", icon: true },
  { label: FormatItalic, style: "ITALIC", icon: true },
  { label: FormatUnderlined, style: "UNDERLINE", icon: true },
  { label: "Monospace", style: "CODE", icon: false },
];
const InlineStyleControls = (props) => {
  const { editorState } = props;
  const currentStyle = editorState.getCurrentInlineStyle();
  let counter = 0;
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => {
        counter += 1;
        return (
          <StyleButton
            key={counter}
            active={currentStyle.has(type.style)}
            LabelIcon={type.label}
            onToggle={props.onToggle}
            style={type.style}
            icon={type.icon}
          />
        );
      })}
    </div>
  );
};
