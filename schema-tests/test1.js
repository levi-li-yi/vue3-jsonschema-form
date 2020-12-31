const Ajv = require('ajv');
const localize = require('ajv-i18n');

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'test', // shcema的format
      // testkey: false,
      // compilKey: 'true',
      // macroKey: true,
      minLength: 10,
      errorMessage: {
        type: '必须是字符串',
        minLength: '长度不能少于10'
      }, // errorMessage只针对原生的schema有作用
    },
    age: {
      type: 'number'
    },
    pets: {
      type: 'array',
      items: [
        {
          type: 'string'
        },
        {
          type: 'number'
        }
      ]
    },
    isWorkers: {
      type: 'boolean'
    }
  },
  // required: ['name'] 
}

const ajv = new Ajv({ allErrors: true, jsonPointers: true })

// 使用ajv-errors包装ajv
require('ajv-errors')(ajv)

// 自定义format
ajv.addFormat('test', (data) => {
  return data === 'hh'
})

// 自定义关键字：validation function
ajv.addKeyword('testkey', {
  // schema：关键字传入值, data：关键字对应的shcema对象中的属性
  validate: function fn (schema, data) {
    console.log(schema, data);
    // 自定义关键字错误信息
    // fn.errors = [
    //   {
    //     keyword: 'testkey',
    //     dataPath: '.name',
    //     schemaPath: '#/properties/name/testkey',
    //     params: { keyword: 'testkey' },
    //     message: '需要通过"testkey" 关键字验证'
    //   }
    // ]
    if (schema === true) return true;
    else return schema.length === 6;
  }
})

// 自定义关键字：compilation function,在执行ajv.compile时调用校验
ajv.addKeyword('compilKey', {
  // sch：关键字传入值, parentSch：关键字所在的对象
  compile (sch, parentSch) {
    console.log(sch, parentSch);
    // 返回一个函数
    return () => true;
  },
  // 定义关键字接收值类型校验
  metaSchema: {
    type: 'string'
  }
})

// 自定义关键字：macro function
ajv.addKeyword('macroKey', {
  macro (sch, parentSch) {
    // 返回的值会被添加到对应shcema属性中，如： name: {minLength: 10}
    return {
      minLength: 10, // 返回了原生schema属性minLength
    }
  }
})


const validate = ajv.compile(schema)

// 按照schema规则校验对象
const valid = validate({
  name: 'hh',
  // age: 12,
  pets: ['dog', 10],
  isWorkers: true
})

if (!valid) {
  localize.zh(validate.errors);
  console.log(validate.errors);
}