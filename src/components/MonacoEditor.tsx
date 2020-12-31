import {
  defineComponent,
  ref,
  onMounted,
  watch,
  shallowRef,
  onBeforeUnmount,
} from 'vue'

import * as Monaco from 'monaco-editor'
import { PropType } from 'vue'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
  },
  title: {
    backgroundColor: '#eee',
    padding: '10px 0',
    paddingLeft: 20,
  },
  code: {
    flexGrow: 1,
  },
})

// 交互式组件库文档组件
export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => void
      >,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },

  setup(props) {
    const editorRef = shallowRef()
    const containerRef = ref()

    let _subscription: Monaco.IDisposable | undefined
    let preventTriggerChangeEvent = false

    onMounted(() => {
      // 定义Monaco编辑器对象
      const editor = (editorRef.value = Monaco.editor.create(
        containerRef.value,
        {
          value: props.code,
          language: 'json',
          formatOnPaste: true,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
        },
      ))

      _subscription = editor.onDidChangeModelContent((event) => {
        if (!preventTriggerChangeEvent) {
          props.onChange(editor.getValue(), event)
        }
      })
    })

    onBeforeUnmount(() => {
      if (_subscription) {
        _subscription.dispose()
      }
    })

    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value
        const model = editor.getModel()

        if (v !== model.getValue()) {
          editor.pushUndoStop()
          preventTriggerChangeEvent = true
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v,
              },
            ],
          )
          editor.pushUndoStop()
          preventTriggerChangeEvent = false
        }
      },
    )

    //
    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value

      return (
        <div class={classes.container}>
          <div class={classes.title}>
            <span>{props.title}</span>
          </div>
          <div class={classes.code} ref={containerRef}></div>
        </div>
      )
    }
  },
})
