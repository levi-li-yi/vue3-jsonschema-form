export default {
  name: 'Simple',
  schema: {
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstName: {
        type: 'string',
        default: 'Chunk',
      },
      lastName: {
        type: 'string',
      },
      telephone: {
        type: 'string',
        minLength: 10,
      },
      staticArray: {
        type: 'array',
        items: [
          {
            type: 'string',
          },
          {
            type: 'number',
          },
        ],
      },
      // 单选类型数组
      singleTypeArray: {
        type: 'array',
        // items: {
        //   type: 'string',
        // },
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            age: {
              type: 'number',
            },
          },
        },
      },
      //
      multiTypeArray: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['123', '456'],
        },
      },
    },
  },
  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: {
        title: 'First name',
      },
      lastName: {
        title: 'Last name',
      },
      telephone: {
        title: 'telephone',
      },
    },
  },
  default: {
    firstName: 'Chunk',
    lastName: 'Norris',
    age: 7,
    bio: 'Roundhouse',
    password: 'noneed',
    // singleTypeArray: ['arr'],
    singleTypeArray: [
      {
        name: 'jcak',
        age: 12,
      },
    ],
  },
}
