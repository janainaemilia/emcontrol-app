import React, { Component } from 'react'

import { Quill } from 'react-quill'
import Dropzone from 'react-dropzone'

// import $ from 'jquery'

let quillRef = {}

/**
* Event handler to be attached using Quill toolbar module (see line 73)
* https://quilljs.com/docs/modules/toolbar/
*/
export function insertVideo() {
    quillRef = this.quill
}

/**
* @description VideoUploader
* @memberof Widget
* @class 
*/
class VideoUploader extends Component {
    constructor(props){
        super(props)
    }

    /**
     * 
     * @param {*} dataurl 
     */
    dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }

    /**
     * 
     */
    blobToDataURL(blob, callback) {
        var a = new FileReader();
        a.onload = function(e) {callback(e.target.result);}
        a.readAsDataURL(blob);
    }

    /**
    * @param {object} file 
    */
    fileToUpload(file) {
        if(file.length > 0) {
            let self = this
            const reader = new FileReader()
            reader.readAsDataURL(file[0])
            
            reader.onload = function (event) {
                let preview = event.target.result
                // let url = window.URL.createObjectURL(self.dataURLtoBlob(preview))
                // let node = `<p><video class='ql-video' autoplay loop style='width: 100%; height: 500px;' src=${preview}></video></p>`
                // let node = `<p><iframe class='ql-video' style='width: 100%; height: 500px;' src=${preview}></iframe></p>`
                // $('.ql-editor').append(node)
                // quillRef.update()

                var range = quillRef.getSelection()
                let position = range ? range.index : 0
                quillRef.insertEmbed(position, 'video', preview, Quill.sources.USER)
            }
        }
    }
    
    /**
    * 
    */
    render() {
        return (
            <div className="video_upload_button">
                <Dropzone ref="dropzone" onDrop={(upload) => this.fileToUpload(upload)}
                    multiple={false} 
                    accept="video/webm, video/mp4"
                    className='image-component-upload'>
                        <i className='fa fa-film'></i>
                </Dropzone>
            </div>
        )
    }
}

export default VideoUploader