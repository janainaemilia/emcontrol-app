import React, { PureComponent } from 'react'
import FileInput from '@brainhubeu/react-file-input'
import '@brainhubeu/react-file-input/dist/react-file-input.css'

export default class MyFileInput extends PureComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this)
  }
  onChange({ value }) {
    const { input } = this.props;

    input.onChange(value);
  }
  render() {
    const { input, label } = this.props;

    return (
      <FileInput
        label='Awesome Uploader'
        onChangeCallback={this.onChange}
        onDragEnterCallback={input.onFocus}
        onDragLeaveCallback={input.onBlur}
      />
    );
  }
}