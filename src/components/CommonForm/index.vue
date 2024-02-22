<script lang="tsx">
import { defineComponent, reactive, toRefs } from "vue";

interface FormData {
  [key: string]: any;
}

export default defineComponent({
  props: {
    formConfig: {
      type: Array,
      default: () => [],
    },
    labelCol: {
      type: Object,
      default: { style: { width: "100px" } },
    },
  },
  setup() {
    const state = reactive({
      formData: {} as FormData,
    });
    const methods = {
      renderFormItem(item: any) {
        const { type, label, key, data } = item;
        const common = {
          placeholder: `请输入${label}`,
          ...item.attrs,
        };
        const dom: any = {
          //input输入框
          input: () => {
            return <el-input v-model={state.formData[key]} {...common} />;
          },
          //单选框
          radio: () => {
            return (
              <el-radio-group v-model={state.formData[key]} {...common}>
                {data.map((item: any) => {
                  return <el-radio label={item.value}>{item.label}</el-radio>;
                })}
              </el-radio-group>
            );
          },
          //下拉框
          select: () => {
            return (
              <el-select v-model={state.formData[key]} {...common}>
                {data.map((item: any) => {
                  return <el-option label={item.label} value={item.value} />;
                })}
              </el-select>
            );
          },
        };
        function handleFormItem(html: HTMLElement) {
          return (
            <el-form-item label={label} name={key}>
              {html}
            </el-form-item>
          );
        }
        return handleFormItem(dom[type]);
      },
    };
    return { ...toRefs(state), ...methods };
  },
  render() {
    return (
      <>
        <div>
          <el-form model={this.formData}>
            {this.formConfig.map((item) => {
              return this.renderFormItem(item);
            })}
          </el-form>
        </div>
      </>
    );
  },
});
</script>

<style lang="scss" scoped></style>
