module.exports = {
  // jest预设的配置
  // typescript-and-babel:作用是在ts基础配置之上开启了babelConfig:true
  // 在default基础配置上把.ts/.tsx文件交给ts-jest去处理
  // default配置内容有：声明可解析的文件后缀、配置专门处理.vue文件、配置负责处理.css/style/less/sass/svg等
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.vue$": "vue-jest"
  }
};
