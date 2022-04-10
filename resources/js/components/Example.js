import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import 'axios';
import axios from 'axios';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this)
        this.state = {date: new Date(), content: null}
    }

    onChange(e) {
        this.setState({
            content: e.target.getContent()
          })
    }

    onClick = () =>{
        axios.post('api/posts', {
            content: this.state.content,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render() {
        return (
            <div>
                <Editor
                    initialValue="<p>This is the initial content of the editor</p>"
                    apiKey="0efkeh4p0498bwsf03d5deorgcjtsaopgw0lvebxnucvfpc5"
                    init={{
                        selector: 'textarea#file-picker',
                        plugins: 'image code textcolor preview powerpaste casechange searchreplace autolink autosave save directionality  table charmap hr   nonbreaking   insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable  formatpainter  mentions quickbars linkchecker emoticons ',
                        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat |   | charmap emoticons | image   link | showcomments addcomment',
                        image_title: true,
                        automatic_uploads: true,
                        block_unsupported_drop: false,
                        height: 400,
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }',
                        skin: "oxide-dark",
                        content_css: "dark"
                    }}
                    onChange={this.onChange}
                />
                <button onClick={this.onClick}>Save</button>
                <p>{this.state.content}</p>
                <div
                    dangerouslySetInnerHTML={{
                        __html: '<p>This is the initial content of the <span style=\"color: #f1c40f;\">editordsa<\/span><\/p>\n<div class=\"ddict_div\" style=\"top: 38.6px; max-width: 150px; left: 169.525px;\"><img class=\"ddict_audio\" src=\"chrome-extension:\/\/bpggmmljdiliancllaapiggllnkbjocb\/img\/audio.png\" \/>\n<p class=\"ddict_sentence\">redaktorka<\/p>\n<hr \/>\n<p class=\"ddict_didumean\">Did you mean <span class=\"ddict_spell\">editors<\/span><\/p>\n<\/div>'
                    }}></div>
            </div>
        )
    }
}

