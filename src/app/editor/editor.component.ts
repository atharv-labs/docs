import { Component, ViewChild } from '@angular/core';
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  @ViewChild('editor') editor: any;
  @ViewChild('content') content: any;

  ngAfterViewInit() {
    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
      marks: schema.spec.marks
    })

    const view = new EditorView(this.editor.nativeElement, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(this.content.nativeElement),
        plugins: exampleSetup({ schema: mySchema })
      })
    })

  }
}
